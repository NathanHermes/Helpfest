import { NextFunction, Request, Response } from 'express'
import { HandlerFunction } from '../../utils/resolver'
import { JwtPayload, verify } from 'jsonwebtoken'

export class VerifyToken {
  execute: HandlerFunction = async (request: Request, response: Response, next?: NextFunction): Promise<undefined> => {
    const { authorization } = request.headers

    if (!authorization) throw new Error('Token de autorização inválido')

    verify(authorization, 'HELPFEST', (error, decoded) => {
      if (error) throw new Error(error.message)
      if (!decoded) throw new Error('Token JWT inválido')

      const payload = decoded as JwtPayload

      request.headers['company'] = [payload.id, payload.email]

      next!()
    })
  }
}

