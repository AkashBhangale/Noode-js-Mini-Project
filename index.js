const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const appConfig = require("./config/config");
require('dotenv').config();
//console.log(appConfig.dbURL);

mongoose.connect(appConfig.dbURL).then(() => {
    console.log(`connected to ${appConfig.database.dbName}`);
}).catch(() => {
    console.log("Not Connected");
})

app.use(express.json());
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
swaggerOption = require("./swagger");
const jsdoc = swaggerJsDoc(swaggerOption);

app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(jsdoc)
  );

const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");


app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);



//console.log(appConfig.dev.port)
app.listen(appConfig.dev.port, () => { console.log(`Server is started at ${appConfig.dev.host}:${appConfig.dev.port}`); })