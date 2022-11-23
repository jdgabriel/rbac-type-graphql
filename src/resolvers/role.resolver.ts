import { inject, injectable } from "tsyringe";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Roles } from "../entities/roles";
import { RoleService } from "../service/roles.service";

@Resolver((resolves) => Roles)
@injectable()
export class RolesResolver {
  constructor(
    @inject(RoleService)
    private readonly roleService: RoleService
  ) {}

  @Query((type) => [Roles])
  roles() {
    return this.roleService.findAll();
  }

  @Mutation((type) => Roles)
  createRole(
    @Arg("name", (type) => String) name: string,
    @Arg("user_id", (type) => String) user_id: string,
    @Arg("permissions", (type) => [String]) permissions: string[]
  ) {
    return this.roleService.create({ name, user_id, permissions });
  }

  @Mutation((type) => Roles)
  updateRole(
    @Arg("role_id", (type) => String) role_id: string,
    @Arg("permissions", (type) => [String]) permissions: string[]
  ) {
    return this.roleService.update({ role_id, permissions });
  }

  @FieldResolver()
  permissions(@Root() role: Roles) {
    return role.permissions.split(",");
  }
}
