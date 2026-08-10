import { v2 as cloudinary } from 'cloudinary';
import { envSchema } from './env';

cloudinary.config({
  cloud_name: envSchema.CLOUDINARY_CLOUD_NAME,
  api_key: envSchema.CLOUDINARY_API_KEY,
  api_secret: envSchema.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };