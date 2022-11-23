import { Field, ObjectType } from "type-graphql";
import { Roles } from "./roles";

@ObjectType()
export class User {
  @Field((_) => String, { nullable: true })
  id!: string;

  @Field((_) => String)
  name!: string;

  @Field((_) => String)
  email!: string;

  @Field((_) => [Roles])
  roles!: Roles;
}
