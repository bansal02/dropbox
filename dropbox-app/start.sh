#!/bin/bash

# Dropbox Application Startup Script

set -e

echo "🚀 Starting Dropbox-like File Storage Application..."

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down

# Build and start all services
echo "🔨 Building and starting all services..."
docker compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."

# Wait for PostgreSQL
echo "   Waiting for PostgreSQL..."
until docker compose exec postgres pg_isready -U dropbox_user -d dropbox_db &> /dev/null; do
    sleep 1
done
echo "   ✅ PostgreSQL is ready"

# Wait for Backend
echo "   Waiting for Backend..."
until curl -f http://localhost:8080/api/files/list &> /dev/null; do
    sleep 2
done
echo "   ✅ Backend is ready"

# Wait for Frontend
echo "   Waiting for Frontend..."
until curl -f http://localhost:3000 &> /dev/null; do
    sleep 1
done
echo "   ✅ Frontend is ready"

echo ""
echo "🎉 Application is ready!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080/api/files"
echo "🗄️  Database: localhost:5432 (dropbox_db)"
echo ""
