import {uploadConfig} from "@config/upload";
import {CreateCarController} from "@modules/cars/useCases/createCar/CreateCarController";
import {CreateCarSpecificationController} from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificicationController";
import {ListAvaliableCarsController} from "@modules/cars/useCases/listAvaliableCars/listAvaliableCarsController";
import {UploadCarImagesController} from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import {Router} from "express";
import multer from "multer";
import {ensureAdmin} from "../middlewares/ensureAdmin";
import {ensureAuthenticated} from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/avaliable", listAvaliableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImageController.handle
);

export {carsRoutes};
