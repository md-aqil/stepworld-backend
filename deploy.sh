#!/bin/bash
set -e

echo "=== Pulling latest changes from GitHub ==="
git pull origin main

echo "=== Building and Starting Docker Containers ==="
docker compose up -d --build --remove-orphans

echo "=== Deployment Status ==="
docker compose ps
