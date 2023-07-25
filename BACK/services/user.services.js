const Users = require("../models/Users.models");
const { generateToken } = require("../config/tokens");
const { ADMIN_TOKEN } = require("../config/envs");


//crear clase**
const UserService = {
  createUser: async (userData) => {
    try {
    const { name, email, password, phone, code } = userData;
      console.log(userData);

      let user = await Users.findOne({ where: { email: email } });
      if (user) {
        return {
          success: false,
          status: 401,
          message: "Ya existe un usuario registrado con ese email.",
        };
      }

      if (code === ADMIN_TOKEN) {
        const createdUser = await Users.create({ ...userData, role: "admin" });
        return {
          success: true,
          status: 201,
          message: `Usuario con privilegios de Administrador creado con éxito: ${createdUser.email}`,
        };
      } else if (code === "") {
        const createdUser = await Users.create(userData);
        return {
          success: true,
          status: 201,
          message: `Usuario creado con éxito: ${createdUser.email}`,
        };
      } else {
        return {
          success: false,
          status: 400,
          message:
            "Código incorrecto. Introduce un código válido o deja el campo en blanco.",
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Hubo un error en el registro",
      };
    }
  },

  loginUser: async (loginData) => {
    try {
    const {email,password}=loginData
      let user = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return {
          success: false,
          status: 401,
          message: "Usuario incorrecto/inexistente.",
        };
      } else {
        if (await user.validatePassword(password)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          };
          let token = generateToken(payload);
          return {
            success: true,
            status: 200,
            data: payload,
            token: token,
          };
        } else {
          return {
            success: false,
            status: 404,
            message: "Contraseña Incorrecta",
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Hubo un error en el inicio de sesión",
      };
    }
  },

  logOut: (req, res) => {
    res.clearCookie("token");
    res.sendStatus(204);
  },

  getAllUsers:async()=>{
    try {
      const users = await Users.findAll({
        attributes: ["id", "name", "email", "phone", "role"],
      });
  
      return users;
    } catch (error) {
      throw new Error("No se encontraron usuarios");
    }
  },
  getOneUser:async(id)=>{
    try {
      const user = await Users.findByPk(id, {
        attributes: ["id", "name", "email","phone","role"],
      });
  
      if (user) {
        return user;
      } else {
        throw new Error("Usuario no encontrado.");
      }
    } catch (error) {
      throw new Error("error al obtener el");
    }
  } 

};

module.exports = UserService;
