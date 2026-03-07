import { Elysia } from "elysia";
import openapi from "@elysiajs/openapi";
import { rateLimit } from "elysia-rate-limit";
import { profilesRoutes } from "./routes/profiles";
import { listedAccounts } from "./routes/listed_accounts";
import { cors } from "@elysiajs/cors";

export default new Elysia()
  .use(cors())
  .get("/", "GMDI LEADERBOARD API \nBy BlUhOl using ElysiaJS")
  .use(
    rateLimit({
      max: 10,
      duration: 10000,
    }),
  )
  .use(
    openapi({
      path: "/docs",
      provider: "scalar",
      scalar: {
        agent: {
          disabled: true,
        },
      },
      documentation: {
        info: {
          title: "GMDILB-API",
          version: "1.0.0",
          description: `
### GMDI Leaderboard API
Created by [BlUhOl](https://bluhol.pages.dev)
Using ElysiaJS
        `,
        },
      },
    }),
  )
  .use(profilesRoutes)
  .use(listedAccounts);
// .listen(3000);

// console.log(`🦊 Server running at http://localhost:${app.server?.port}`);
