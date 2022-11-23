import { prisma } from "../clients/prisma";

type CreateUser = {
  name: string;
  email: string;
};

export class UserService {
  async create(data: CreateUser) {
    return prisma.user.create({ data });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async roles(user_id: string) {
    return prisma.user.findFirst({ where: { id: user_id } }).roles();
  }
}
