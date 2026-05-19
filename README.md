# 📱 Tech Store App

Aplicación web desarrollada con **React + TypeScript + Vite** para explorar un catálogo de móviles, consultar detalles de producto y gestionar un carrito de compra.

---

# Funcionalidades principales

* **Listado de productos** con búsqueda en tiempo real
* **Búsqueda por marca o modelo** con debounce para optimizar llamadas
* **Página de detalle** con especificaciones completas del producto
* **Selección de variantes** (color y almacenamiento)
* **Gestión de carrito** mediante Context API y con persistencia en localStorage
* **Caché local** para reducir llamadas a la API
* **Diseño responsive** 
* **Testing completo** con Vitest + Testing Library

---

# Stack

| Categoría | Tecnología |
|-----------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | React Router DOM |
| Estilos | TailwindCSS |
| Estado global | Context API |
| Testing | Vitest + Testing Library + userEvent |

---

# Estructura del proyecto

El proyecto está diseñado siguiendo principios de Clean Code y una arquitectura desacoplada orientada a mantenibilidad, escalabilidad y testabilidad. La estructura de carpetas refleja esta organización modular:

```bash
src/
├── adapters/          # Transformación de datos API -> modelos app
├── api/               # Llamadas HTTP
├── components/        # Componentes reutilizables/globales para todos los módulos
├── contexts/          # Estado global
├── hooks/             # Lógica reutilizable
├── layouts/           # Layouts generales
├── models/            # Clases y tipos
├── mocks/             # Datos de prueba
├── pages/             # Vistas principales
├── router/            # Configuración de rutas
├── services/          # Reglas de negocio
├── test/              # Factories + setup testing
└── utils/             # Utilidades
```

---

## Hooks personalizados

### `useProductsList`

Obtiene listado de todos los productos disponibles.

### `useProduct`

Obtiene los detalles de un producto concreto.

### `useCart`

Gestiona el estado del carrito global.

### `useDebounce`

Permite retrasar la ejecución de una función hasta que haya pasado un tiempo desde la última vez que se llamó, ideal para optimizar búsquedas.

---

# Testing

El proyecto incluye cobertura en:

## Unit tests

* adapters
* services
* utils
* hooks

## Component tests

* ProductActions
* ProductSelection
* ProductDetailPage
* ProductListPage

---

# Instalación

## 1. Clonar repositorio

```bash
git clone https://github.com/aleeeesf/react-products-app
cd mobile-store-app
```

## 2. Instalar dependencias

```bash
pnpm install
```

## 3. Ejecutar entorno desarrollo

```bash
pnpm run dev
```

## 4. Acceder en local

```bash
http://localhost:5173
```

## 5. Build producción

```bash
pnpm run build
```

# Ejecutar tests

```bash
pnpm run test
```

---

# Docker

## Build de la imagen

```bash
docker build -t react-products-app .
```

## Ejecutar contenedor

```bash
docker run -p 80:80 react-products-app
```

## Acceso local

```bash
http://localhost
```


