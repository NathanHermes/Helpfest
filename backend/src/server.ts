import cors from 'cors'
import express, { NextFunction } from 'express'
import { CompanyRoutes } from './application/routes/company.route'
import { PartyRoutes } from './application/routes/party-routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(CompanyRoutes)
app.use(PartyRoutes)

app.listen(3001, () => {
  console.log('Server running on port 3001')
})

/* Middleware de tratamento de error */
app.use((error, req, res, next: NextFunction) => {
  if (error /*&& error.statusCode*/) {
    res.status(500/*error.statusCode*/).json({
      statusCode: error.statusCode,
      message: error.message
    })
  } else {
    console.log(error)
  }
  next()
}) 