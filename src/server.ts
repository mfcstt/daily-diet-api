import { app } from "./app.js";
import { env } from "./env.js";

app.listen({
  port: env.PORT, host: ("RENDER" in process.env) ? '0.0.0.0' : 'localhost'
}).then(() => {
  console.log(`🚀 Server is running on http://localhost:${env.PORT}`);
}
)