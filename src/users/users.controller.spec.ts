import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'test@test.com', password: 'qwerty' } as UserEntity)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email: 'test@test.com', password: 'qwerty' } as UserEntity])
      },

      // remove: ( id: number)=> {
      //     return Promise.resolve({id} as UserEntity)
      // },
      // update: ()=> {

      // }
    };
    fakeAuthService = {
      // signup: ()=> {

      // },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as UserEntity)
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with a given email', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com')
  });

  it('findUser returns a user with the given Id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined;
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    const user = await expect(controller.findUser('1')).rejects.toThrow(NotFoundException)
  });

  it('singin updates session object and returns user', async ()=> {
    const session = { userId: -10 };
    const user = await controller.signin({ email: 'test@test.com', password : 'qwerty'},
    session )


    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })

});
