import { GraphQLError } from "graphql";
import { MiddlewareFn } from "type-graphql";
import { prisma } from "../clients/prisma";

export function can(
  permissions: string[],
  options?: { nullable: boolean }
): MiddlewareFn {
  return async ({ args }, next) => {
    // TODO Remove user_id from args, implements JWT Token
    const { user_id } = args;

    const wherePermissions = permissions.map((perm) => ({
      permissions: { contains: perm },
    }));

    const perm = await prisma.roles.findFirst({
      where: {
        userId: user_id,
        OR: wherePermissions,
      },
    });

    if (!perm) {
      if (options && options.nullable) {
        return null;
      }
      return new GraphQLError("User permissions not found for this action", {
        extensions: {
          code: "ACTION_NOT_BUILD",
        },
      });
    }
    await next();
  };
}
