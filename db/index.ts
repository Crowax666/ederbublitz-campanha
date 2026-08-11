import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { getD1Binding } from "./runtime";

export function getDb() {
  return drizzle(getD1Binding(), { schema });
}
