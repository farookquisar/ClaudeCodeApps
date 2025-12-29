#!/bin/bash

echo "========================================="
echo "WhatsApp Cloud API Setup Script"
echo "========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required!"
    echo "Current version: $(node -v)"
    echo "Please upgrade Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing .env.local file"
    else
        cp .env.example .env.local
        echo "✅ Created new .env.local from template"
    fi
else
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
fi

echo ""
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo ""
echo "1. Get WhatsApp API credentials:"
echo "   → Go to https://developers.facebook.com/"
echo "   → Create an app and add WhatsApp product"
echo "   → Copy Phone Number ID and Access Token"
echo ""
echo "2. Edit .env.local file:"
echo "   → Add your WHATSAPP_PHONE_NUMBER_ID"
echo "   → Add your WHATSAPP_ACCESS_TOKEN"
echo "   → Add your WHATSAPP_BUSINESS_ACCOUNT_ID"
echo ""
echo "3. Install dependencies:"
echo "   → Run: npm install"
echo ""
echo "4. Start the app:"
echo "   → Run: npm run dev"
echo "   → Open: http://localhost:3000"
echo ""
echo "📖 See QUICKSTART.md for detailed instructions"
echo "========================================="
