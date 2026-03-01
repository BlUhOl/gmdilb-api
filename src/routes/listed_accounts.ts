import { Elysia, t } from "elysia";
import { supabase } from "../lib/supabase";

const COLUMNS = "account_id, username";

export const listedAccounts = new Elysia().get("/listed-accounts", async () => {
  const { data } = await supabase.from("listed_accounts").select(COLUMNS);

  return {
    total: data?.length,
    records: data,
  };
});
