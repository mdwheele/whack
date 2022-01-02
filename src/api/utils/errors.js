/**
 * This function wraps async Express handlers, catching
 * any exceptions and forwarding them to the Error handler
 * for the current router.
 * 
 * @param {import("express").RequestHandler} handler 
 */
function catchErrors(handler) {
  return async (req, res, next) => {
    try {
      return await handler(req, res, next)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = {
  catchErrors
}