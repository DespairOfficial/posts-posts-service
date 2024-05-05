import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsString } from '@nestjs/class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
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
