import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('github')
export class GithubController {
  constructor(private readonly appService: GithubService) {}

  @Get()
  @ApiOkResponse({
    description: 'Synchronizes database with data found on the GitHub API.',
  })
  async getData(): Promise<string> {
    try {
      await this.appService.syncData('users/facebook/repos?page=1&per_page=20');
      return 'Data synchronized successfully.';
    } catch (error) {
      console.warn(
        `Error occured on process: GithubService.syncData => ${error}`,
      );
      throw error;
    }
  }
}
