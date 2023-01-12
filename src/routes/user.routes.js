import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

router.post( "/crearusuario",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  usersCtrl.createUser
);

router.post( "/eliminarusuario",
  [
    authJwt.verToken,
    //authJwt.isAdmin,
  ],
  usersCtrl.borrarUser
);

/*

router.get(  "/listarusuarios",
  [
    authJwt.verToken,
    authJwt.isAdmin,
  ],
  usersCtrl.getUsers
);
*/
router.post(  "/getuserid",
[
  authJwt.verToken,
],
  usersCtrl.getUserid
);

router.post(  "/edituser",
[
  authJwt.verToken,
],
  usersCtrl.editUser
);


router.get(  "/usuario",
  [
    authJwt.verToken,
  ],
  usersCtrl.getUser
);

router.get(  "/",
  [
    authJwt.verToken,
  ],
  usersCtrl.getUsers
);

router.get(  "/getroles",
  [
    authJwt.verToken,
  ],
  usersCtrl.getRoles
);

router.get(  "/getconfiguracion",
  [
    authJwt.verToken,
  ],
  usersCtrl.getconfiguracion
);


router.post(  "/cambiarclave",
  [
    authJwt.verToken,
  ],
  usersCtrl.cambiarclave
);


router.post(  "/cambiarconfiguracion",
  [
    authJwt.verToken,
  ],
  usersCtrl.cambiarconfiguracion
);


router.get(  "/getdatosdashboard",
  [
    authJwt.verToken,
  ],
  usersCtrl.getdatosdashboard
);

export default router;
