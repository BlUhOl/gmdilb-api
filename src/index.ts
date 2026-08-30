import { Elysia } from "elysia";
import openapi from "@elysiajs/openapi";
import { rateLimit } from "elysia-rate-limit";
import { profilesRoutes } from "./routes/profiles";
import { listedAccounts } from "./routes/listed_accounts";
import { hardestLevels } from "./routes/hardest_levels";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", ({ set }) => {
    set.headers["content-type"] = "text/plain";
    return "GMDI LEADERBOARD API \nBy BlUhOl using ElysiaJS";
  })
  .use(
    rateLimit({
      max: 10,
      duration: 10000,
      skip: (request, key) => {
        const origin = request.headers.get("origin");
        const referer = request.headers.get("referer");

        if (
          origin === "https://gmdilb.pages.dev/" ||
          referer?.startsWith("https://gmdilb.pages.dev/")
        ) {
          return true;
        }

        return false;
      },
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
  .use(listedAccounts)
  .use(hardestLevels)
//   .listen(3000);

// console.log(`🦊 Server running at http://localhost:${app.server?.port}`);

export default app;
