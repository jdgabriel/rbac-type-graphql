import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container } from "tsyringe";
import { buildSchema } from "type-graphql";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.resolver.ts"],
    emitSchemaFile: "./schema.gql",
    container: { get: (cls) => container.resolve(cls) },
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3232 },
  });

  return url;
}

bootstrap()
  .then((url) => console.log(`🔥 Server running at ${url}`))
  .catch((e) => console.log(e));
