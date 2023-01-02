import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserEntity } from "./users.entity";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";


describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>


    beforeEach(async () => {
        // create fake copy of user Service
        const users: UserEntity[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers)
            },
            create: (email: string, password: string) => {
               const user = ({ id: Math.floor(Math.random() * 30000), email, password } as UserEntity);
               users.push(user);
               return Promise.resolve(user);
            }
        };
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService)
    });


    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('test@demo.com', 'asdf');

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws error if user signs up wth an already used email', async () => {
        // fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: 'qwerty' } as UserEntity])

        await service.signup('test@test.com', 'asdf')

        await expect(service.signup('test@test.com', 'asdf')).rejects.toThrow(
            BadRequestException
        );

    });

    it('throws error if signin is called with an unused email', async () => {

        await expect(service.signin('qwerty@test.com', 'poiuyt'),).rejects.toThrow(NotFoundException);
    });

    it('throws error if an invalid password is provided', async () => {
        // fakeUsersService.find = () => Promise.resolve([{ email: 'test@demo.com', password: 'qwerty' } as UserEntity])

        await service.signup('demo@demo.com', 'qwerty')
    // here the passwords should'nt match so we can simulate that an what wll happen if given invalid password
    
        await expect(service.signin('demo@demo.com', 'asdf')).rejects.toThrow(BadRequestException)
    });

    it('return a user if correct password is entered/provided', async ()=> {
        //here we signup a user instance
        await service.signup('test@demo.com', 'mypw')
        // then we compare that it's the same user credentials when we try to signin
        const user = await service.signin('test@demo.com', 'mypw');
        expect(user).toBeDefined();
    })
});
