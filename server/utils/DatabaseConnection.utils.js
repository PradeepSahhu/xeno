import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DatabaseConnection = async (databaseString) => {
  console.log(
    "The database string is : " + process.env.MONGOOSE_DATABASE_CONNECTION
  );
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_DATABASE_CONNECTION || databaseString}`
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
