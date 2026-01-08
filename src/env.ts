import z from "zod";
import {config} from "dotenv";

// define the schema for environment variables
const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
})

// load environment variables from .env file
config();

// parse and validate environment variables
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables");
  throw new Error("Invalid environment variables.");
}

export const env = _env.data;







