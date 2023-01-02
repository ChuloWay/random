import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserEntity } from "./users.entity";
import { UsersService } from "./users.service";

it('can create an instance of auth service', async () => {
    // create fake copy of user Service
    const fakeUsersService: Partial<UsersService> = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as UserEntity)
    }
    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                provide: UsersService,
                useValue: fakeUsersService
            }
        ]
    }).compile();

    const service = module.get(AuthService)

    expect(service).toBeDefined();
});

