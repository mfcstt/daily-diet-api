import fastify from 'fastify';
import { usersRoute } from './src/routes/users.js';
import { mealsRoute } from './src/routes/meals.js';

export const app = fastify()

app.register(usersRoute, {
  prefix: '/users'
})

app.register(mealsRoute, {
  prefix: '/meals'
})