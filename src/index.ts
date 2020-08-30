import Koa from 'koa'
import bodyParser from 'koa-bodyparser-ts';
import Router from '@koa/router'
import cors from '@koa/cors';
import routes from './routes'
import db from './db'
import { Server } from 'http'

interface IStartServerOpts {
  port: number
  dbUrl: string
}

// port and db are parameterized for testing
export async function startServer({ port, dbUrl }: IStartServerOpts) {
  const dbc = await db.connect(dbUrl)

  const app = new Koa()

  app.use(cors())
  app.use(bodyParser())

  const router = new Router();

  router.prefix('/api').use('/routes', routes)

  app.use(router.routes())

  const server: Server = await new Promise((resolve) => {
    const server = app.listen(port, () => resolve(server))
  })

  return async () => Promise.all([ dbc.disconnect(), server.close() ])
}

const PORT = 1337;
const DB_URL = 'mongodb://localhost:27017/rest-boilerplate'

async function main() {
  await startServer({ port: PORT, dbUrl: DB_URL})
  console.log('started app on:', PORT)
}

if (require.main === module) {
  main().catch(console.error)
}
