#!/usr/bin/env bash
set -e

# ─────────────────────────────────────────────
# Script de despliegue de Strapi en Railway
# Uso: ./scripts/deploy-railway.sh
# Requiere: railway login previo
# ─────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$BACKEND_DIR/.env.railway"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[..] $1${NC}"; }
fail() { echo -e "${RED}[ERROR] $1${NC}"; exit 1; }

# ── 1. Verificar dependencias ──────────────────
warn "Verificando dependencias..."
command -v railway >/dev/null 2>&1 || fail "Railway CLI no instalado. Ejecuta: npm install -g @railway/cli"
command -v node    >/dev/null 2>&1 || fail "Node.js no encontrado"
[ -f "$ENV_FILE" ]               || fail "Archivo $ENV_FILE no encontrado"
log "Dependencias OK"

# ── 2. Verificar login ─────────────────────────
warn "Verificando sesión en Railway..."
railway whoami >/dev/null 2>&1 || fail "No estás logueado. Ejecuta: railway login"
USER=$(railway whoami 2>/dev/null)
log "Logueado como: $USER"

# ── 3. Inicializar proyecto Railway ───────────
warn "Inicializando proyecto Railway..."
cd "$BACKEND_DIR"

if railway status >/dev/null 2>&1; then
  log "Proyecto Railway ya vinculado"
else
  warn "Creando nuevo proyecto... (se abrirá selector interactivo)"
  railway init
fi

# ── 4. Agregar PostgreSQL ──────────────────────
warn "Verificando PostgreSQL..."
if railway variables 2>/dev/null | grep -q "DATABASE_URL"; then
  log "PostgreSQL ya configurado"
else
  warn "Agregando plugin PostgreSQL..."
  railway add --plugin postgresql
  log "PostgreSQL agregado"
fi

# ── 5. Cargar variables de entorno ─────────────
warn "Configurando variables de entorno..."
while IFS= read -r line || [ -n "$line" ]; do
  # Saltar comentarios y líneas vacías
  [[ "$line" =~ ^#.*$ ]] && continue
  [[ -z "$line" ]]       && continue

  KEY="${line%%=*}"
  VALUE="${line#*=}"
  # Quitar comillas si las tiene
  VALUE="${VALUE%\"}"
  VALUE="${VALUE#\"}"

  railway variables set "$KEY=$VALUE"
  log "  $KEY"
done < "$ENV_FILE"

# ── 6. Deploy ──────────────────────────────────
warn "Iniciando deploy..."
railway up --detach
log "Deploy enviado"

# ── 7. Obtener URL ─────────────────────────────
warn "Obteniendo URL pública..."
sleep 3
DOMAIN=$(railway domain 2>/dev/null || echo "")

if [ -n "$DOMAIN" ]; then
  PUBLIC_URL="https://$DOMAIN"
  log "URL: $PUBLIC_URL"
  railway variables set "PUBLIC_URL=$PUBLIC_URL"
  log "PUBLIC_URL configurada"
else
  warn "No se pudo obtener la URL automáticamente."
  echo ""
  echo "  Cuando el deploy termine, ejecuta:"
  echo "  railway domain"
  echo "  railway variables set PUBLIC_URL=\"https://TU-DOMINIO.railway.app\""
fi

# ── 8. Resumen ─────────────────────────────────
echo ""
echo "═══════════════════════════════════════════"
echo "  Deploy completado"
echo "═══════════════════════════════════════════"
[ -n "$DOMAIN" ] && echo "  Admin: https://$DOMAIN/admin"
echo ""
echo "  Próximo paso — actualizar Vercel:"
echo "  NEXT_PUBLIC_STRAPI_URL=https://$DOMAIN"
echo "═══════════════════════════════════════════"
