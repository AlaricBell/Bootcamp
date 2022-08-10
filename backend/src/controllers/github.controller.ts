import { Controller, Get } from '@nestjs/common';
import { GithubService } from '../services/github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly appService: GithubService) {}

  @Get()
  async getData(): Promise<string> {
    return await this.appService.getData('users/defunkt');
  }
}
