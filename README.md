# 🛍️ Ecommerce API - NSando21

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.16.0-blue.svg)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/Swagger-11.2.0-green.svg)](https://swagger.io/)

API RESTful desarrollada con NestJS para un sistema de ecommerce completo. Esta API proporciona funcionalidades para gestión de productos, usuarios, órdenes, categorías y autenticación.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Endpoints](#-endpoints)
- [Autenticación](#-autenticación)
- [Base de Datos](#-base-de-datos)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- 🔐 **Autenticación JWT** con roles y permisos
- 📦 **Gestión de Productos** con imágenes (Cloudinary)
- 👥 **Gestión de Usuarios** con perfiles
- 🛒 **Sistema de Órdenes** completo
- 📂 **Categorías de Productos**
- 📝 **Documentación API** con Swagger
- 🗄️ **Base de datos PostgreSQL** con TypeORM
- 🔒 **Validación de datos** con class-validator
- 🧪 **Testing** con Jest
- 📁 **Subida de archivos** con Multer

## 🛠️ Tecnologías Utilizadas

- **Backend Framework**: NestJS 11.0.1
- **Lenguaje**: TypeScript 5.7.3
- **Base de Datos**: PostgreSQL 8.16.0
- **ORM**: TypeORM 0.3.24
- **Autenticación**: JWT (@nestjs/jwt)
- **Validación**: class-validator, class-transformer
- **Documentación**: Swagger/OpenAPI
- **Almacenamiento**: Cloudinary
- **Testing**: Jest
- **Linting**: ESLint + Prettier

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- PostgreSQL
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/ecommerce-nsando21.git
cd ecommerce-nsando21
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Configurar la base de datos**
```bash
# Crear la base de datos en PostgreSQL
createdb ecommerce_db

# Ejecutar migraciones
npm run migration:run
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=ecommerce_db

# JWT
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRES_IN=24h

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Puerto de la aplicación
PORT=3000
```

## 🏃‍♂️ Uso

### Desarrollo

```bash
# Modo desarrollo con hot reload
npm run start:dev

# Modo debug
npm run start:debug
```

### Producción

```bash
# Compilar el proyecto
npm run build

# Ejecutar en producción
npm run start:prod
```

### Otros comandos útiles

```bash
# Formatear código
npm run format

# Linting
npm run lint

# Testing
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## 📡 Endpoints

La API está documentada con Swagger y disponible en: `http://localhost:3000/api`

### Módulos principales:

- **Auth** (`/auth`) - Autenticación y autorización
- **Users** (`/users`) - Gestión de usuarios
- **Products** (`/products`) - Gestión de productos
- **Categories** (`/categories`) - Gestión de categorías
- **Orders** (`/orders`) - Gestión de órdenes
- **File Upload** (`/upload`) - Subida de archivos

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación.

### Endpoints de Autenticación:

- `POST /auth/register` - Registro de usuarios
- `POST /auth/login` - Inicio de sesión
- `GET /auth/profile` - Obtener perfil del usuario (requiere autenticación)

### Roles Disponibles:

- `USER` - Usuario básico
- `ADMIN` - Administrador del sistema

## 🗄️ Base de Datos

### Migraciones

```bash
# Generar una nueva migración
npm run migration:generate -- src/migrations/NombreMigracion

# Ejecutar migraciones pendientes
npm run migration:run

# Revertir última migración
npm run migration:revert

# Ver migraciones ejecutadas
npm run migration:show
```

### Entidades Principales:

- **User** - Usuarios del sistema
- **Product** - Productos del catálogo
- **Category** - Categorías de productos
- **Order** - Órdenes de compra
- **OrderItem** - Items de las órdenes

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:cov

# Tests end-to-end
npm run test:e2e
```

## 🚀 Despliegue

### Opción 1: Despliegue Local

```bash
# Compilar para producción
npm run build

# Ejecutar
npm run start:prod
```

### Opción 2: Docker (recomendado)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Opción 3: Plataformas Cloud

- **Heroku**: Configurar variables de entorno y deploy
- **Railway**: Conectar repositorio y configurar DB
- **Vercel**: Configurar para Node.js
- **AWS**: Usar Elastic Beanstalk o ECS

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usar TypeScript strict mode
- Seguir las convenciones de NestJS
- Escribir tests para nuevas funcionalidades
- Documentar endpoints con Swagger
- Usar ESLint y Prettier

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**NSando21**

- GitHub: [@NSando21](https://github.com/NSando21)
- LinkedIn: https://www.linkedin.com/in/nicolas-sandoval-806703344/?locale=en_US
- Email: ncst321@gmail.com

## DOCUMENTACION

- [NestJS](https://nestjs.com/) - Framework de backend
- [TypeORM](https://typeorm.io/) - ORM para TypeScript
- [Swagger](https://swagger.io/) - Documentación de API
- [Cloudinary](https://cloudinary.com/) - Almacenamiento de imágenes

---



⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella! 
