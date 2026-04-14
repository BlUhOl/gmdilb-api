import { Elysia } from "elysia";

export const hardestLevels = new Elysia().get("/hardest_levels", async () => {
  try {
    const res = await fetch(
      "https://pointercrate.com/api/v1/nationalities/ID/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    return data;
  } catch (err) {
    return {
      error: "Failed to fetch data",
    };
  }
});
