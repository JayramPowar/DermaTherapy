import { app } from "./app/app.js"
import { connectDB } from "./app/config/connect.js";
import { PORT } from "./app/schema/portSchema.js";

const startServer = async () => {
    await connectDB();
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
        console.log(`Visit at: http://localhost:${PORT}`);
    });
};

startServer();