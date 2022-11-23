import { Field, ObjectType } from "type-graphql";
import { ProjectFinances } from "./project_finances";

@ObjectType()
export class Project {
  @Field((_) => String, { nullable: true })
  id!: string;

  @Field((_) => String)
  name!: string;

  @Field((_) => ProjectFinances, { nullable: true })
  finance!: ProjectFinances;
}
