import cloudinary from "./cloudinary";

export async function uploadToCloudinary(file) {
  if (!file || typeof file.arrayBuffer !== "function") {
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "myhomeetal-admin",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error processing file for Cloudinary:", error);
    return null;
  }
}
