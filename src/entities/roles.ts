import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Roles {
  @Field((_) => String, { nullable: true })
  id?: string;

  @Field((_) => String)
  name!: string;

  @Field((_) => [String])
  permissions!: string;
}
