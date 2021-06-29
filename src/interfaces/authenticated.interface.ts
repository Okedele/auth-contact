import { User } from './../users/users.entity';
import { Request } from "express";

export interface IAuthenticatedReq extends Request {
    user: User;
}