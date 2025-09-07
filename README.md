# N8N Project para Render

## Descripción
Este proyecto está diseñado para desplegar [n8n](https://n8n.io/) en la plataforma [Render](https://render.com/). Incluye una funcionalidad adicional para mantener la instancia activa mediante el envío de pings periódicos, evitando así que Render apague la máquina por inactividad.

## Características
- Despliegue de n8n en Render
- Sistema automático de pings cada 5 segundos para mantener la instancia activa
- Configuración sencilla a través de variables de entorno

## Requisitos
- Node.js
- npm

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/DylanQL/N8N_Project_RENDER.git
   cd N8N_PROJECT
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` basado en el ejemplo:
   ```bash
   cp .env.example .env
   ```

4. Edita el archivo `.env` y configura tu URL de ping:
   ```
   PING_URL=https://tu-app-url.onrender.com
   ```

## Uso
Para iniciar n8n junto con el servicio de ping automático:

```bash
npm start
```

Este comando:
1. Inicia el servidor n8n
2. Comienza a enviar pings a la URL configurada cada 5 segundos

Si solo quieres ejecutar n8n sin el servicio de ping:

```bash
npm run n8n
```

## Cómo funciona
- El script principal (`index.js`) inicia n8n como un proceso hijo
- Simultáneamente, configura un intervalo para enviar peticiones HTTP a la URL especificada en el archivo `.env`
- Estos pings periódicos mantienen la instancia de Render activa, evitando que entre en modo de suspensión por inactividad
- El manejo adecuado de señales garantiza que tanto n8n como el servicio de ping se detengan correctamente cuando la aplicación se cierra

## Despliegue en Render
1. Crea un nuevo servicio web en Render
2. Conecta tu repositorio de GitHub
3. Configura el servicio:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - Añade la variable de entorno `PING_URL` con la URL de tu aplicación en Render

## Contribuciones
Las contribuciones son bienvenidas. Por favor, envía un Pull Request o abre un Issue para discutir cambios propuestos.

## Licencia
ISC

## Autor
Angelo Dylan
