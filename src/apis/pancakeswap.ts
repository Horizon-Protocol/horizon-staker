// query pancakeswap data from https://api.bscgraph.org/subgraphs/name/cakeswap/graphql
import { GraphQLClient, ClientContext } from "graphql-hooks";

const client = new GraphQLClient({
  // url: "https://api.bscgraph.org/subgraphs/name/cakeswap/graphql", // no cors
  url: "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange/graphql", // no cors
});

export { client, ClientContext };
