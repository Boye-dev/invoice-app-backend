import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("src/services/nodemailer/templates"),
    defaultLayout: "",
  },
  viewPath: path.resolve("src/services/nodemailer/templates"),
};

transporter.use("compile", hbs(handlebarOptions));

export default transporter;
