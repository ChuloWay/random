import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';


interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto:ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto:any) {}
    //runs before request is handled
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        return next.handle().pipe(
            map((data:any) => {
                // runs something before response is sent
               return plainToInstance(this.dto, data, {
                excludeExtraneousValues: true
               })
            })
        )
    }
}