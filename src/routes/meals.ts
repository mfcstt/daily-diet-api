import type { FastifyInstance } from "fastify";
import z from "zod";
import { db } from "../database.js";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id.js";

export function mealsRoute(app: FastifyInstance) {

  // get all meals
  app.get('/', {preHandler: [checkSessionIdExists]}, async(request, reply) => {
    const meals = await db('meals').select('*').where({
      user_id: request.user?.id
    })
    return reply.send(meals)
  })

  // validate request body
  app.post('/', {preHandler: [checkSessionIdExists]}, async(request, reply) =>{
    const mealsSchema = z.object({
      name: z.string(),
      description: z.string(),
      date_time: z.iso.datetime(),
      is_on_diet: z.boolean()
    })

    // parse and validate the request body
    const {name, description, date_time, is_on_diet} = mealsSchema.parse(request.body)

    // insert new meal into the database
    await db('meals').insert({
      id: randomUUID(),
      name,
      description,
      date_time,
      is_on_diet: is_on_diet,
      user_id: request.user?.id
    })
    return reply.status(201).send(
      {message: 'Meal created successfully'}
    )
  })


}