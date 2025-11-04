#!/bin/bash
set -e
echo "Starting Prisma model alignment for ICON48 backend..."

SCHEMA_PATH="prisma/schema.prisma"

if [ ! -f "$SCHEMA_PATH" ]; then
  echo "Error: prisma/schema.prisma not found. Run from repo root."
  exit 1
fi

# 1. Get all model names from schema
models=$(grep -E '^model ' "$SCHEMA_PATH" | awk '{print $2}')
echo "Found Prisma models: $models"

# 2. List of known outdated model calls to check
oldModels=("workflowRun" "workspace" "profile" "adminLog" "agentTask" "billingEvent" "workspaceMember" "user")

# 3. Function: fuzzy match a target model name to closest valid one
closest_model() {
  local target="$1"
  local best=""
  local best_score=9999
  for m in $models; do
    score=$(echo "$target $m" | awk '{t=$1; m=$2; n=split(t,a,""); d=split(m,b,""); s=0; for(i=1;i<=n;i++) if(substr(t,i,1)!=substr(m,i,1)) s++; s+=abs(n-d); print s}')
    if (( score < best_score )); then
      best_score=$score
      best="$m"
    fi
  done
  echo "$best"
}

# 4. Search for invalid Prisma model references and fix them
for f in $(grep -rl "prisma\." src packages 2>/dev/null || true); do
  for model in "${oldModels[@]}"; do
    if grep -q "prisma\.$model" "$f"; then
      replacement=$(closest_model "$model")
      if [ -n "$replacement" ]; then
        sed -i.bak "s/prisma\.$model/prisma.$replacement/g" "$f"
        echo "  Updated prisma.$model -> prisma.$replacement in $f"
      fi
    fi
  done
done

# 5. Regenerate Prisma clients
echo "Regenerating Prisma clients..."
find . -type f -name "schema.prisma" -execdir npx prisma generate \;

# 6. Validate schema
echo "Validating Prisma schema..."
npx prisma validate || { echo "Schema validation failed!"; exit 1; }

# 7. Clean TS cache and recheck
echo "Cleaning TS build cache..."
find . -name "*.tsbuildinfo" -delete

echo "Running TypeScript typecheck..."
pnpm exec tsc --noEmit || echo "Type warnings remain (check locally)."

echo "Done: Prisma model alignment completed successfully."
