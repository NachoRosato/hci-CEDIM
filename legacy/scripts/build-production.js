const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Iniciando build de producción con cache busting...");

try {
  // 1. Limpiar build anterior
  console.log("🧹 Limpiando build anterior...");
  const buildPath = path.join(__dirname, "../build");
  if (fs.existsSync(buildPath)) {
    fs.rmSync(buildPath, { recursive: true, force: true });
  }

  // 2. Ejecutar build de React
  console.log("📦 Ejecutando build de React...");
  execSync("react-scripts build", { stdio: "inherit" });

  // 3. Aplicar cache busting agresivo
  console.log("🔄 Aplicando cache busting agresivo...");
  require("./force-update.js");

  // 4. Agregar cache busting al index.html
  console.log("📝 Agregando cache busting al index.html...");
  const indexPath = path.join(buildPath, "index.html");

  // Generar variables únicas para todo el proceso
  const timestamp = Date.now();
  const buildDate = new Date().toISOString().replace(/[:.]/g, "-");
  const version = process.env.npm_package_version || "1.0.0";

  if (fs.existsSync(indexPath)) {
    let htmlContent = fs.readFileSync(indexPath, "utf8");

    // Crear comentario y meta tags únicos
    const cacheBustingContent = [
      `<!-- Build: ${buildDate}-${timestamp} -->`,
      `<meta name="build-timestamp" content="${timestamp}" />`,
      `<meta name="build-version" content="${version}-${timestamp}" />`,
      `<script>window.BUILD_INFO={timestamp:${timestamp},version:"${version}",buildDate:"${buildDate}"};</script>`,
    ].join("\n  ");

    // Buscar la posición después del <head>
    const headStart = htmlContent.indexOf("<head>");
    if (headStart !== -1) {
      const insertPosition = headStart + 6; // después de "<head>"

      htmlContent =
        htmlContent.slice(0, insertPosition) +
        "\n  " +
        cacheBustingContent +
        htmlContent.slice(insertPosition);

      // Escribir el archivo modificado
      fs.writeFileSync(indexPath, htmlContent, "utf8");
      console.log(`✅ Cache busting agregado al index.html`);
      console.log(`📅 Timestamp: ${timestamp}`);
      console.log(`📦 Versión: ${version}`);
    }
  }

  console.log("✅ Build de producción completado exitosamente!");
  console.log(`📅 Timestamp: ${timestamp}`);
  console.log(`📦 Versión: ${version}`);
  console.log(`🌐 Los usuarios verán automáticamente la nueva versión`);
  console.log(`📝 Información del build disponible en window.BUILD_INFO`);
} catch (error) {
  console.error("❌ Error durante el build:", error);
  process.exit(1);
}
