import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dw5u8cfu2",
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // @ts-ignore
    folder: "shelvesStore",
  },
});

export const upload = multer({
  storage: storage,
});

export const uploadFile = async (request: Request, response: Response) => {
  try {
    // @ts-ignore
    if (!request.file.path) {
      response.status(400).send({
        success: false,
        message: "No file to upload",
      });
    }

    // @ts-ignore
    const result = await cloudinary.uploader.upload(request.file.path);
    const { public_id, secure_url } = result;
    response.status(200).send({
      success: true,
      data: {
        public_id,
        secure_url,
      },
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      data: error,
    });
  }
};
