const { ADMIN_TOKEN } = require("../config");
const { generateToken } = require("../config/tokens");
const Users = require("../models/Users");

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, code } = req.body;
    console.log(req.body);

    let user = await Users.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(401)
        .send("Ya existe un usuario registrado con ese email.");
    }

    if (code === ADMIN_TOKEN) {
      const createdUser = await Users.create({ ...req.body, role: "admin" });
      return res
        .send({
          success: true,
          message: `Usuario con privilegios de Administrador creado con éxito: ${createdUser.email}`,
        })
        .status(201);
    } else if (code === "") {
      const createdUser = await Users.create(req.body);
      return res
        .send({
          success: true,
          message: `Usuario creado con éxito: ${createdUser.email}`,
        })
        .status(201);
    } else {
      return res
        .send({
          success: false,
          message:
            "Código incorrecto. Introduce un código válido o deja el campo en blanco.",
        })
        .status(400);
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Hubo un error en el registro",
    });
  }
};

const loginUser = async (req, res) => {
  let user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.status(401).send("Usuario incorrecto/inexistente.");
  } else {
    if (await user.validatePassword(req.body.password)) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };
      let token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    } else {
      res.status(404).send("Contraseña Incorrecta");
    }
  }
};

const logOut = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

module.exports = { createUser, loginUser, logOut };
