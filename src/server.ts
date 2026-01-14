import { app } from "./app.js";
import { env } from "./env.js";
import cookie from "@fastify/cookie"

app.register(cookie);

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`🚀 Server is running on http://localhost:${env.PORT}`);
}
)