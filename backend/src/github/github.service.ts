import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { User } from './entities/user.entity';
import { Contribution } from './entities/contribution.entity';
import { Repository as GithubRepository } from './entities/repository.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
    @InjectRepository(GithubRepository)
    private readonly GithubRepository: Repository<GithubRepository>,
  ) {}

  private config = {
    headers: { Authorization: `Token ${process.env.ACCESS_TOKEN_GITHUB}` },
  };

  async fetchData(endpoint: string): Promise<any> {
    try {
      return await this.httpService.axiosRef.get(
        `${process.env.GITHUB_SOURCE_URL}/${endpoint}`,
        this.config,
      );
    } catch (error) {
      console.warn(
        `Error occured on process: GithubService.getData[fetchRequest] => ${error}`,
      );
      throw error;
    }
  }

  async fetchContributors(data): Promise<any> {
    return await Promise.all(
      data.map((repository) => {
        return this.httpService.axiosRef.get(
          repository.contributors_url,
          this.config,
        );
      }),
    );
  }

  buildUser(data: any): User[] {
    return data.map((user) => {
      return <User>{
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        type: user.type,
      };
    });
  }

  buildRepository(data: any): GithubRepository[] {
    return data.map((repository) => {
      return <GithubRepository>{
        id: repository.id,
        owner: repository.owner.id,
        full_name: repository.full_name,
        description: repository.description,
        html_url: repository.html_url,
        language: repository.language,
        stargazers_count: repository.stargazers_count,
      };
    });
  }

  async syncData(endpoint: string): Promise<any> {
    const res = await this.fetchData(endpoint);
    const contribution = await this.fetchContributors(res.data);

    const contributors = [];
    contribution.forEach((contributor) => {
      contributors.push(...contributor.data);
    });

    const users = this.buildUser(contributors);
    const repositories = this.buildRepository(res.data);

    await this.userRepository.save(users);
    await this.GithubRepository.save(repositories);

    console.log('Data synced successfully!');
  }
}
