import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [DatabaseModule, AuthModule],
})
export class PostModule {}
