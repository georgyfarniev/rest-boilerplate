import Router from '@koa/router'
import { Context } from 'koa'
import * as yup from 'yup'
import db from './db'
import { validateBody } from './middleware'

const router = new Router()

const PET_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required()
})

// List pets
router.get('/pets', async (ctx: Context) => {
  ctx.body = await db.Pet.find().lean()
})

router.post('/pets', validateBody(PET_SCHEMA), async (ctx: Context) => {
  await db.Pet.create(ctx.request.body)
  ctx.status = 200
})

export default router.routes()
