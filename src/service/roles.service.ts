import { prisma } from "../clients/prisma";

type CreateRole = {
  name: string;
  user_id: string;
  permissions: string[];
};

type UpdateRole = {
  role_id: string;
  permissions: string[];
};

export class RoleService {
  async findAll() {
    return await prisma.roles.findMany();
  }

  async create(data: CreateRole) {
    return prisma.roles.create({
      data: {
        name: data.name,
        permissions: data.permissions.join(","),
        user: {
          connect: { id: data.user_id },
        },
      },
    });
  }

  async update(data: UpdateRole) {
    return prisma.roles.update({
      where: { id: data.role_id },
      data: {
        permissions: data.permissions.join(","),
      },
    });
  }
}
