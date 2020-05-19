const PORT = 3001;
const app = require("./app");

const server = app.listen(PORT, () => {
  console.log(`todo express started on http://localhost:${PORT}`);
});
