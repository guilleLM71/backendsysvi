import jwt from "jsonwebtoken";
import pool from "../database";
export const verToken =  ( req, res, next ) => {

  try {

      let token = req.header('xx-token');
      console.log(token)

      if( !token ){
          return res.status(401).json({
              resp: false,
              msg : 'Sin Token '
          });
      }

      const { idusuario } =  jwt.verify( token, "secretotoken" );
      console.log(idusuario)
      req.idusuario = idusuario;
      console.log(req.idusuario)

      next();
      
  } catch (e) {
      return res.status(500).json({
          resp: false,
          msg : e.message,
      });
  }

}

export const isVendedor = async (req, res, next) => {
  try {
    const user = await pool.query("select * from usuario where idusuario=?",[
      req.idusuario
    ])
    console.log(user)

    if (user[0].rol === "3") {
        next();
        return;
    }else{
      return res.status(403).json({ message: "No tiene el rol de vendedor!" });
    }
    

   
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await pool.query("select * from usuario where idusuario=?",[
      req.idusuario
    ])
    console.log(user)

    if (user[0].rol === "1") {
        next();
        return;
    }else{
      return res.status(403).json({ message: "No tiene el rol de admin!" });
    }
    

   
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};
