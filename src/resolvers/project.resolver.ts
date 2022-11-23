import { inject, injectable } from "tsyringe";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Project } from "../entities/porject";
import { ProjectFinanceInput } from "../entities/project_finances";
import { can } from "../middleware/permissions";
import { ProjectService } from "../service/project.service";

@Resolver((resolves) => Project)
@injectable()
export class ProjectResolver {
  constructor(
    @inject(ProjectService)
    private readonly projectService: ProjectService
  ) {}

  @Query((type) => [Project])
  @UseMiddleware(can(["project:read"]))
  projects() {
    return this.projectService.findAll();
  }

  @Mutation((type) => Project)
  @UseMiddleware(can(["project:create"]))
  createProject(
    @Arg("name", (type) => String) name: string,
    @Arg("user_id", (type) => String) user_id: string,
    @Arg("finance", (type) => ProjectFinanceInput) finance: ProjectFinanceInput
  ) {
    return this.projectService.create({ name, user_id, finance });
  }

  @FieldResolver()
  @UseMiddleware(can(["project:finance:read"], { nullable: true }))
  finance(@Root() project: Project) {
    return this.projectService.finance(project.id);
  }
}
