import { Router } from "express";
const router = Router();

import * as proveedorCtrl from "../controllers/proveedor.controller";
import { authJwt } from "../middlewares";


router.get(  "/",
  [
    authJwt.verToken,
  ],
  proveedorCtrl.getproveedores
);

router.post( "/crearproveedor",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  proveedorCtrl.createproveedor
);

router.post( "/eliminarproveedor",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  proveedorCtrl.borrarproveedor
);

router.post(  "/getproveedorid",
[
  authJwt.verToken,
],
proveedorCtrl.getproveedorid
);

router.post(  "/editproveedor",
[
  authJwt.verToken,
],
proveedorCtrl.editproveedor
);


export default router;
