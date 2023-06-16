import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

import neo4j, { Node, Relationship, Integer } from 'neo4j-driver';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  testing: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const driver = neo4j.driver(env.NEO4J_URI, neo4j.auth.basic(env.NEO4J_USERNAME, env.NEO4J_PASSWORD))
      const session = driver.session()

      interface RecipeProperties {
        name: string,
        good: boolean
      }

      type Recipe = Node<Integer, RecipeProperties>

      interface RecipeReceived {
        r: Recipe
      }
      
      try {
        const result = await session.executeRead(tx => tx.run<RecipeReceived>(
          'MATCH (r:Recipe {good: $good}) RETURN r',
          { good: true }
        ))

        const record = result.records[0]?.get('r')
        const name = record?.properties.name
       
        return {
          result: name
        };
      } finally {
        await session.close();
        await driver.close();
      }
      
      
    })
});
