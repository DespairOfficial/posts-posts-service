import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
@Module({
  imports: [DatabaseModule, AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
