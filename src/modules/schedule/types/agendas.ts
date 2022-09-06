import { IUser } from '~/modules/auth/types/user';

export interface IAgenda {
  id: string;
  name: string;
  description: string;
  avatar: null;
  is_private: boolean;
  members: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  avatar_url: null;
  user: IUser;
}
