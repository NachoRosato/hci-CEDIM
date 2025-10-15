const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Función para generar hash único
function generateUniqueHash() {
  return crypto.randomBytes(8).toString("hex");
}

// Función para forzar actualización completa
function forceUpdate() {
  const buildPath = path.join(__dirname, "../build");
  const indexPath = path.join(buildPath, "index.html");

  if (!fs.existsSync(indexPath)) {
    console.log("❌ No se encontró index.html en build/");
    return;
  }

  try {
    // Leer el index.html
    let htmlContent = fs.readFileSync(indexPath, "utf8");

    // Generar timestamp y hash únicos
    const timestamp = Date.now();
    const uniqueHash = generateUniqueHash();
    const versionHash = generateUniqueHash();

    console.log(`🔄 Forzando actualización con:`);
    console.log(`📅 Timestamp: ${timestamp}`);
    console.log(`🔐 Hash único: ${uniqueHash}`);
    console.log(`📦 Versión: ${versionHash}`);

    // Agregar meta tags más agresivos para cache busting
    const aggressiveCacheBust = [
      `<meta name="cache-bust" content="${timestamp}"/>`,
      `<meta name="cache-hash" content="${uniqueHash}"/>`,
      `<meta name="version" content="${versionHash}"/>`,
      `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0"/>`,
      `<meta http-equiv="Pragma" content="no-cache"/>`,
      `<meta http-equiv="Expires" content="-1"/>`,
      `<meta http-equiv="Last-Modified" content="${new Date().toUTCString()}"/>`,
    ].join("");

    // Buscar la posición después del primer meta tag dentro del head
    const headStart = htmlContent.indexOf("<head>");
    if (headStart === -1) {
      console.log("❌ No se encontró el tag <head>");
      return;
    }

    // Buscar el primer meta tag después del head
    const firstMetaAfterHead = htmlContent.indexOf("<meta", headStart);
    if (firstMetaAfterHead === -1) {
      console.log("❌ No se encontró ningún meta tag después del head");
      return;
    }

    // Insertar después del primer meta tag
    const insertPosition = htmlContent.indexOf(">", firstMetaAfterHead) + 1;

    htmlContent =
      htmlContent.slice(0, insertPosition) +
      aggressiveCacheBust +
      htmlContent.slice(insertPosition);

    // Modificar referencias a archivos CSS y JS con cache busting más agresivo
    htmlContent = htmlContent.replace(
      /(href|src)="([^"]*\.(css|js))"/g,
      (match, attr, filePath) => {
        const filePathWithoutSlash = filePath.startsWith("/")
          ? filePath.substring(1)
          : filePath;
        const fullPath = path.join(buildPath, filePathWithoutSlash);

        if (fs.existsSync(fullPath)) {
          const fileContent = fs.readFileSync(fullPath, "utf8");
          const fileHash = crypto
            .createHash("md5")
            .update(fileContent + timestamp + uniqueHash)
            .digest("hex")
            .substring(0, 8);
          return `${attr}="${filePath}?v=${timestamp}&h=${uniqueHash}&f=${fileHash}&t=${Date.now()}"`;
        }
        return `${attr}="${filePath}?v=${timestamp}&h=${uniqueHash}&t=${Date.now()}"`;
      }
    );

    // Agregar script para forzar recarga y limpiar caches
    const forceReloadScript = `
    <script>
      // Forzar limpieza de caches al cargar
      if ('caches' in window) {
        caches.keys().then(function(names) {
          for (let name of names) {
            caches.delete(name);
          }
        });
      }
      
      // Limpiar localStorage y sessionStorage si es necesario
      if (localStorage.getItem('forceUpdate') !== '${uniqueHash}') {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('forceUpdate', '${uniqueHash}');
        localStorage.setItem('lastUpdate', '${timestamp}');
      }
      
      // Forzar recarga si es una versión antigua
      if (localStorage.getItem('lastUpdate') !== '${timestamp}') {
        localStorage.setItem('lastUpdate', '${timestamp}');
        window.location.reload(true);
      }
      
      // Verificar actualizaciones cada minuto
      setInterval(() => {
        fetch('/index.html?v=${timestamp}&h=${uniqueHash}&t=${Date.now()}', {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }).then(response => {
          if (response.status === 200) {
            const newHash = response.headers.get('x-cache-hash');
            if (newHash && newHash !== '${uniqueHash}') {
              console.log('Nueva versión detectada, recargando...');
              window.location.reload(true);
            }
          }
        }).catch(() => {
          // Ignorar errores de red
        });
      }, 60000);
    </script>`;

    // Insertar antes del cierre del head
    const headEnd = htmlContent.indexOf("</head>");
    if (headEnd !== -1) {
      htmlContent =
        htmlContent.slice(0, headEnd) +
        forceReloadScript +
        htmlContent.slice(headEnd);
    }

    // Escribir el archivo modificado
    fs.writeFileSync(indexPath, htmlContent, "utf8");

    // Crear archivo .htaccess más agresivo
    createAggressiveHtaccess(buildPath, timestamp, uniqueHash);

    // Crear archivo web.config para IIS
    createWebConfig(buildPath, timestamp, uniqueHash);

    console.log(`✅ Actualización forzada completada:`);
    console.log(`📁 Archivo modificado: ${indexPath}`);
    console.log(`🔄 Cache busting agresivo aplicado`);
    console.log(`🧹 Limpieza automática de caches configurada`);
    console.log(`⏰ Verificación de actualizaciones cada minuto`);
  } catch (error) {
    console.error("❌ Error al forzar actualización:", error);
  }
}

// Función para crear .htaccess más agresivo
function createAggressiveHtaccess(buildPath, timestamp, uniqueHash) {
  const htaccessContent = `# Cache Busting Agresivo
RewriteEngine On

# Forzar no-cache para todos los archivos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 0 seconds"
    ExpiresByType application/javascript "access plus 0 seconds"
    ExpiresByType application/json "access plus 0 seconds"
    ExpiresByType image/png "access plus 0 seconds"
    ExpiresByType image/jpg "access plus 0 seconds"
    ExpiresByType image/jpeg "access plus 0 seconds"
    ExpiresByType image/gif "access plus 0 seconds"
    ExpiresByType image/svg+xml "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
    # Headers para todos los archivos
    Header always set Cache-Control "no-cache, no-store, must-revalidate, max-age=0"
    Header always set Pragma "no-cache"
    Header always set Expires "-1"
    Header always set Last-Modified "${new Date().toUTCString()}"
    
    # Headers específicos para archivos críticos
    <FilesMatch "\\.(html|css|js|json)$">
        Header always set Cache-Control "no-cache, no-store, must-revalidate, max-age=0"
        Header always set Pragma "no-cache"
        Header always set Expires "-1"
        Header always set X-Cache-Hash "${uniqueHash}"
        Header always set X-Timestamp "${timestamp}"
    </FilesMatch>
</IfModule>

# Forzar recarga para dispositivos móviles
<IfModule mod_rewrite.c>
    RewriteCond %{HTTP_USER_AGENT} (iPhone|iPad|Android|Mobile) [NC]
    RewriteRule ^(.*)$ $1?v=${timestamp}&h=${uniqueHash}&t=${Date.now()} [L,QSA]
</IfModule>

# Prevenir cache del navegador
<IfModule mod_mime.c>
    AddType application/javascript .js
    AddType text/css .css
</IfModule>`;

  const htaccessPath = path.join(buildPath, ".htaccess");
  fs.writeFileSync(htaccessPath, htaccessContent, "utf8");
  console.log(`📄 Archivo .htaccess agresivo creado: ${htaccessPath}`);
}

// Función para crear web.config para IIS
function createWebConfig(buildPath, timestamp, uniqueHash) {
  const webConfigContent = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <staticContent>
      <clientCache cacheControlMode="DisableCache" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <add name="Cache-Control" value="no-cache, no-store, must-revalidate, max-age=0" />
        <add name="Pragma" value="no-cache" />
        <add name="Expires" value="-1" />
        <add name="X-Cache-Hash" value="${uniqueHash}" />
        <add name="X-Timestamp" value="${timestamp}" />
      </customHeaders>
    </httpProtocol>
    <rewrite>
      <rules>
        <rule name="Cache Busting" stopProcessing="true">
          <match url="^(.*)$" />
          <conditions>
            <add input="{HTTP_USER_AGENT}" pattern="(iPhone|iPad|Android|Mobile)" />
          </conditions>
          <action type="Rewrite" url="{R:1}?v=${timestamp}&amp;h=${uniqueHash}&amp;t=${Date.now()}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>`;

  const webConfigPath = path.join(buildPath, "web.config");
  fs.writeFileSync(webConfigPath, webConfigContent, "utf8");
  console.log(`📄 Archivo web.config creado: ${webConfigPath}`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  forceUpdate();
}

module.exports = { forceUpdate };
