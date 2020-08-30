import Router from '@koa/router'
import { Context } from 'koa'
import db from './db'

const router = new Router()

// List pets
router.get('/pets', async (ctx: Context) => {
  ctx.body = await db.Pet.find().lean()
})


export default router.routes()
