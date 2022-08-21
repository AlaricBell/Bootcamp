import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository as RepositoryEntity } from './entities/repository.entity';
import { User as UserEntity } from './entities/user.entity';
import { Contribution as ContributionEntity } from './entities/contribution.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
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
      migrations: [__dirname + '**/migration/*.{ts,js}'],
      subscribers: [__dirname + '/**/subscriber/*.{ts,js}'],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      RepositoryEntity,
      ContributionEntity,
    ]),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
