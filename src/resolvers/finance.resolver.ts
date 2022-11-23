import { FieldResolver, Resolver, Root } from "type-graphql";
import { ProjectFinances } from "../entities/project_finances";

@Resolver((resolves) => ProjectFinances)
export class ProjectFinanceResolver {
  @FieldResolver()
  priceInCents(@Root() projectFinances: ProjectFinances) {
    return projectFinances.priceInCents / 100;
  }
}
