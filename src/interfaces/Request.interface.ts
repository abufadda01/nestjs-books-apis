import { Request } from 'express';
import { User } from 'src/auth/schemas/user.schema';


export interface RequestInterface extends Request {
    user: User 
}
