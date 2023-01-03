import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { UserEntity } from "../users.entity";


// we add the currentUser as a prop to req, to clear ts error, cause express doesnt recognise currentuser as a prop under the request object
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private usersService: UsersService
    ) {}
    async use(req: Request, res: Response ,next:NextFunction) {
        const { userId } = req.session || {};
        if(userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }
        next();
    }
}