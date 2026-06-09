# Instrucciones de Prueba - API Anti-Social - C2C3

En este documento se detalla cómo utilizar la colección de Postman para validar el funcionamiento del core de la API.

## 1. Configuración Previa e Importación
* **Base URL:** Todas las peticiones están configuradas para apuntar a `http://localhost:3000/api`.
* **Importación de la Colección:**
    1. Abrir **Postman** o **Extension de Postman** en VSCode.
    2. Hacer click en el botón **Import**.
    3. Seleccionar el archivo `anti-social-ep-c2c3.postman_collection.json` que se encuentra en la carpeta `/postman` de este repositorio.
    4. Una vez importada se debe ver la carpeta `anti-social-ep-c2c3` con todos los endpoints listos para usar.

## 2. Estructura de la Colección
La colección está organizada por entidades para facilitar el flujo de pruebas:

### **1. Usuario**
* **Registrar Usuario (MDW):** Incluye casos de prueba para validaciones (`Request vacío`, `Nickname menor a 3 caracteres`, `Usuario existente`) y el flujo `OK`.
* **Lectura:** Permite listar todos los usuarios o buscar uno específico por `nickName`.

### **2. Posts**
* **Operaciones:** Validación de creación de post (`Falta descripción`, `Usuario no registrado`, `OK`).
* **Lectura:** Endpoint `GET /api/posts` para verificar la integridad de los datos y el filtrado de comentarios.

### **3. Imágenes**
* Permite gestionar la relación `Post-Imagen` mediante:
    * `POST /api/posts/:id/images`: Agregar una nueva imagen.
    * `DELETE /api/posts/:id/images/:imageId`: Eliminar una imagen existente.

### **4. Tags**
* `POST /api/posts/:id/tags`: Permite vincular etiqueta al post.

### **5. Comment**
* `POST /api/posts/:id/comments`: Permite agregar comentarios a un post, integrando la lógica de negocio requerida.

## 3. Tener en cuenta para quien lo pruebe:
* **Integridad:** Se ha verificado que al eliminar un post o una imagen, no queden datos huérfanos en la base de datos.
* **Validaciones:** Se recomienda probar primero los casos de error (MDW) para validar que los esquemas de Joi estén funcionando correctamente antes de ejecutar los flujos `OK`.

## 4. Consideraciones para levantar el proyecto:
1. Ejecutar `docker compose up -d.`
2. Ejecutar `npm install.`
3. Ejecutar `npm run dev.`