import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { randomUUID } from 'crypto';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  pet: a
    .model({
      id: a.string().default(randomUUID()),
      name: a.string().required(),
      ownerId: a.string().required(),
      diseases: a.string(),
      medicine: a.string(),
      breed: a.string().required(),
      type: a.string().required(),
      birthDate: a.integer().required(),
      createdAt: a.datetime().default(new Date().toISOString()),
      avatar: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  owner: a
    .model({
      id: a.string().default(randomUUID()),
      name: a.string().required(),
      lastName: a.string().required(),
      location: a.string(),
      phone: a.string().required(),
      createdAt: a.datetime().default(new Date().toISOString()),
      email: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  appointments: a
    .model({
      id: a.string().default(randomUUID()),
      petId: a.string().required(),
      ownerId: a.string().required(),
      details: a.string().required(),
      createdAt: a.datetime().default(new Date().toISOString()),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 3,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
