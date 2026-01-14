import request from 'supertest'
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest'
import { app } from '../src/app.js'
import { execSync } from 'node:child_process'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Salad',
        description: 'Healthy green salad',
        date_time: new Date().toISOString(),
        is_on_diet: true,
      })
      .expect(201)
  })

  it('should be able to list all meals', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Salad',
        description: 'Healthy green salad',
        date_time: new Date().toISOString(),
        is_on_diet: true,
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .expect(200)

    expect(mealsResponse.body).toHaveLength(1)
  })

  it('should be able to get a meal by id', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Salad',
        description: 'Healthy green salad',
        date_time: new Date().toISOString(),
        is_on_diet: true,
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])

    const mealId = mealsResponse.body[0].id

    await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .expect(200)
  })

  it('should be able to update a meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Salad',
        description: 'Healthy green salad',
        date_time: new Date().toISOString(),
        is_on_diet: true,
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])

    const mealId = mealsResponse.body[0].id

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Updated Meal',
        description: 'Updated description',
        date_time: new Date().toISOString(),
        is_on_diet: false,
      })
      .expect(200)
  })

  it('should be able to delete a meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Salad',
        description: 'Healthy green salad',
        date_time: new Date().toISOString(),
        is_on_diet: true,
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])

    const mealId = mealsResponse.body[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .expect(200)
  })

  it('should be able to get meals statistics summary', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Meal 1',
        description: 'On diet',
        date_time: new Date().toISOString(),
        is_on_diet: true,
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .send({
        name: 'Meal 2',
        description: 'Off diet',
        date_time: new Date().toISOString(),
        is_on_diet: false,
      })
      .expect(201)

    const summaryResponse = await request(app.server)
      .get('/meals/statistics/summary')
      .set('Cookie', [`sessionId=${createUserResponse.body.sessionId}`])
      .expect(200)

    expect(summaryResponse.body).toEqual({
      totalMeals: 2,
      mealsOnDiet: 1,
      mealsOffDiet: 1,
      bestDietStreak: 1,
    })
  })
})
