require("dotenv").config();

const server = require("./src/server");
const db = require("./src/lib/db");
const PORT = process.env.PORT || 3030;

db.connect()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection Error: ", error);
  });
