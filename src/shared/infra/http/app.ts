import "reflect-metadata";
import "express-async-errors";
import "@shared/container";

import express, {Request, Response, NextFunction} from "express";
import swaggerUI from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";

import {router} from "@shared/infra/http/routes";
import {AppError} from "@shared/errors/AppError";
import {createConnectionTypeORM} from "../typeorm";

createConnectionTypeORM();

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export {app};
