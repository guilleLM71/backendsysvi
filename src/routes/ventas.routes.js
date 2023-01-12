import { Router } from "express";
const router = Router();

import * as ventasCtrl from "../controllers/ventas.controller";
import { authJwt } from "../middlewares";


router.get(  "/",
  [
    authJwt.verToken,
  ],
  ventasCtrl.getventas
);

router.post(  "/detalletmp",
  [
    authJwt.verToken,
  ],
  ventasCtrl.detalletmp
);

router.post(  "/getdetalletmp",
  [
    authJwt.verToken,
  ],
  ventasCtrl.getdetalletmp
);

router.post(  "/deldetalletmp",
  [
    authJwt.verToken,
  ],
  ventasCtrl.deldetalletmp
);

router.post(  "/procesarventa",
  [
    authJwt.verToken,
  ],
  ventasCtrl.procesarventa
);

router.post(  "/getfactura",
  [
    authJwt.verToken,
  ],
  ventasCtrl.getfactura
);


export default router;
