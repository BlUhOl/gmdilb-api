import { Elysia, t } from "elysia";
import { supabase } from "../lib/supabase";

const COLUMNS =
  "username, global_rank, date, stars, moons, diamonds, user_coins, demons, creator_points, completed_classic_extreme_demons, completed_platformer_extreme_demons";

export const profilesRoutes = new Elysia()
.get(
  "/profiles/:id",
  async ({ params: { id }, query: { ascending }, set }) => {
    const { data, error } = await supabase
      .from("profiles")
      .select(COLUMNS)
      .eq("account_id", id)
      .order("date", { ascending: ascending })
      .limit(100);

    if (error || !data?.length) {
      set.status = 404;
      return { message: `No records found for account_id "${id}"` };
    }

    return {
      total: data.length,
      ascending,
      account_id: id,
      records: data,
    };
  },
  {
    params: t.Object({ id: t.Integer() }),
    query: t.Object({ ascending: t.Optional(t.Boolean({ default: false })) }),
  },
);
