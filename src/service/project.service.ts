import { prisma } from "../clients/prisma";
import { ProjectFinanceInput } from "../entities/project_finances";

type CreateProject = {
  name: string;
  user_id: string;
  finance: ProjectFinanceInput;
};

export class ProjectService {
  async create(data: CreateProject) {
    return prisma.project.create({
      data: {
        name: data.name,
        userId: data.user_id,
        finance: {
          create: {
            priceInCents: data.finance.price * 100,
          },
        },
      },
    });
  }

  async findAll() {
    return prisma.project.findMany();
  }

  async finance(project_id: string) {
    return prisma.project.findFirst({ where: { id: project_id } }).finance();
  }
}
