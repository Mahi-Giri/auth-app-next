import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI!}/db`);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Mongoose connected successfully");
        });

        connection.on("error", (error) => {
            console.error("Error connecting to MongoDB:", error);
            process.exit();
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
