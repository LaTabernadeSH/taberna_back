const ERROR_HANDLERS = {
  CastError: (res) => {
    res.status(400).json({ error: "Id used is malformed" }).end();
  },

  JsonWebTokenError: (res) => {
    res.status(401).json({ error: "Token missing or invalid" }).end();
  },

  TokenExpirerError: (res) => {
    res.status(401).json({ error: "Token expired" }).end();
  },

  BadRequest: (res, err) => {
    res
      .status(400)
      .json({ error: `Missing required data: ${err.message}` })
      .end();
  },

  SequelizeDatabaseError: (res, err) => {
    res.status(409).json({ error: err.message }).end();
  },

  ValidationError: (res, err) => {
    res.status(409).json({ error: err.message }).end();
  },

  defaultError: (res, err) => {
    const status = err.status || 500;
    const message = { error: err.message } || err;
    //console.error(err.stack);
    res.status(status).json(message).end();
  },
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;
  handler(res, err);
};
