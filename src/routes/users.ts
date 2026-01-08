import type { FastifyInstance } from "fastify";
import z from "zod";

export async function usersRoute(app: FastifyInstance){
  app.get('/', async() => {
    return { message: 'List of users' }
  })

  app.post('/', async(request) => {

    // validate request body
    const userSchema = z.object({
      name: z.string(),
      email: z.email(),
    })

    // parse and validate the request body
    const parseBody = userSchema.parse(request.body)

    return { message: 'User created successfully' }
  })
}

