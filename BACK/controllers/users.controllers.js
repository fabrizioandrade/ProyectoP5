const { Sequelize } = require("sequelize");
const Users = require("../models/Users.models");
const UserService = require("../services/user.services");
const sendEmail = require("../utils/gmail.utils");

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

const getAllUsers=async(req,res)=>{
  try {
    const users = await UserService.getAllUsers();
    const customers = users.filter(user => user.role === 'customer');
    res.send(customers);
  } catch (error) {
    res.status(400).send("error al obtener usuarios");
  }
}

const getOneUser=async(req,res)=>{
  const id = req.params.id;
  try {
    const user = await UserService.getOneUser(id);
    res.send(user);
  } catch (error) {
    res.status(400).send("error al obtener el usuario");
  }
}

const searchUser=async(req,res)=>{
  const { query } = req.params; 
  const isNumeric = !isNaN(query);
  try {
    let users;

    if (isNumeric) {
      const id = parseInt(query);
      const user = await Users.findByPk(id, {
        attributes: ["id", "name", "email", "phone", "role"],
      });

      if (user) {
        users = [user];
      } else {
        users = [];
      }
    } else {
      users = await Users.findAll({
        where: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("name")),
          "LIKE",
          `%${query.toLowerCase()}%`
        ),
        attributes: ["id", "name", "email", "phone", "role"],
      });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se encontraron usuarios",
    });
  }
}

const contactAdmin=async(req,res)=>{
  const {userId}=req.params
  const message=req.body.data
console.log(typeof(message));
try {
   let user = await Users.findOne({
        where: {
          id: userId,
        },
      });
if (!user) {
        return {
          success: false,
          status: 401,
          message: "Usuario incorrecto/inexistente.",
        } }

  else{

    const mailOptions = {
      from: 'devhouse@gmail.com',
      to: 'fabrizioandrade989@gmail.com',
      subject: 'Solicitud de contacto',
      text:'contacto',
      html: `<h1${message}</h1>`
    };
    await sendEmail(mailOptions)


    return res.status(200).send({
      success:true,
      message: 'se envio el mail',
    });  }
} catch (error) {
  console.log(error
    );
}
}
module.exports = { createUser, loginUser, logOut ,getAllUsers,getOneUser,searchUser,contactAdmin};
