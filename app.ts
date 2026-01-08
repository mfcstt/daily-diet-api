import fastify from 'fastify';
import { usersRoute } from './src/routes/users.js';

export const app = fastify()

app.register(usersRoute, {
  prefix: '/users'
})