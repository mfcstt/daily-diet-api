import type { FastifyInstance } from "fastify";
import z from "zod";
import { db } from "../database.js";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id.js";

export async function mealsRoute(app: FastifyInstance) {

  // get all meals
  app.get('/', {preHandler: [checkSessionIdExists]}, async(request, reply) => {
    const meals = await db('meals').select('*').where({
      user_id: request.user?.id
    })
    return reply.send(meals)
  })

  // create meal
  app.post('/', {preHandler: [checkSessionIdExists]}, async(request, reply) =>{
    const mealsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date_time: z.string().datetime(),
      is_on_diet: z.boolean()
    })

    // parse and validate the request body
    const {name, description, date_time, is_on_diet} = mealsBodySchema.parse(request.body)

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

  // get meal by id
  app.get('/:id', {preHandler: [checkSessionIdExists]}, async(request, reply) => {

    // validate request params
    const mealsBodySchema = z.object({
      id: z.uuid()
    })

    //parse and validate the request params
    const {id} = mealsBodySchema.parse(request.params)

    
    // fetch meal from the database
    const meal = await db('meals').select('*').where({
      id
    }).first()

    if(!meal){
      return reply.status(404).send({message: 'Meal not found'})
    }
    return reply.status(200).send(meal)
  }
  )

  // delete meal
  app.delete('/:id', {preHandler: [checkSessionIdExists]}, async(request, reply) => {
    // validate request params
    const mealsBodySchema = z.object({
      id: z.uuid()
    })

    //parse and validate the request params
    const {id} = mealsBodySchema.parse(request.params)

    // delete meal from the database
    const deletedMeal = await db('meals').where({
      id,
      user_id: request.user?.id
    }).delete()

    if(!deletedMeal){
      return reply.status(404).send({message: 'Meal not found'})
    }
    return reply.status(200).send({message: 'Meal deleted successfully'})

})

// update meal
app.put('/:id', {preHandler: [checkSessionIdExists]}, async(request, reply) => {
  // validate request params
  const mealsParamsSchema = z.object({
    id: z.uuid()
  })

  // validate request body
  const mealsBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date_time: z.string().datetime(),
    is_on_diet: z.boolean()
  })

  //parse and validate the request params
  const {id} = mealsParamsSchema.parse(request.params)

  // parse and validate the request body
  const {name, description, date_time, is_on_diet} = mealsBodySchema.parse(request.body)

  // update meal in the database
  const updatedMeal = await db('meals').where({
    id,
    user_id: request.user?.id
  }).update({
    name,
    description,
    date_time,
    is_on_diet
  })

  if(!updatedMeal || updatedMeal === 0){
    return reply.status(404).send({message: 'Meal not found or no changes made'})
  }
  return reply.status(200).send({message: 'Meal updated successfully'})
})

// get meals statistics
app.get('/statistics/summary', {preHandler: [checkSessionIdExists]}, async(request, reply) => {
  const userId = request.user?.id

  // fetch all meals for the user
  const meals = await db('meals').select('*').where({
    user_id: userId
  })

  const totalMeals = meals.length
  const mealsOnDiet = meals.filter(meal => meal.is_on_diet).length
  const mealsOffDiet = totalMeals - mealsOnDiet
  const bestDietStreak = (() => {
    let maxStreak = 0
    let currentStreak = 0
    for (const meal of meals) {
      if (meal.is_on_diet) {
        currentStreak++
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak
        }
      } else {
        currentStreak = 0
      }
    }
    return maxStreak
  })()

  return reply.status(200).send({
    totalMeals,
    mealsOnDiet,
    mealsOffDiet,
    bestDietStreak
  })
})
}
