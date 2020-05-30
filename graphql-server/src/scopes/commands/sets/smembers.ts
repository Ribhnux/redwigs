import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SMembersArg = {
  key: string;
};

export const _smembers: ResolverFunction<SMembersArg> = async (
  root,
  { key },
  ctx
): Promise<string[]> => {
  try {
    const reply = await redisClient.smembers(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **SMEMBERS key**

    Get all the members in a set.
    [Read more >>](https://redis.io/commands/smembers)
    """
    _smembers(key: String!): [String]
  }
`;
