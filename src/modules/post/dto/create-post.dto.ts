import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PostEntity } from '../entities/post.entity';
import { IsString } from '@nestjs/class-validator';

export class CreatePostDto extends OmitType(PostEntity, ['id', 'createdAt', 'userId']) {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'Text of a post',
  })
  @IsString()
  text: string;

  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'Title of a post',
  })
  @IsString()
  title: string;
}
