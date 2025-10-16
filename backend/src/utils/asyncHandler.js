// Utility to handle asynchronous route handlers and middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

export default asyncHandler