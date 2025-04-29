const jwt = require('jsonwebtoken');

const createUserToken = (user, req, res) => {
  const token = jwt.sign({name: user.name, id: user._id}, process.env.SECRET_KEY)

  res.status(200).json({
    message: "Usuário autenticado.",
    token: token,
    userId: user._id
  })
}

module.exports = createUserToken