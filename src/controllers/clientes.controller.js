import pool from "../database";

export const getclientes = async (req, res) => { 
  const clientesdb = await pool.query("SELECT * FROM cliente")
  return res.status(200).json(clientesdb);
};

export const createcliente = async (req, res) => {
  
  try {
    const {         
dni,
nombre,
telefono,
direccion,
idusuario,
  } = req.body;

    console.log(req.body)

    const userdb = await pool.query("SELECT * FROM cliente where dni =?", [
      dni
    ])
    const existe=userdb[0]
    
    if(existe>0)
    {
      
    return res.status(400).json({

      msg:"Ya existe el cliente "
     
    });
    }
    else{

      await pool.query( "INSERT INTO cliente(dni,nombre,telefono,direccion,usuario_id) values (?, ?, ?, ?, ?)", [
        dni,nombre,telefono,direccion,idusuario
        
      ])
      
      return res.status(200).json({ 
        msg:"Cliente se registro correctamente"
      });
    }
   
  } catch (error) {
    console.error(error);
    
  }
};

export const borrarcliente = async (req, res) => {
  
  try {
    const {         
   idcliente } = req.body;

    console.log(req.body)
    const userdb = await pool.query("DELETE FROM cliente WHERE idcliente = ?", [
      idcliente
    ])
    return res.status(200).json({

      msg:"Cliente eliminado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al eliminar "
     
    });
    
  }
};


export const editcliente = async (req, res) => {
  
  try {
    const {dni,nombre,telefono,direccion,idcliente} = req.body;

    console.log(req.body)
    const userdb = await pool.query("UPDATE cliente SET dni = ?, nombre = ? , telefono = ?, direccion = ? WHERE idcliente = ?", [
      dni,nombre,telefono,direccion,idcliente
    ])
    return res.status(200).json({

      msg:"Cliente actulizado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al editar "
     
    });
    
  }
};

 

export const getclienteid = async (req, res) => { 
  /*const users = await User.find();
  return res.json(users);*/
  const { idcliente } = req.body;
  const userdb = await pool.query("select c.dni,c.nombre,  c.telefono, c.direccion FROM  cliente c WHERE c.idcliente = ?", [
    idcliente
  ])
  const user=userdb[0]
  console.log(user)
  return res.status(200).json({ user});
};

export const getclientedni = async (req, res) => { 
  /*const users = await User.find();
  return res.json(users);*/
  const { dni } = req.body;
  console.log('dni :>> ', dni);
  const userdb = await pool.query("select c.idcliente, c.dni,c.nombre,  c.telefono, c.direccion FROM  cliente c WHERE c.dni = ?", [
    dni
  ])
  const user=userdb[0]
  console.log(user)
  return res.status(200).json({ user});
};
