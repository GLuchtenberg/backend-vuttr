import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { routes } from "./routes/routes";

createConnection()
  .then(async connection => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    // await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/", routes);
    app.listen(4000, () => {
      console.log("Server started at http://localhost:4000");
    });
  })
  .catch(error => console.log(error));
