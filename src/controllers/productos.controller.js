import pool from "../database";

export const getproductos = async (req, res) => { 
  const productosdb = await pool.query("SELECT * FROM producto")
  return res.status(200).json(productosdb);
};


export const createproducto = async (req, res) => {
  
  try {
    const {         
proveedor,
descripcion,
precio,
existencia,
idusuario
  } = req.body;

    console.log(req.body)

    const userdb = await pool.query("SELECT * FROM producto where descripcion =?", [
      descripcion
    ])
    const existe=userdb[0]
    
    if(existe>0)
    {
      
    return res.status(400).json({

      msg:"Ya existe el producto "
     
    });
    }
    else{

      await pool.query( "INSERT INTO producto(descripcion,proveedor,precio, existencia,usuario_id) values (?, ?, ?, ?, ?)", [
        descripcion,proveedor,precio,existencia,idusuario
        
      ])
      
      return res.status(200).json({ 
        msg:"Producto se registro correctamente"
      });
    }
   
  } catch (error) {
    console.error(error);
    
  }
};

export const borrarproducto = async (req, res) => {
  
  try {
    const {         
   codproducto } = req.body;

    console.log(req.body)
    const userdb = await pool.query("DELETE FROM producto WHERE codproducto = ?", [
      codproducto
    ])
    return res.status(200).json({

      msg:"Producto eliminado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al eliminar "
     
    });
    
  }
};


export const editproducto = async (req, res) => {
  
  try {
    const {descripcion, proveedor,precio,codproducto} = req.body;

    console.log(req.body)
    const userdb = await pool.query("UPDATE producto SET descripcion = ?,  proveedor= ? , precio = ? WHERE codproducto = ?", [
      descripcion,proveedor,precio,codproducto
    ])
    return res.status(200).json({

      msg:"producto actulizado "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al editar "
     
    });
    
  }
};

 

export const getproductoid = async (req, res) => { 
  /*const users = await User.find();
  return res.json(users);*/
  const { codproducto } = req.body;
  const userdb = await pool.query("SELECT p.codproducto, p.descripcion, p.precio, p.existencia ,pr.codproveedor, pr.proveedor FROM producto p INNER JOIN proveedor pr ON p.proveedor = pr.codproveedor WHERE p.codproducto = ?", [
    codproducto
  ])
  const user=userdb[0]
  console.log(userdb)
  return res.status(200).json({ user});
};


export const editproductostock = async (req, res) => {
  
  try {
    const {nprecio,ncantidad,codproducto,idusuario} = req.body;

    await pool.query("INSERT INTO entradas(codproducto,cantidad,precio,usuario_id) VALUES (?, ?, ?, ?)", [
      codproducto,ncantidad, nprecio,idusuario
    ])

    

    console.log(nprecio,ncantidad)
    const userdb = await pool.query("CALL actualizar_precio_producto(?,?,?)", [
      ncantidad, nprecio,codproducto
    ])
    return res.status(200).json({

      msg:"Producto adicionado correctamente "
     
    });
  
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({

      msg:"Error al editar "
     
    });
    
  }
};
