const PORT = 3001;
const app = require("./app");
require("./utils/db");

const server = app.listen(PORT, () => {
  console.log(`todo express started on http://localhost:${PORT}`);
});
