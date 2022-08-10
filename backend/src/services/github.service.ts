import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  async getData(endpoint: string): Promise<any> {
    return axios.get(`https://api.github.com/${endpoint}`);
  }
}
