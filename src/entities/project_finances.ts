import { Field, Float, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class ProjectFinances {
  @Field((_) => String)
  id!: string;

  @Field((_) => Float)
  priceInCents!: number;
}

@InputType()
export class ProjectFinanceInput {
  @Field((_) => Float)
  price!: number;
}
