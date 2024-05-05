import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: Date;
}
