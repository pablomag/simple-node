import express from "express";

const app = express();

const main = async (app: express.Application) => {
    const hbs = require("express-handlebars");

    app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "layout" }));

    const production = process.env.NODE_ENV === "production";
    const hostname = production ? "0.0.0.0" : "localhost";
    const port: any = process.env.PORT || 8080;

    app.get("/", (_: express.Request, res: express.Response) => {
        res.render("index.hbs", {
            uri: process.env.APP_URI || `${hostname}:${port}`,
            name: process.env.APP_NAME || `Simple Node App :: Dev`,
            message: process.env.APP_MESSAGE || `Hello from Docker Kubernetes`,
        });
    });

    app.use("/", express.static("static"));

    app.listen(port, hostname, () => {
        console.log(`App running on ${hostname}:${port}`);
    });
};

main(app).catch((error) => {
    console.error("App error", error);
});
