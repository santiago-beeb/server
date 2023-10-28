import { app } from "./app";

const main = () => {
  app.listen(app.get("port"));
  console.log(`puerto ${app.get("port")}`);
};

main();
a