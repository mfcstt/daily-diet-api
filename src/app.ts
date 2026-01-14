import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { usersRoute } from '../src/routes/users.js';
import { mealsRoute } from '../src/routes/meals.js';

export const app = fastify()

app.register(cookie)

app.register(usersRoute, {
  prefix: '/users'
})

app.register(mealsRoute, {
  prefix: '/meals'
})
