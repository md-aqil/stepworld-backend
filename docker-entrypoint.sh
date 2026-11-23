#!/bin/sh
set -e

echo "=== Running database schema sync ==="
cd /app/backend
npx prisma db push --accept-data-loss

echo "=== Checking seed data ==="
npm run seed:comprehensive || true

echo "=== Starting StepWorld Production Server on port ${PORT:-4000} ==="
exec node dist/server.js
