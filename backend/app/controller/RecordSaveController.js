import ImageKit from "imagekit";
import { Record } from "../db/models/recordModel.js";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImageToImageKit(base64Image, fileName = "image.png") {
    try {
        const uploadResponse = await imagekit.upload({
            file: base64Image,   // Can be base64 string or file URL
            fileName: fileName,
            folder: "/uploads",  // Optional: specify a folder
        });

        console.log("✅ Uploaded image:", uploadResponse.url);
        return uploadResponse.url; // Return public URL
    } catch (error) {
        console.error("Image upload failed:", error.message);
        throw new Error("Failed to upload image to ImageKit");
    }
}

export const RecordSaveController = async (req, res) => {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ error: "Request body is empty" });
        }

        // 🕒 Generate unique filename
        const now = new Date();
        const formattedDate = now.toISOString().replace(/[:.]/g, "-"); // e.g. 2025-10-19T15-42-30-000Z
        const extension = "png"; // Get file extension (jpg, png, etc.)
        const fileName = `image_${formattedDate}.${extension}`;

        const imageUrl = await uploadImageToImageKit(body.image, fileName);

        body.image = imageUrl;

        const record = await Record.create(body);

        res.status(201).json({
            message: "Successfully saved record",
            record, // optional: include saved record for frontend confirmation
        });

    } catch (error) {
        console.error("Error saving record:", error.message);
        res.status(500).json({
            error: "Failed to save record",
            details: error.message,
        });
    }
}