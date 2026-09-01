#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════
# Who-Am-I Site Updater
# Facilita fazer updates no site sem precisar saber Next.js/React/TS
# Uso: ./update.sh [comando]
# ═══════════════════════════════════════════════════════════

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
 cd "$SCRIPT_DIR"

help() {
    echo -e "${CYAN}whoami // Site Updater${NC}"
    echo ""
    echo -e "${YELLOW}Comandos:${NC}"
    echo "  ./update.sh              Build + deploy"
    echo "  ./update.sh build        Apenas build (gera /out)"
    echo "  ./update.sh deploy       Apenas deploy (push pro GitHub)"
    echo "  ./update.sh dev          Inicia o servidor de desenvolvimento"
    echo "  ./update.sh status       Mostra status do repo"
    echo "  ./update.sh logs         Mostra últimos commits"
    echo "  ./update.sh add-timeline Adiciona nova entrada na timeline"
    echo "  ./update.sh add-project  Adiciona novo projeto"
    echo "  ./update.sh add-rice     Adiciona novo rice/screenshot"
    echo "  ./update.sh help         Mostra esta ajuda"
    echo ""
    echo -e "${YELLOW}Exemplos rápidos:${NC}"
    echo "  ./update.sh                    # Build e deploy completo"
    echo "  ./update.sh dev                # Desenvolvimento local em localhost:3000"
    echo "  ./update.sh add-timeline       # Guiado: adiciona evento na timeline"
    echo ""
    echo -e "${YELLOW}Arquivos de conteúdo:${NC}"
    echo "  src/content/timeline.ts    # Linha do tempo"
    echo "  src/content/projects.ts    # Projetos"
    echo "  src/content/stack.ts       # Stack de ferramentas"
    echo "  src/content/lab.ts          # Experimentos do lab"
    echo "  src/content/dictionary.ts  # Textos/i18n (pt + en)"
    echo "  public/rices/               # Pasta para screenshots de rice"
    echo ""
}

check_deps() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}[ERRO] Node.js não encontrado. Instale em nodejs.org${NC}"
        exit 1
    fi
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}[ERRO] npm não encontrado.${NC}"
        exit 1
    fi
}

ensure_deps() {
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}[INFO] Instalando dependências...${NC}"
        npm install
    fi
}

do_build() {
    echo -e "${CYAN}[BUILD] Iniciando build...${NC}"
    ensure_deps
    npm run build
    echo -e "${GREEN}[BUILD] Build concluído! Pasta: /out${NC}"
}

do_deploy() {
    echo -e "${CYAN}[DEPLOY] Fazendo commit e push...${NC}"
    
    # Config git se necessário
    if ! git config user.name > /dev/null 2>&1; then
        git config user.name "SudoXDdX"
        git config user.email "overtonightisgoat@gmail.com"
    fi
    
    # Add, commit, push
    git add -A
    if git diff --cached --quiet; then
        echo -e "${YELLOW}[DEPLOY] Nenhuma mudança para commitar.${NC}"
    else
        git commit -m "update: site changes"
        echo -e "${GREEN}[DEPLOY] Commit criado.${NC}"
    fi
    
    git push origin main
    echo -e "${GREEN}[DEPLOY] Push concluído! Aguarde o GitHub Actions...${NC}"
    echo -e "${GREEN}[DEPLOY] Site: https://suxd-dev.github.io/Who-Am-I/${NC}"
}

do_dev() {
    echo -e "${CYAN}[DEV] Iniciando servidor de desenvolvimento...${NC}"
    echo -e "${CYAN}[DEV] Acesse: http://localhost:3000${NC}"
    ensure_deps
    npm run dev
}

do_status() {
    echo -e "${CYAN}[STATUS]${NC}"
    git status -sb
    echo ""
    echo -e "${CYAN}[BRANCH]${NC} $(git branch --show-current)"
    echo -e "${CYAN}[REMOTE]${NC} $(git remote get-url origin 2>/dev/null || echo 'nenhum')"
}

do_logs() {
    echo -e "${CYAN}[LOGS] Últimos 10 commits:${NC}"
    git log --oneline -10 --no-decorate
}

add_timeline_entry() {
    echo -e "${CYAN}═══ Adicionar entrada na Timeline ═══${NC}"
    echo ""
    read -p "Ano (ex: 2024): " year
    read -p "Título (pt): " title_pt
    read -p "Título (en): " title_en
    read -p "Descrição curta (pt): " desc_pt
    read -p "Descrição curta (en): " desc_en
    
    echo ""
    echo -e "${YELLOW}Copie e cole isso em src/content/timeline.ts:${NC}"
    echo ""
    echo "  {"
    echo "    year: \"$year\","
    echo "    title: { pt: \"$title_pt\", en: \"$title_en\" },"
    echo "    body: { pt: \"$desc_pt\", en: \"$desc_en\" },"
    echo "  },"
    echo ""
    echo -e "${GREEN}Depois de editar o arquivo, rode: ./update.sh${NC}"
}

add_project() {
    echo -e "${CYAN}═══ Adicionar Projeto ═══${NC}"
    echo ""
    read -p "Slug (ex: meu-projeto): " slug
    read -p "Título (pt): " title_pt
    read -p "Título (en): " title_en
    read -p "Status (idea/prototype/research/active/delivered/parked): " status
    read -p "Tecnologias (separadas por vírgula): " techs
    
    echo ""
    echo -e "${YELLOW}1. Crie o arquivo: src/content/projects/$slug.md${NC}"
    echo -e "${YELLOW}2. Copie e cole isso em src/content/projects.ts:${NC}"
    echo ""
    echo "  {"
    echo "    slug: \"$slug\","
    echo "    title: { pt: \"$title_pt\", en: \"$title_en\" },"
    echo "    status: \"$status\","
    echo "    tech: [$(echo "$techs" | sed 's/, */, */g')]"
    echo "  },"
    echo ""
    echo -e "${GREEN}Depois de editar, rode: ./update.sh${NC}"
}

add_rice() {
    echo -e "${CYAN}═══ Adicionar Rice/Screenshot ═══${NC}"
    echo ""
    
    # Create rices directory if it doesn't exist
    mkdir -p public/rices
    
    echo -e "${YELLOW}1. Coloque suas screenshots em: public/rices/${NC}"
    echo -e "${YELLOW}   Formatos aceitos: .png, .jpg, .webp${NC}"
    echo -e "${YELLOW}   Nomeie como: rice-nome-01.png${NC}"
    echo ""
    echo -e "${YELLOW}2. Para adicionar no site, edite:${NC}"
    echo -e "   src/app/[locale]/rices/page.tsx${NC}"
    echo ""
    echo -e "${YELLOW}Exemplo de como adicionar uma imagem:${NC}"
    echo ""
    echo '  <Image src="/rices/seu-rice.png" alt="Meu rice" width={800} height={450} />'
    echo ""
    
    # List existing rices
    if ls public/rices/*.{png,jpg,webp} 2>/dev/null | head -20; then
        echo -e "${GREEN}Rices existentes:${NC}"
        ls -la public/rices/*.{png,jpg,webp} 2>/dev/null
    fi
}

# ═══════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════

case "${1:-}" in
    build)   check_deps; do_build ;;
    deploy)  do_deploy ;;
    dev)     check_deps; do_dev ;;
    status)  do_status ;;
    logs)    do_logs ;;
    add-timeline) add_timeline_entry ;;
    add-project)  add_project ;;
    add-rice)     add_rice ;;
    help|--help|-h) help ;;
    "")     check_deps; do_build; do_deploy ;;
    *)
        echo -e "${RED}Comando desconhecido: $1${NC}"
        echo "Rode: ./update.sh help"
        exit 1
        ;;
esac
