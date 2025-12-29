# Project Structure

Complete WhatsApp Cloud API integration with Next.js application.

## Directory Structure

```
whatsappSetup/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── send-message/         # Send message endpoint
│   │   │   └── route.ts          # POST /api/send-message
│   │   └── webhook/              # WhatsApp webhook
│   │       └── route.ts          # GET/POST /api/webhook
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (message UI)
│
├── lib/                          # Libraries and services
│   └── whatsapp.ts               # WhatsApp API service class
│
├── types/                        # TypeScript types
│   └── whatsapp.ts               # WhatsApp-related types
│
├── .env.example                  # Environment variables template
├── .env.local                    # Your credentials (gitignored)
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS config (Tailwind)
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript configuration
│
├── QUICKSTART.md                 # 5-minute quick start guide
├── README.md                     # Complete setup guide
├── PROJECT_STRUCTURE.md          # This file
└── setup.sh                      # Setup script
```

## Key Files Explained

### API Routes

**`app/api/send-message/route.ts`**
- Handles POST requests to send WhatsApp messages
- Validates input (phone number and message)
- Calls WhatsApp Cloud API
- Returns success/error responses

**`app/api/webhook/route.ts`**
- GET: Webhook verification for Meta
- POST: Receives incoming messages and status updates
- Processes different message types (text, image, etc.)

### Services

**`lib/whatsapp.ts`**
- `WhatsAppService` class for API communication
- Methods:
  - `sendTextMessage()`: Send text messages
  - `sendTemplateMessage()`: Send template messages
  - `markMessageAsRead()`: Mark messages as read
- Phone number validation and formatting
- Error handling

### UI Components

**`app/page.tsx`**
- Main message sending interface
- Form with phone number and message inputs
- Real-time status updates
- Loading states and error handling

**`app/globals.css`**
- Tailwind CSS imports
- Custom WhatsApp theme colors
- Global styles

### Configuration Files

**`package.json`**
- Project dependencies:
  - `next`: Next.js framework
  - `react`: React library
  - `axios`: HTTP client
  - `typescript`: TypeScript support
  - `tailwindcss`: Utility-first CSS

**`tsconfig.json`**
- TypeScript compiler options
- Path aliases (`@/*`)
- Strict type checking enabled

**`tailwind.config.ts`**
- Custom WhatsApp colors:
  - `whatsapp-green`: #25D366
  - `whatsapp-dark`: #128C7E
  - `whatsapp-light`: #DCF8C6

**`.env.example`**
- Template for environment variables
- Copy to `.env.local` and fill in your credentials

## API Endpoints

### Send Message
```
POST /api/send-message
Content-Type: application/json

{
  "to": "+1234567890",
  "message": "Hello from WhatsApp!"
}

Response:
{
  "success": true,
  "messageId": "wamid.xxxxxxxxxxxxx"
}
```

### Webhook Verification
```
GET /api/webhook?hub.mode=subscribe&hub.verify_token=your_token&hub.challenge=123

Response: 123 (challenge string)
```

### Webhook Events
```
POST /api/webhook
Content-Type: application/json

{
  "object": "whatsapp_business_account",
  "entry": [...]
}

Response:
{
  "success": true
}
```

## Environment Variables

Required in `.env.local`:

```env
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxx
WHATSAPP_API_VERSION=v21.0
```

Optional (for webhooks):
```env
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_secret_verify_token
WHATSAPP_APP_SECRET=your_app_secret
```

## WhatsApp Service Methods

### `sendTextMessage(to: string, message: string)`

Sends a text message.

**Parameters:**
- `to`: Recipient phone number (with country code)
- `message`: Message text

**Returns:** `SendMessageResponse`

**Example:**
```typescript
const result = await whatsappService.sendTextMessage(
  '+1234567890',
  'Hello!'
);
```

### `sendTemplateMessage(to, templateName, languageCode, components)`

Sends a pre-approved template message.

**Parameters:**
- `to`: Recipient phone number
- `templateName`: Template name from Meta Business Manager
- `languageCode`: Language (default: 'en_US')
- `components`: Optional template parameters

**Example:**
```typescript
const result = await whatsappService.sendTemplateMessage(
  '+1234567890',
  'hello_world',
  'en_US'
);
```

## Phone Number Format

**Correct:**
- `+1234567890`
- `+919876543210`
- `+447700900000`

**Incorrect:**
- `1234567890` (missing country code)
- `+1 (234) 567-890` (has special characters)
- `+1-234-567-890` (has dashes)

## Message Types Supported

### Text Messages
```typescript
{
  messaging_product: 'whatsapp',
  to: '+1234567890',
  type: 'text',
  text: {
    body: 'Your message here'
  }
}
```

### Template Messages
```typescript
{
  messaging_product: 'whatsapp',
  to: '+1234567890',
  type: 'template',
  template: {
    name: 'hello_world',
    language: { code: 'en_US' }
  }
}
```

### Future Support (webhook)
- Images
- Documents
- Audio
- Video
- Location
- Contacts

## Error Handling

All API calls return a `SendMessageResponse`:

```typescript
interface SendMessageResponse {
  success: boolean;
  messageId?: string;    // On success
  error?: string;        // On failure
  details?: any;         // Error details
}
```

**Common Errors:**

1. **Invalid phone number**
   - Cause: Missing country code or wrong format
   - Fix: Use format `+[country_code][number]`

2. **Access token expired**
   - Cause: Using temporary token (24h validity)
   - Fix: Generate new token or use System User token

3. **Recipient not on allowed list**
   - Cause: Test number requires verified recipients
   - Fix: Verify recipient in Meta Dashboard

4. **Rate limit exceeded**
   - Cause: Too many messages sent
   - Fix: Wait or upgrade to production

## Scripts

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Setup script
./setup.sh
```

## Development Workflow

1. **Setup**: Run `./setup.sh` and configure `.env.local`
2. **Install**: Run `npm install`
3. **Develop**: Run `npm run dev`
4. **Test**: Send messages via UI at http://localhost:3000
5. **API Test**: Use curl or Postman to test `/api/send-message`
6. **Deploy**: Build with `npm run build` and deploy

## Production Deployment

### Environment Setup
1. Set all environment variables in your hosting platform
2. Use permanent System User access token
3. Configure webhook URL in Meta Dashboard

### Recommended Platforms
- **Vercel**: Native Next.js support
- **Netlify**: Next.js runtime
- **Railway**: Container deployment
- **DigitalOcean App Platform**: Container/Node.js

### Deployment Checklist
- [ ] Set production environment variables
- [ ] Use permanent access token (not temporary)
- [ ] Configure webhook URL (if receiving messages)
- [ ] Set up webhook verification token
- [ ] Test message sending
- [ ] Monitor rate limits
- [ ] Set up error logging

## Security Best Practices

1. **Never commit `.env.local`** - It's gitignored
2. **Use System User tokens** - More secure than temporary tokens
3. **Validate webhook signatures** - Verify Meta's requests
4. **Implement rate limiting** - Prevent abuse
5. **Log errors securely** - Don't expose tokens in logs
6. **Use HTTPS** - Required for production webhooks

## Next Steps

1. **Basic Testing**:
   - Send messages via UI
   - Test API endpoint with curl
   - Verify messages arrive on WhatsApp

2. **Advanced Features**:
   - Create message templates
   - Set up webhooks for receiving messages
   - Implement conversation handling
   - Add media support (images, documents)

3. **Production**:
   - Complete business verification
   - Add your phone number
   - Create permanent access token
   - Deploy to production
   - Set up monitoring

## Resources

- [WhatsApp Cloud API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
