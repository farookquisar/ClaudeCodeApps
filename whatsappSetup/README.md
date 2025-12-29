# WhatsApp Cloud API Setup Guide

Complete guide to set up WhatsApp Cloud API and send messages using a Next.js application.

## Prerequisites

- Node.js 18+ installed
- A Facebook Developer account
- A phone number (for testing)

## Part 1: WhatsApp Cloud API Setup (Meta Business)

### Step 1: Create a Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Other"** as use case
4. Select **"Business"** as app type
5. Fill in:
   - **App Name**: Choose any name (e.g., "WhatsApp Test App")
   - **App Contact Email**: Your email
   - Click **"Create App"**

### Step 2: Add WhatsApp Product

1. In your app dashboard, find **"WhatsApp"** in the product list
2. Click **"Set up"**
3. You'll be taken to the WhatsApp API setup page

### Step 3: Get Test Phone Number & Access Token

**Meta provides a test number for free!**

1. On the WhatsApp setup page, you'll see:
   - **Test Phone Number** (provided by Meta - e.g., +1 555-0100)
   - **Phone Number ID** (copy this)
   - **WhatsApp Business Account ID** (copy this)

2. Generate **Temporary Access Token**:
   - Click **"Generate Token"** or find it in the API Setup section
   - Copy the token (valid for 24 hours - for testing only)

3. **Add Your Phone Number as Recipient**:
   - Click **"Add phone number"** or **"Send test message"**
   - Enter YOUR phone number (where you want to receive messages)
   - You'll receive a WhatsApp message from the test number
   - Reply with the verification code

### Step 4: Get Permanent Access Token (Production)

For production, you need a **System User Access Token**:

1. Go to [Meta Business Settings](https://business.facebook.com/settings)
2. Click **"Users"** → **"System Users"**
3. Click **"Add"** → Create a system user
4. Click on the system user → **"Generate New Token"**
5. Select your app
6. Select permissions: `whatsapp_business_messaging`, `whatsapp_business_management`
7. Generate and copy the token (save it securely!)

### Step 5: Find Your Credentials

You need these credentials (find them in the Meta App Dashboard):

```
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_API_VERSION=v21.0
```

**Where to find them:**
- **Phone Number ID**: WhatsApp → API Setup → Phone Number ID
- **Business Account ID**: WhatsApp → API Setup → WhatsApp Business Account ID
- **Access Token**: Generated in Step 3 or Step 4

## Part 2: Next.js Application Setup

### Installation

```bash
cd whatsappSetup
npm install
```

### Environment Configuration

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your credentials:
```env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_API_VERSION=v21.0
```

### Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

## Part 3: Testing Message Sending

### Using the Web UI

1. Open `http://localhost:3000`
2. Enter the recipient's phone number (with country code, e.g., +1234567890)
3. Type your message
4. Click **"Send Message"**
5. Check your WhatsApp for the message!

### Using the API Directly

```bash
curl -X POST http://localhost:3000/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "message": "Hello from WhatsApp Cloud API!"
  }'
```

## Important Notes

### Phone Number Format
- **MUST** include country code
- **NO** spaces, dashes, or parentheses
- Example: `+14155552671` (NOT `+1 (415) 555-2671`)

### Test vs Production

**Test Number (Free):**
- Provided by Meta
- Can send to up to 5 verified numbers
- Messages show "This is a test message"
- Temporary access token (24 hours)

**Production Number:**
- Need to verify your business
- Register your own phone number
- Need permanent access token
- Can send to any number (with rate limits)

### Rate Limits (Test Number)
- 250 messages per day
- 50 messages per hour
- 5 verified recipient numbers maximum

## Troubleshooting

### Error: "Invalid phone number"
- Make sure phone number includes country code
- Remove all spaces and special characters
- Format: `+[country_code][number]`

### Error: "Message not sent"
- Check if recipient number is verified in Meta dashboard
- Verify your access token is valid
- Check if you've exceeded rate limits

### Error: "Access token expired"
- Temporary tokens last 24 hours
- Generate a new one or create a permanent System User token

### Error: "Recipient not on allowed list"
- For test numbers, you must verify recipient numbers first
- Go to Meta App Dashboard → WhatsApp → Send test message
- Add the recipient number and verify with code

## Features Included

✅ Send text messages via WhatsApp
✅ Modern UI with Tailwind CSS
✅ Real-time message status
✅ Error handling and validation
✅ Phone number formatting
✅ API routes for integration
✅ TypeScript support
✅ Environment variable configuration

## Next Steps

1. **Verify Your Business** (for production):
   - Go to Meta Business Verification
   - Submit required documents
   - Wait for approval (can take several days)

2. **Add Your Phone Number**:
   - WhatsApp → Phone Numbers → Add Phone Number
   - Verify via SMS or call
   - Set display name and profile

3. **Send Template Messages**:
   - Create message templates in Meta Business Manager
   - Get templates approved
   - Use templates for proactive messages

4. **Set up Webhooks** (for receiving messages):
   - Configure webhook URL
   - Verify webhook
   - Handle incoming messages

## Resources

- [WhatsApp Cloud API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Getting Started Guide](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
- [Message Templates](https://developers.facebook.com/docs/whatsapp/message-templates)
- [API Reference](https://developers.facebook.com/docs/whatsapp/cloud-api/reference)

## Support

For issues or questions:
- Check [Meta Developer Community](https://developers.facebook.com/community/)
- Review [API Status](https://developers.facebook.com/status/)
- See [Changelog](https://developers.facebook.com/docs/whatsapp/business-platform/changelog)
