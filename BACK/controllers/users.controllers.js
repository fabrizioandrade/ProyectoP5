const UserService = require("../services/user.services");

const createUser = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body);

    return res.status(result.status).send({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Hubo un error en el registro",
    });
  }
};

const loginUser = async (req, res) => {

  try {
    const result = await UserService.loginUser(req.body);

    if (result.success) {
      res.cookie("token", result.token);
    }

    return res.status(result.status).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Hubo un error en el inicio de sesión",
    });
  }
};


const logOut = (req, res) => {
  try {
    UserService.logOut(req, res);
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Hubo un error al cerrar sesión",
    });
  }
};
module.exports = { createUser, loginUser, logOut };