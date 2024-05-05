import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: 'Create post',
  })
  @ApiResponse({
    status: 201,
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postService.create(request.user.id, createPostDto);
  }

  @ApiOperation({
    summary: "Find all users's posts",
  })
  @ApiResponse({
    status: 200,
  })
  @Get()
  async findAllByUser(@Req() request: Request) {
    return this.postService.findAllByUser(request.user.id);
  }

  @ApiOperation({
    summary: 'Find post by id',
  })
  @ApiResponse({
    status: 200,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() request: Request) {
    const post = await this.postService.findOneOrThrow(id);
    if (post.userId === request.user.id) {
      return post;
    }
    throw new NotFoundException();
  }

  @ApiOperation({
    summary: 'Update post by id',
  })
  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePostDto: UpdatePostDto, @Req() request: Request) {
    const post = await this.postService.findOneOrThrow(id);
    if (post.userId === request.user.id) {
      return this.postService.update(id, updatePostDto);
    }
    throw new NotFoundException();
  }

  @ApiOperation({
    summary: 'Delete post by id',
  })
  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() request: Request) {
    const post = await this.postService.findOneOrThrow(id);
    if (post.userId === request.user.id) {
      return this.postService.delete(id);
    }
    throw new NotFoundException();
  }
}
