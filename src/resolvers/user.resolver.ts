import { inject, injectable } from "tsyringe";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { User } from "../entities/user";
import { UserService } from "../service/user.service";

@Resolver((resolves) => User)
@injectable()
export class UserResolver {
  constructor(
    @inject(UserService)
    private readonly userService: UserService
  ) {}

  @Query((type) => [User])
  users() {
    return this.userService.findAll();
  }

  @Mutation((type) => User)
  createUser(
    @Arg("name", (type) => String) name: string,
    @Arg("email", (type) => String) email: string
  ) {
    return this.userService.create({ name, email });
  }

  @FieldResolver()
  roles(@Root() user: User) {
    return this.userService.roles(user.id);
  }
}
