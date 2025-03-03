"use server";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { getBase64ImageUrl } from "@/lib/generateBlurPlaceholder";
import { prisma } from "@/lib/db";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (imageFile: File) => {
  if (!imageFile) {
    return { error: "No file uploaded" };
  }

  try {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Upload failed"));
          }
        );
        uploadStream.end(buffer);
      }
    );

    const { secure_url, width, height, public_id } = uploadResult;

    const blurDataUrl = await getBase64ImageUrl(public_id);

    const image = await prisma.image.create({
      data: {
        imageUrl: secure_url,
        width,
        height,
        publicId: public_id,
        blurDataUrl,
      },
    });

    return { imageId: image.id };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return { error: "Error uploading image" };
  }
};

export async function deleteImage(id: string) {
  try {
    // Fetch the image from the database
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return { error: "Image not found" };
    }

    const publicId = image.publicId;

    if (!publicId) {
      return { error: "Invalid Cloudinary URL" };
    }

    // Delete the image from Cloudinary
    await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    // Delete the image from the database
    await prisma.image.delete({
      where: { id },
    });

    return { success: "Image deleted successfully" };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { error: "Failed to delete image" };
  }
}
