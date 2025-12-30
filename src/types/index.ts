import { z } from "zod";
import type { AddSchema, DataSchema} from "../utils/actions-schema";

export type AuthUser = {
  username: string;
  password: string;
};

export type Actions = z.infer<typeof DataSchema>;
export type AdminAdd = z.infer<typeof AddSchema>;

