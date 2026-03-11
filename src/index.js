import { Hono } from 'hono'

import projects from './routes/projects.js'

import { isApiError } from './utils/errors.js'

import { sendError } from './utils/response.js'


const app = new Hono()


const api = new Hono()

// Global middleware that runs for every request
// Generates a unique trace ID used for debugging and request tracking
app.use('*', async (c, next) => {
  c.set('traceId', crypto.randomUUID()) // helpful for logging and troubleshooting
  await next()
})

// Register the projects routes under /projects
// Example: /api/projects
api.route('/projects', projects)

// Mount the API router under /api
// All API endpoints will start with /api
// Example: /api/projects
app.route('/api', api)

// Handles requests that do not match any route
// Returns a standardized JSON error response
app.notFound((c) => {
  return sendError(c, 404, 'NOT_FOUND', 'Route not found.')
})

// Global error handler
// Captures any errors thrown in routes or middleware
app.onError((error, c) => {

  // If the error is a known ApiError, return structured error info
  if (isApiError(error)) {
    return sendError(c, error.status, error.code, error.message, error.details)
  }

  // If it is an unknown error, log it for debugging
  console.error('Unhandled error:', error)

  // Return a generic server error to the client
  return sendError(
    c,
    500,
    'INTERNAL_SERVER_ERROR',
    'An unexpected server error occurred.',
  )
})

// Export the app so it can be used by the server entry file
export default app