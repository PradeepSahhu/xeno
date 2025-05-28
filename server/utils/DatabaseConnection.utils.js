import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DatabaseConnection = async () => {
  console.log(process.env.MONGOOSE_DATABASE_CONNECTION);
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_DATABASE_CONNECTION}`
    );
    // console.log(`Database Connected!!! ${ConnectionInstance.connection.host}`);
    // console.table([ConnectionInstance.connection.host]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// DatabaseConnection();
export default DatabaseConnection;
