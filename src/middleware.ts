import { Context, Next } from 'koa'
import * as yup from 'yup'

export function validateBody(schema: yup.ObjectSchema) {
  return async (ctx: Context, next: Next) => {
    try {
      await schema.validate(ctx.request.body)
      return next()
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}
