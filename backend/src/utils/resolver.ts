import { NextFunction, Request, Response } from 'express'

export type HandlerFunction = (request: Request, response: Response, next?: NextFunction) => Promise<Response | undefined>

export function resolver (handlerFunction: HandlerFunction) {
  return async (request: Request, response: Response, next?: NextFunction) => {
    return Promise
      .resolve(handlerFunction(request, response, next))
      .catch((error) => next!(error))
  }
}