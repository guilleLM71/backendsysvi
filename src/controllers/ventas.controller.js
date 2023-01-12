import pool from "../database";

export const getventas = async (req, res) => { 
  const ventasdb = await pool.query("SELECT nofactura, fecha,codcliente, totalfactura, estado FROM factura ORDER BY nofactura DESC")
  return res.status(200).json(ventasdb);
};

export const detalletmp = async (req, res) => { 
  const {codproducto,cantidad,token}=req.body
  const ventasdb = await pool.query("CALL add_detalle_temp (?,?,?)"
  ,[codproducto,cantidad,token])
  return res.status(200).json(ventasdb);
};

export const getdetalletmp = async (req, res) => { 
  const {token}=req.body
  const ventasdb = await pool.query("SELECT tmp.correlativo, tmp.token_user, tmp.cantidad, tmp.precio_venta, p.codproducto, p.descripcion  FROM detalle_temp tmp INNER JOIN producto p ON tmp.codproducto = p.codproducto  where tmp.token_user = ?",
  [token])
  return res.status(200).json({ventasdb});
};


export const deldetalletmp = async (req, res) => { 
  const {correlativo, token}=req.body
  const ventasdb = await pool.query("CALL del_detalle_temp(?,?)",
  [correlativo, token])
  return res.status(200).json({

    msg:"Se ha eliminado el producto del detalle"
   
  });
};


export const procesarventa = async (req, res) => { 
  const {idusuario, idcliente, token}=req.body
  const ventasdb = await pool.query("CALL procesar_venta(?,?,?)",
  [idusuario, idcliente, token])
  return res.status(200).json({
    msg:"Se ha procesado la venta"
  });
};


export const getfactura = async (req, res) => { 
  const {nofactura}=req.body
  const facturadb = await pool.query("CALL get_factura(?)",
  [nofactura])

  const detallefacturadb = await pool.query("SELECT d.cantidad, p.descripcion, p.precio, (p.precio*d.cantidad) as total FROM detallefactura d INNER JOIN producto p ON d.nofactura = (?) WHERE d.codproducto = p.codproducto",
  [nofactura])


  return res.status(200).json({facturadb, detallefacturadb});
};
