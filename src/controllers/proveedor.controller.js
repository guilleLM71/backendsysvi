import pool from "../database";

export const getproveedores = async (req, res) => { 
  const proveedoresdb = await pool.query("SELECT * FROM proveedor")
  return res.status(200).json(proveedoresdb);
};


export const createproveedor = async (req, res) => {
  
  try {
    const {         
proveedor,
contacto,
telefono,
direccion,
idusuario,
  } = req.body;

    console.log(req.body)

    const userdb = await pool.query("SELECT * FROM proveedor where proveedor =?", [
      proveedor
    ])
    const existe=userdb[0]
    
    if(existe>0)
    {
      
    return res.status(400).json({

      msg:"Ya existe el proveedor "
     
    });
    }
    else{

      await pool.query( "INSERT INTO proveedor(proveedor,contacto,telefono,direccion,usuario_id) values (?, ?, ?, ?, ?)", [
        proveedor,contacto,telefono,direccion,idusuario
        
      ])
      
      return res.status(200).json({ 
        msg:"Proveedor se registro correctamente"
      });
    }
   
  } catch (error) {
    console.error(error);
    
  }
};

export const borrarproveedor = async (req, res) => {
  
  try {
    const {         
   codproveedor } = req.body;

    console.log(req.body)
    const userdb = await pool.query("DELETE FROM proveedor WHERE codproveedor = ?", [
      codproveedor
    ])
    return res.status(200).json({

      msg:"Proveedor eliminado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al eliminar "
     
    });
    
  }
};


export const editproveedor = async (req, res) => {
  
  try {
    const {proveedor,contacto,telefono,direccion,codproveedor} = req.body;

    console.log(req.body)
    const userdb = await pool.query("UPDATE proveedor SET proveedor = ?, contacto = ? , telefono = ?, direccion = ? WHERE codproveedor = ?", [
      proveedor,contacto,telefono,direccion,codproveedor
    ])
    return res.status(200).json({

      msg:"Proveedor actulizado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al editar "
     
    });
    
  }
};

 

export const getproveedorid = async (req, res) => { 
  /*const users = await User.find();
  return res.json(users);*/
  const { codproveedor } = req.body;
  const userdb = await pool.query("select p.proveedor,p.contacto,  p.telefono, p.direccion FROM  proveedor p WHERE p.codproveedor = ?", [
    codproveedor
  ])
  const user=userdb[0]
  console.log(user)
  return res.status(200).json({ user});
};
