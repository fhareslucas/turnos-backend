# Documentación de la API - Sistema de Turnos

Esta API permite gestionar un sistema de turnos, incluyendo usuarios, mesas, tipos de servicio y el flujo completo de atención de turnos.

## 🌐 Información General

- **Base URL**: `http://localhost:5000/api`
- **Formato de respuesta**: JSON
- **Autenticación**: Bearer Token (JWT)

### Respuestas Comunes

**Éxito (200/201):**

```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
```

**Error (400/401/403/404/500):**

```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [ ... ] 
}
```

---

## 🔐 Autenticación

### Registro de Usuario

Crea un nuevo usuario en el sistema.

- **URL**: `/auth/register`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "nombre": "Juan Perez", 
    "email": "juan@test.com", 
    "password": "password123", 
    "rol": "operador" 
  }
  ```

### Login

Inicia sesión y obtiene un token JWT.

- **URL**: `/auth/login`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "email": "juan@test.com", 
    "password": "password123" 
  }
  ```
- **Respuesta**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": { ... }
  }
  ```

### Perfil de Usuario

Obtiene la información del usuario autenticado.

- **URL**: `/auth/profile`
- **Método**: `GET`
- **Headers**: `Authorization: Bearer <token>`

---

## 🎫 Turnos

### Crear Turno

Genera un nuevo turno para un cliente.

- **URL**: `/turnos`
- **Método**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "tipo_servicio_id": "uuid", 
    "nombre_cliente": "Maria", 
    "prioridad": 0, 
    "observaciones": "Nota..." 
  }
  ```

### Listar Turnos

Obtiene una lista paginada de turnos.

- **URL**: `/turnos`
- **Método**: `GET`
- **Query Params**:
  - `page`: Número de página (default 1)
  - `limit`: Resultados por página (default 50)
  - `estado`: Filtrar por estado (`en_espera`, `en_atencion`, `completado`, `cancelado`)
  - `tipo_servicio_id`: Filtrar por servicio
  - `fecha`: Filtrar por fecha (YYYY-MM-DD)

### Obtener Estadísticas

Obtiene el conteo de turnos del día actual.

- **URL**: `/turnos/estadisticas`
- **Método**: `GET`

### Obtener Turno por ID

- **URL**: `/turnos/:id`
- **Método**: `GET`

### Llamar Turno

Asigna un turno a una mesa y cambia su estado a `en_atencion`.

- **URL**: `/turnos/:id/llamar`
- **Método**: `PUT`
- **Body**:
  ```json
  {
    "mesa_id": "uuid" 
  }
  ```

### Completar Turno

Finaliza la atención de un turno.

- **URL**: `/turnos/:id/completar`
- **Método**: `PUT`
- **Body**:
  ```json
  {
    "observaciones": "Cliente satisfecho"   
  }
  ```

### Cancelar Turno

Cancela un turno.

- **URL**: `/turnos/:id/cancelar`
- **Método**: `PUT`
- **Body**:
  ```json
  {
    "observaciones": "Cliente no se presentó" 
  }
  ```

---

## 🪑 Mesas

### Listar Mesas

- **URL**: `/mesas`
- **Método**: `GET`
- **Query Params**:
  - `activo`: `true` | `false`
  - `estado`: `disponible` | `ocupada` | `inactiva`

### Crear Mesa (Admin)

- **URL**: `/mesas`
- **Método**: `POST`
- **Headers**: `Authorization: Bearer <token>` (Requiere rol admin)
- **Body**:
  ```json
  {
    "numero": 1, 
    "nombre": "Mesa 1", 
    "estado": "disponible", 
    "activo": true 
  }
  ```

### Actualizar Mesa (Admin)

- **URL**: `/mesas/:id`
- **Método**: `PUT`
- **Body**: Campos opcionales del body de creación.

### Eliminar Mesa (Admin)

Realiza un borrado lógico (desactiva la mesa).

- **URL**: `/mesas/:id`
- **Método**: `DELETE`

---

## 🏷️ Servicios (Tipos de Servicio)

### Listar Servicios

- **URL**: `/servicios`
- **Método**: `GET`
- **Query Params**:
  - `activo`: `true` | `false`

### Crear Servicio (Admin)

- **URL**: `/servicios`
- **Método**: `POST`
- **Headers**: `Authorization: Bearer <token>` (Requiere rol admin)
- **Body**:
  ```json
  {
    "nombre": "Caja", 
    "codigo": "CAJA", 
    "descripcion": "Pagos...", 
    "color": "#54243C", 
    "tiempo_estimado": 15, 
    "activo": true 
  }
  ```

### Actualizar Servicio (Admin)

- **URL**: `/servicios/:id`
- **Método**: `PUT`
- **Body**: Campos opcionales del body de creación.

### Eliminar Servicio (Admin)

Realiza un borrado lógico.

- **URL**: `/servicios/:id`
- **Método**: `DELETE`
