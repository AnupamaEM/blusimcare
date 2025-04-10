
const express = require("express");
const app = express();
const bedRoutes = require("./routes/bedroutes");

app.use(express.json());

app.use("/api", bedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
