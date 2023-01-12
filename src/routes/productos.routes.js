import { Router } from "express";
const router = Router();

import * as productosCtrl from "../controllers/productos.controller";
import { authJwt } from "../middlewares";


router.get(  "/",
  [
    authJwt.verToken,
  ],
  productosCtrl.getproductos
);

router.post( "/crearproducto",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  productosCtrl.createproducto
);

router.post( "/eliminarproducto",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  productosCtrl.borrarproducto
);

router.post(  "/getproductoid",
[
  authJwt.verToken,
],
productosCtrl.getproductoid
);

router.post(  "/editproducto",
[
  authJwt.verToken,
],
productosCtrl.editproducto
);
router.post(  "/editproductostock",
[
  authJwt.verToken,
],
productosCtrl.editproductostock
);



export default router;
