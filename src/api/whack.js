const path = require('path')
const express = require('express')
const OpenApiValidator = require('express-openapi-validator')
const { catchErrors } = require('./utils/errors')
const cookieParser = require('cookie-parser')
const paseto = require('./utils/paseto')

const app = express()

// Set up Express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Need to find a way to set res.locals inside security handler
// app.use(`/api`, authenticate)

// Register OpenAPI Routes
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.resolve(__dirname, '../../openapi.yaml'),
    validateRequests: true,
    validateResponses: true,
    operationHandlers: {
      basePath: path.join(__dirname, 'controllers'),
      resolver: (handlersPath, route, apiDoc) => {
        const pathKey = route.openApiRoute.substring(route.basePath.length)
        const schema = apiDoc.paths[pathKey][route.method.toLowerCase()]
        const [controller, method] = schema['operationId'].split('.')
        const modulePath = path.join(handlersPath, controller)
        const handler = require(modulePath)
        if (handler[method] === undefined) {
            throw new Error(`Could not find a [${method}] function in ${modulePath} when trying to route [${route.method} ${route.expressRoute}].`)
        }
        return catchErrors(handler[method])
      }
    },
    validateSecurity: {
      handlers: {
        BasicAuth: () => true,      
        BearerAuth: async req => await paseto.authenticate(req),
      }
    }
  }),
)

// Serve the Vue.js bundle
app.use(express.static(path.resolve(__dirname, '../../dist')))

// We will need a catch-all route to be able to support 
// deep-linking into the Vue application.

// Error handler
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