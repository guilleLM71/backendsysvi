const md5 = require('md5')

import pool from "../database";
export const createUser = async (req, res) => {
  
  try {
    const {         
    nombre,
    correo,
    usuario,
    clave,
    rol, } = req.body;

    console.log(req.body)


    const pass=md5(clave)
    const userdb = await pool.query("SELECT * FROM usuario where correo =(?) or usuario =(?)", [
      correo,usuario
    ])
    const existe=userdb[0]
    
    if(existe>0)
    {
      
    return res.status(400).json({

      msg:"Ya existe el usuario "
     
    });
    }
    else{

      await pool.query( "INSERT INTO usuario(nombre,correo,usuario,clave,rol) values (?, ?, ?, ?, ?)", [
        nombre,correo,usuario,pass,rol
      ])
      
      return res.status(200).json({ 
        msg:"Usuario se registro correctamente"
      });
    }
   
  } catch (error) {
    console.error(error);
    
  }
};

export const borrarUser = async (req, res) => {
  
  try {
    const {         
   idusuario } = req.body;

    console.log(req.body)
    const userdb = await pool.query("DELETE FROM usuario WHERE idusuario = ?", [
      idusuario
    ])
    return res.status(200).json({

      msg:"Usuario eliminado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al eliminar "
     
    });
    
  }
};


export const editUser = async (req, res) => {
  
  try {
    const {nombre,correo,usuario,rol,idusuario} = req.body;

    console.log(req.body)
    const userdb = await pool.query("UPDATE usuario SET nombre = ?, correo = ? , usuario = ?, rol = ? WHERE idusuario = ?", [
      nombre,correo,usuario,rol,idusuario
    ])
    return res.status(200).json({

      msg:"Usuario actulizado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al editar "
     
    });
    
  }
};

export const cambiarclave = async (req, res) => {
  
  try {
    const {claveactual,clavenueva,clavenuevaconf,idusuario} = req.body;
    console.log(req.body)
    const pass= md5(claveactual)

    const swclaveactual=await pool.query("Select * from usuario WHERE idusuario = ? and clave =? ", [
      idusuario,pass
    ])

    if(swclaveactual){

      if(clavenueva==clavenuevaconf){

        const passnueva= md5(clavenueva)

        const userdb = await pool.query("UPDATE usuario SET clave = ? WHERE idusuario = ?", [
          passnueva, idusuario
        ])
        return res.status(200).json({
    
          msg:"Contraseña actualizada correctamente"
         
        });

      }else{
        return res.status(400).json({

          msg:"Las claves nuevas no coinciden"
         
        });
      }

    }else{
      return res.status(400).json({

        msg:"La clave actual es incorrecta"
       
      });
    }

    
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al editar "
     
    });
    
  }
};


export const cambiarconfiguracion = async (req, res) => {
  
  try {
    const {nit,nombre,rs,telefono, email, direccion} = req.body;
    console.log(req.body)
    
    const swcmabio=await pool.query("UPDATE empresa SET dni = ?, nombre = ?, razon_social = ?, telefono = ?, email = ?, direccion = ?", [
      nit,nombre,rs,telefono, email, direccion
    ])

    return res.status(200).json({
    
      msg:"Configuracion correcta"
     
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al editar "
     
    });
    
  }
};


export const getconfiguracion = async (req, res) => {
  
  try {
    const config=await pool.query("select * from empresa")
    console.log('config :>> ', config);
    return res.status(200).json({config});
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al extraer"
     
    });
    
  }
};

export const getdatosdashboard = async (req, res) => {
  
  try {
    const datos=await pool.query("CALL getdatosdash()")
    return res.status(200).json({datos});
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al extraer"
     
    });
    
  }
};




export const getUserid = async (req, res) => { 
  /*const users = await User.find();
  return res.json(users);*/
  const { idusuario } = req.body;
  const userdb = await pool.query("select u.nombre,  u.correo, u.usuario, r.rol FROM  usuario u INNER JOIN rol r ON u.rol= r.idrol WHERE u.idusuario = ?", [
    idusuario
  ])
  const user=userdb[0]
  console.log(user)
  return res.status(200).json({ user});
};


export const getUser=async (req, res) => {
  
  const userdb = await pool.query("select u.idusuario,  u.nombre,  u.correo, u.usuario, r.rol FROM  usuario u INNER JOIN rol r ON u.rol = r.idrol WHERE u.idusuario = ?", [
    req.idusuario
  ])
  const user=userdb[0]

  return res.status(200).json({ user});
}

export const getUsers=async (req, res) => {
  
  const userdb = await pool.query("select u.idusuario,  u.nombre,  u.correo, u.usuario, r.rol FROM  usuario u INNER JOIN rol r ON u.rol = r.idrol")
  return res.status(200).json({ userdb});
}



export const getRoles=async (req, res) => {
  
  const rolesdb = await pool.query("select * from rol")
  return res.status(200).json({ rolesdb});
}






