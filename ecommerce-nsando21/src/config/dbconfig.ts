import { registerAs } from '@nestjs/config';
import { config as dotenvconfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Cargar variables de entorno desde la Raiz, SOLO PUEDE ESTAR EN LA RAIZ si no no lo carga
dotenvconfig({ path: '.env.development' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'ecommerce_DB',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo en desarrollo
  autoLoadEntities: true,
  logging: true,
  dropSchema: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
