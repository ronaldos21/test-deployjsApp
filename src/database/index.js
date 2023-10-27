import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const urlConnection =
    "mongodb+srv://ronaldoismael15:12345@rsdb1.vq2ny0s.mongodb.net/";

  mongoose
    .connect(urlConnection, configOptions)
    .then(() => console.log("E-commerce DB connected sucessfully!"))
    .catch((err) =>
      console.log(`Getting error from DB connection ${err.message}`)
    );
};

export default connectToDB;
