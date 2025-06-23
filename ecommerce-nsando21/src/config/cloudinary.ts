import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

// Para trabajar en conjunto con Nest JS deberiamos de tratarlo como un provider
// Para ello debemos construir un custom provider

// Un custom provider es un objeto tal que: CUSTOM PROVIDER = {provide "CLOUDINARY", useFactory() => --> o useClass o useValue, etc..}
export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      // ESTA LLAVE DEBERIA DE SER PRIVADA
      api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
    });
  },
};
