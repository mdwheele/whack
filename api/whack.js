const path = require('path')
const express = require('express')
const OpenApiValidator = require('express-openapi-validator')

const app = express()

// Set up Express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register OpenAPI Routes
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.resolve(__dirname, '../openapi.yaml'),
    validateRequests: true,
    validateResponses: true,
    operationHandlers: {
      basePath: path.join(__dirname, 'controllers'),
      resolver: OpenApiValidator.resolvers.modulePathResolver
    },
  }),
)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
})

// Eventually, the app module will not listen, it will simply
// export itself and be consumed by bin/www.js
app.listen(3000, () => {
  console.log('Listening on 3000...')
})