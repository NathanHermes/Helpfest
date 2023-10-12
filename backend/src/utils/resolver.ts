import { NextFunction, Request, Response } from 'express'

export interface HandlerFunction {
  (request: Request, response: Response, next?: NextFunction)
}

export function resolver (handlerFunction: HandlerFunction) {
  return async (request, response, next) => {
    return Promise
      .resolve(handlerFunction(request, response, next))
      .catch((error) => next(error))
  }
}