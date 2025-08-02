import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { seedAdmin } from "./app/utils/seedAdmin";

const PORT = config.app.port
let server: ReturnType<typeof app.listen> | null = null;

// Handle uncaught synchronous exceptions
process.on("uncaughtException", (err) => {
    console.error("💥 Uncaught Exception:", err);
    process.exit(1);
});

// Main server startup
async function main() {
    try {
        await mongoose.connect(config.database.uri as string);
        console.log("✅ Database connected successfully");

        server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
        seedAdmin()
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

// Graceful shutdown
const shutdown = async () => {
    console.log("\n🛑 Shutting down gracefully...");

    try {
        if (server) {
            await new Promise<void>((resolve, reject) => {
                server!.close((err) => {
                    if (err) return reject(err);
                    console.log("🔒 Server closed");
                    resolve();
                });
            });
        }

        await mongoose.disconnect();
        console.log("📦 MongoDB disconnected");

        process.exit(0);
    } catch (err) {
        console.error("❗Error during shutdown", err);
        process.exit(1);
    }
};

// Unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("🔴 Unhandled Rejection:", reason);
    shutdown();
});

// Termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

main();


