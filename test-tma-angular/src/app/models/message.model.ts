import { User } from './user.model';

export interface Message {
    msg: string;
    user: User;
}