# Quick Start Guide - 5 Minutes Setup

Follow these steps to send your first WhatsApp message in 5 minutes!

## Step 1: Get WhatsApp API Credentials (3 minutes)

### A. Create Meta App

1. Go to https://developers.facebook.com/
2. Click **"My Apps"** → **"Create App"**
3. Select **"Other"** → **"Business"**
4. Enter app name (e.g., "Test App") and your email
5. Click **"Create App"**

### B. Add WhatsApp

1. In your app dashboard, find **"WhatsApp"**
2. Click **"Set up"**
3. You'll see the WhatsApp API setup page

### C. Copy Your Credentials

On the WhatsApp setup page, you'll see:

```
Phone Number ID: 123456789012345
Business Account ID: 123456789012345
Temporary Access Token: EAAxxxxxxxxxx
```

**Copy these values** - you'll need them in Step 2!

### D. Add Your Phone Number as Recipient

1. Click **"Send test message"** or **"Add phone number"**
2. Enter YOUR phone number (with country code, e.g., +1234567890)
3. WhatsApp will send you a message with a verification code
4. Enter the code to verify

✅ **You're now ready to receive messages!**

## Step 2: Configure the App (1 minute)

1. Copy the environment file:
```bash
cd whatsappSetup
cp .env.example .env.local
```

2. Edit `.env.local` with your credentials from Step 1:
```env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id_here
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_API_VERSION=v21.0
```

## Step 3: Install & Run (1 minute)

```bash
# Install dependencies
npm install

# Run the app
npm run dev
```

Open http://localhost:3000 in your browser!

## Step 4: Send Your First Message

1. In the web app, enter your phone number (with country code)
   - Example: `+1234567890`

2. Type a message:
   - Example: `Hello from WhatsApp Cloud API!`

3. Click **"Send Message"**

4. Check your WhatsApp - you should receive the message! 🎉

## Understanding the Setup

### What Number Sends Messages?

- **For Testing**: Meta's test number sends messages (not your number)
- **You receive**: Messages arrive on YOUR WhatsApp
- **Flow**: Meta Test Number → Your WhatsApp

### To Use Your Own Number (Production)

If you want to send FROM your own number:

1. Complete Meta Business Verification
2. In Meta Dashboard → WhatsApp → Add Phone Number
3. Verify your number via SMS
4. Create permanent access token (System User)
5. Update `.env.local` with your number's credentials

This requires business verification and takes several days.

## Troubleshooting

### "Message not sent" Error

**Check if recipient is verified:**
1. Go to Meta App Dashboard
2. WhatsApp → API Setup
3. Click "Send test message"
4. Add your phone number
5. Verify with the code sent to WhatsApp

### "Access token expired"

- Temporary tokens last 24 hours
- Generate a new token in Meta Dashboard
- For long-term: Create a System User token (see README.md)

### "Invalid phone number"

- Must include country code: `+1234567890`
- No spaces or special characters
- Example formats:
  - ✅ `+14155552671`
  - ❌ `+1 (415) 555-2671`
  - ❌ `4155552671`

## Test Limits

With Meta's free test number:
- ✅ Send to 5 verified numbers
- ✅ 250 messages per day
- ✅ 50 messages per hour
- ✅ Free forever for testing

## What's Next?

### For Production Use:
1. Read the full [README.md](./README.md)
2. Complete business verification
3. Add your own phone number
4. Create permanent access token
5. Set up webhooks for receiving messages

### Try These Features:
- Send messages to multiple verified numbers
- Check message status in Meta Dashboard
- View message analytics
- Create message templates

## API Usage

You can also send messages programmatically:

```bash
curl -X POST http://localhost:3000/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "message": "Hello from API!"
  }'
```

Response:
```json
{
  "success": true,
  "messageId": "wamid.xxxxxxxxxxxxx"
}
```

## Need Help?

- Full documentation: [README.md](./README.md)
- WhatsApp Cloud API Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
- Meta Developer Community: https://developers.facebook.com/community/

---

**Ready to send your first message?** Follow the steps above and you'll be messaging in minutes! 🚀
