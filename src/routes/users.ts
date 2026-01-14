import type { FastifyInstance } from "fastify";
import z from "zod";
import { db } from "../database.js";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id.js";

export async function usersRoute(app: FastifyInstance){
  // GET /users
  app.get('/', async() => {
    const users = await db('users').select('*')
    return users
  })

  // POST /users
  app.post('/', async(request, reply) => {

    // validate request body
    const userSchema = z.object({
      name: z.string(),
      email: z.email(),
    })

    // parse and validate the request body
    const {name, email} = userSchema.parse(request.body)

    // define cookies for session management
    let sessionId = request.cookies.sessionId
    if(!sessionId){
      sessionId = randomUUID()
      
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    // insert new user into the database
    await db('users').insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    })

    reply.status(201).send(
      {message: 'User created successfully', sessionId}
    )
  })
}

