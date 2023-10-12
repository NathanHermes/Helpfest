export function resolver (handlerFunction) {
  return async (request, response, next) => {
    return Promise
      .resolve(handlerFunction(request, response, next))
      .catch((error) => next(error))
  }
}