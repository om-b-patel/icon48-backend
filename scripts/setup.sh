#!/bin/bash

# ICON48 Backend Setup Script
# This script helps you get started with local development

set -e

echo "🚀 ICON48 Backend Setup"
echo "======================="
echo ""

# Check for required tools
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker."
    exit 1
fi

echo "✅ All prerequisites are installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Setup environment variables
if [ ! -f .env ]; then
    echo "⚙️  Setting up environment variables..."
    cp .env.example .env
    echo "✅ .env file created. Please fill in your API keys before continuing."
    echo ""
    echo "Required environment variables:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
    echo "  - STRIPE_SECRET_KEY"
    echo "  - OPENAI_API_KEY"
    echo ""
    read -p "Press enter when you've filled in the environment variables..."
else
    echo "✅ .env file already exists"
fi
echo ""

# Start infrastructure
echo "🐳 Starting infrastructure (PostgreSQL, n8n, Redis)..."
cd infra
docker-compose up -d
cd ..

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Run database migrations
echo "🗄️  Setting up database..."
pnpm db:push
echo "✅ Database setup complete"
echo ""

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd packages/db
pnpm prisma generate
cd ../..
echo "✅ Prisma client generated"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo ""
echo "1. Start the development server:"
echo "   pnpm dev"
echo ""
echo "2. Access the API at:"
echo "   http://localhost:3000"
echo ""
echo "3. Access n8n at:"
echo "   http://localhost:5678"
echo "   Default credentials: admin / changeme"
echo ""
echo "4. View the documentation:"
echo "   - README.md - Getting started guide"
echo "   - API.md - Complete API reference"
echo "   - DEPLOYMENT.md - Production deployment"
echo ""
echo "Happy coding! 🎉"


