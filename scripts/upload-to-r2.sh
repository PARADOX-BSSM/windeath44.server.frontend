#!/bin/bash

# Cloudflare R2 Upload Script for Unity WebGL Game
# Usage: ./scripts/upload-to-r2.sh <bucket-name>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if bucket name is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Bucket name is required${NC}"
  echo "Usage: ./scripts/upload-to-r2.sh <bucket-name>"
  echo "Example: ./scripts/upload-to-r2.sh unity-game-assets"
  exit 1
fi

BUCKET_NAME=$1
BASE_PATH="public/unity/Project_HG"

echo -e "${GREEN}Starting upload to R2 bucket: ${BUCKET_NAME}${NC}"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
  echo -e "${RED}Error: Wrangler CLI is not installed${NC}"
  echo "Install it with: npm install -g wrangler"
  exit 1
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
  echo -e "${YELLOW}You need to login to Cloudflare first${NC}"
  wrangler login
fi

echo -e "${YELLOW}Uploading Unity WebGL files...${NC}"

# Upload Build files
echo "Uploading Build files..."
wrangler r2 object put ${BUCKET_NAME}/unity/Project_HG/Build/Project_HG.data.br \
  --file=${BASE_PATH}/Build/Project_HG.data.br \
  --content-type=application/octet-stream

wrangler r2 object put ${BUCKET_NAME}/unity/Project_HG/Build/Project_HG.wasm.br \
  --file=${BASE_PATH}/Build/Project_HG.wasm.br \
  --content-type=application/wasm

wrangler r2 object put ${BUCKET_NAME}/unity/Project_HG/Build/Project_HG.framework.js.br \
  --file=${BASE_PATH}/Build/Project_HG.framework.js.br \
  --content-type=application/javascript

wrangler r2 object put ${BUCKET_NAME}/unity/Project_HG/Build/Project_HG.loader.js \
  --file=${BASE_PATH}/Build/Project_HG.loader.js \
  --content-type=application/javascript

# Upload index.html
echo "Uploading index.html..."
wrangler r2 object put ${BUCKET_NAME}/unity/Project_HG/index.html \
  --file=${BASE_PATH}/index.html \
  --content-type=text/html

# Upload TemplateData folder
echo "Uploading TemplateData..."
for file in ${BASE_PATH}/TemplateData/*; do
  filename=$(basename "$file")

  # Determine content type
  case "$filename" in
    *.css)
      content_type="text/css"
      ;;
    *.png)
      content_type="image/png"
      ;;
    *.ico)
      content_type="image/x-icon"
      ;;
    *)
      content_type="application/octet-stream"
      ;;
  esac

  wrangler r2 object put ${BUCKET_NAME}/unity/Project_HG/TemplateData/${filename} \
    --file=${file} \
    --content-type=${content_type}
done

# Upload StreamingAssets if exists
if [ -d "${BASE_PATH}/StreamingAssets" ]; then
  echo "Uploading StreamingAssets..."
  for file in ${BASE_PATH}/StreamingAssets/*; do
    filename=$(basename "$file")

    # Determine content type
    case "$filename" in
      *.json)
        content_type="application/json"
        ;;
      *)
        content_type="application/octet-stream"
        ;;
    esac

    wrangler r2 object put ${BUCKET_NAME}/unity/Project_HG/StreamingAssets/${filename} \
      --file=${file} \
      --content-type=${content_type}
  done
fi

echo ""
echo -e "${GREEN}✓ Upload completed successfully!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Enable Public Access on your R2 bucket"
echo "2. Get your R2 public URL (e.g., https://your-bucket.r2.dev)"
echo "3. Set VITE_UNITY_GAME_URL in Cloudflare Pages environment variables:"
echo "   VITE_UNITY_GAME_URL=https://your-bucket.r2.dev/unity/Project_HG/index.html"
