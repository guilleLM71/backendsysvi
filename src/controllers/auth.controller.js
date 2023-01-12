//import User from "../model/user";
//import Role from "../model/role";

import jwt from "jsonwebtoken";
//import config from "../config";

//const { google } = require('googleapis')
//const { OAuth2 } = google.auth
//const client = new OAuth2(process.env.GOOGLE_CLIENT)

//const _ = require("lodash");

//const { OAuth2Client } = require("google-auth-library");
//const fetch = require("node-fetch");

//const { validationResult } = require("express-validator");

//const { errorHandler } = require('../helpers/dbErrorHandling');
//const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.MAIL_KEY);

import { response } from 'express';
import  pool  from "../database";

const md5 = require('md5')
export const login = async (req, res) => {

  try{
    const { usuario,contraseña } = req.body;
  
    console.log(usuario,contraseña);

    const validausuario = await pool.query('SELECT usuario FROM usuario WHERE usuario = ?', [ usuario ]);
  

    console.log(validausuario)
    if( validausuario.length === 0 ){
        return res.status(400).json({
            resp: false,
            msg : 'No existe este usuario'
        });
    }
   
    const pass= md5(contraseña)
    //console.log(pass)
    const userdb = await pool.query("select u.idusuario,  u.nombre,  u.correo, u.usuario, u.clave, r.idrol, r.rol FROM  usuario u INNER JOIN rol r ON u.rol = r.idrol WHERE u.usuario = ? AND u.clave = ?", [
      usuario,
      pass
    ])
  
  
    //console.log('userdb :>> ', userdb);
    const user = userdb[0];
    console.log(user)
  
    const token = jwt.sign({ idusuario: user.idusuario }, "secretotoken", {
      expiresIn: 86400, // 24 hours
    });
    if( pass==user.clave){

        return res.status(200).json({
          resp: true,
          msg : 'Welcome ',
          user: {
              idusuario: user.idusuario,
              nombre: user.nombre,
              correo: user.correo,
              usuario: user.usuario,
              rol: user.rol
      
          },
          token:token
      
      });
  
  
    }else{
      return res.status(401).json({
        resp: false,
        msg : 'Constraseña incorrecta'
    }); 
  
    
  
    }
    
  
    
  
  
    
  
  } catch (error) {
    return res.status(500).json({
        resp: false,
        msg : error
    });
  }
  
  
  
  
  
  
   
  };
  



