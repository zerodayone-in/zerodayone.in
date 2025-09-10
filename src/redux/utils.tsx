import { Mutation, Query } from "../graphql/interfaces";
import { gql } from "@apollo/client";

export function prepMutation(mutation: Mutation, body: string | null) {
  // If the second parameter exists, replace the query with the second parameter
  
  const request = mutation.request;
  let newRequest = request.replace("---query---", mutation.body);

  if (body) {
    newRequest = request.replace("---query---", body);
  }

  return gql(newRequest);
}

export function prepQuery(query: Query, body: string | null) {
  // If the second parameter exists, replace the query with the second parameter

  const request = query.request;
  let newRequest = request.replace("---query---", query.body);

  if (body) {
    newRequest = request.replace("---query---", body);
  }

  return gql(newRequest);
}
