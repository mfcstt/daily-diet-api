import type { FastifyInstance } from "fastify";

export async function usersRoute(app: FastifyInstance){
  app.get('/', async() => {
    return { message: 'List of users' }
  })
}

