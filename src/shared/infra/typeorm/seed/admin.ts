import {v4 as uuidV4} from "uuid";
import {hash} from "bcrypt";
import {createConnectionTypeORM} from "..";

async function create() {
  const connection = await createConnectionTypeORM("localhost");

  const id = uuidV4();

  const password = await hash("123456", 10);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_licence)
      values('${id}', 'admin', 'admin@segundaAPI.com.br', '${password}', true, 'now()', '123456789')
    `
  );
}

create().then(() => console.log("Admin created"));
