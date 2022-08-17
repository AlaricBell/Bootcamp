import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from './entities/repository.entity';
import { User } from './entities/user.entity';
import { Contribution } from './entities/contribution.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity.ts'],
    }),
    TypeOrmModule.forFeature([User, Repository, Contribution]),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
