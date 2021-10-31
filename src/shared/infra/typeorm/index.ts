import {Connection, createConnection, getConnectionOptions} from "typeorm";

export const createConnectionTypeORM = async (
  host = "database"
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "segunda-api_test"
          : defaultOptions.database,
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
    })
  );
};
