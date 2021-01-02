export const routeCatch = (func) => (req, res, next) => {
  return func(req, res, next).catch((error) => next(error));
};
