import { Role } from '../types/tole.type';

export interface User {
  id: string;
  email: string;
  role: Role;
}
