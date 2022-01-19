const path = require('path')
const express = require('express')
const OpenApiValidator = require('express-openapi-validator')
const { catchErrors } = require('./utils/errors')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const paseto = require('./utils/paseto')
const config = require('./config')

const app = express()

// Set up Express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(config.cookie.secret))

const allowedOrigins = [
  `https://${config.server.hostname}`,
  `https://${config.server.hostname}:8080`,
]

app.use(
  cors({
    credentials: true, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    origin: (origin, callback) => {
      if (origin === undefined || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`${origin} not allowed by CORS policy`))
      }
    }
  })
)

// Need to find a way to set res.locals inside security handler
// app.use(`/api`, authenticate)

// Register OpenAPI Routes
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.resolve(__dirname, '../../openapi.yaml'),
    validateRequests: false,
    validateResponses: false,
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

// Catch-all route to allow for "deep-linking" into the
// Vue.js application
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
})

process.on('unhandledRejection', reason => {
  console.log(`Unhandled promise rejection with reason: ${reason}`)
})

module.exports = app