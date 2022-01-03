const { verify } = require("../utils/paseto")

async function authenticate(req, res) {
  const token = req.cookies.token

  try {
    const payload = await verify(token)

    res.locals.username = payload.sub
  } catch(error) {
  }
}

module.exports = {
  authenticate
}