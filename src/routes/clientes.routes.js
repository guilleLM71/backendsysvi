import { Router } from "express";
const router = Router();

import * as clientesCtrl from "../controllers/clientes.controller";
import { authJwt } from "../middlewares";


router.get(  "/",
  [
    authJwt.verToken,
  ],
  clientesCtrl.getclientes
);

router.post( "/crearcliente",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  clientesCtrl.createcliente
);

router.post( "/eliminarcliente",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  clientesCtrl.borrarcliente
);

router.post(  "/getclienteid",
[
  authJwt.verToken,
],
clientesCtrl.getclienteid
);

router.post(  "/getclientedni",
[
  authJwt.verToken,
],
clientesCtrl.getclientedni
);

router.post(  "/editcliente",
[
  authJwt.verToken,
],
clientesCtrl.editcliente
);


export default router;
