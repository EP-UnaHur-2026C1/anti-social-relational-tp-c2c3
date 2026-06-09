### 1. Upload de imágenes al servidor
**Consigna:** Hace el upload de las imágenes que se asocian a un POST que lo guarden en una carpeta de imágenes dentro del servidor web.

Para gestionar la subida de imágenes y almacenarlas en una carpeta local del servidor web:

* **Middleware de subida:** Implementar la librería **Multer** en Express para procesar archivos `multipart/form-data`.
(Revisar documentacion de Multer en: https://expressjs.com/es/resources/middleware/multer/)
* **Configuración de almacenamiento:** Utilizar `DiskStorage` de Multer para definir la carpeta de destino (`/uploads`) y gestionar el renombrado de archivos para evitar colisiones.
* **Persistencia:** Almacenar en la base de datos (tabla `Post_Images`) únicamente la **ruta del archivo** (URL), no la imagen binaria.
* **Acceso público:** Configurar `express.static` para exponer la carpeta `/uploads` y permitir que las imágenes sean accedidas mediante una URL.

---

### 2. Modelado de seguidores (Followers)
**Consigna:** ¿Cómo modelarías que un usuario pueda "seguir" a otros usuarios, y a su vez ser seguido por muchos? Followers
Para implementar una relación donde un usuario puede seguir a muchos y ser seguido por muchos, se debe crear una relación **Muchos a Muchos**:

* **Tabla intermedia (`Follows`):** Crear una tabla que contenga:
    * `follower_id`: ID del usuario que sigue.
    * `following_id`: ID del usuario seguido.
Y deberia definirse en Sequelize.

---

### 3. Estrategias de optimización (Caché)
**Consgna**: Como la información de los post no varía muy seguido ¿Qué estrategias podrían utilizar para que la información no sea constantemente consultada desde la base de datos?

* **Caché en Servidor:** Implementar **Redis** para almacenar el resultado de las consultas `GET /api/posts`. Al solicitar los posts, se consulta primero a Redis; si no existe el dato, se consulta la DB y se almacena el resultado por un tiempo definido (TTL).