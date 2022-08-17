import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Contribution } from './entities/contribution.entity';
import { Repository as GithubRepository } from './entities/repository.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GithubService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
    @InjectRepository(GithubRepository)
    private readonly GithubRepository: Repository<GithubRepository>,
  ) {}

  private config = {
    headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN_GITHUB}` },
  };

  async getData(endpoint: string): Promise<any> {
    return axios
      .get(`https://api.github.com/${endpoint}`, this.config)
      .then((response) => response.data);
  }

  async seed(): Promise<void> {
    console.log('asd');
    // const user = this.userRepository.create({
    //   id: 1,
    //   login: 'defunkt',
    //   avatar_url: 'https://avatars3.githubusercontent.com/u/2?v=4',
    //   html_url: '',
    //   type: 'admin',
    // });
    // await this.userRepository.save(user);

    // const repository = this.GithubRepository.create({
    //   id: 1,
    //   owner: user,
    //   full_name: 'defunkt/hub',
    //   description: '',
    //   html_url: '',
    //   language: '',
    //   stargazers_count: 0,
    // });
    // await this.GithubRepository.save(repository);

    // const contribution = this.contributionRepository.create({
    //   user: user,
    //   repository: repository,
    //   commit_count: 0,
    // });
    // await this.contributionRepository.save(contribution);
  }
}
