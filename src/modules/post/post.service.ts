import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly postRepository = this.prismaService.post;
  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.postRepository.create({
      data: {
        ...createPostDto,
        userId,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.postRepository.findMany({ where: { userId } });
  }

  async findOneOrThrow(id: string) {
    return this.postRepository.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async delete(id: string) {
    return await this.postRepository.delete({ where: { id } });
  }
}
