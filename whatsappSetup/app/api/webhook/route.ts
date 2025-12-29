import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook verification endpoint for WhatsApp
 * Meta will send a GET request to verify your webhook
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse query params
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify token (you should set this in your Meta App settings)
  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'your_verify_token_here';

  // Check if mode and token are valid
  if (mode === 'subscribe' && token === verifyToken) {
    // Respond with challenge to complete verification
    console.log('Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  } else {
    // Verification failed
    console.error('Webhook verification failed');
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 403 }
    );
  }
}

/**
 * Webhook endpoint for receiving WhatsApp messages
 * Meta will POST incoming messages to this endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Webhook received:', JSON.stringify(body, null, 2));

    // Verify webhook signature (security measure)
    const signature = request.headers.get('x-hub-signature-256');
    if (signature) {
      // TODO: Implement signature validation
      // const isValid = whatsappService.validateWebhookSignature(signature, JSON.stringify(body));
      // if (!isValid) {
      //   return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
      // }
    }

    // Process webhook event
    if (body.object === 'whatsapp_business_account') {
      // Extract message data
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];

        for (const change of changes) {
          if (change.field === 'messages') {
            const value = change.value;

            // Process messages
            if (value.messages) {
              for (const message of value.messages) {
                await processIncomingMessage(message, value.metadata);
              }
            }

            // Process message status updates
            if (value.statuses) {
              for (const status of value.statuses) {
                await processMessageStatus(status);
              }
            }
          }
        }
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);

    // Still return 200 to avoid retries
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

/**
 * Process incoming message
 */
async function processIncomingMessage(message: any, metadata: any) {
  console.log('Processing incoming message:', {
    from: message.from,
    type: message.type,
    timestamp: message.timestamp,
    messageId: message.id,
  });

  // Handle different message types
  switch (message.type) {
    case 'text':
      console.log('Text message:', message.text.body);
      // TODO: Handle text message
      break;

    case 'image':
      console.log('Image message:', message.image);
      // TODO: Handle image message
      break;

    case 'document':
      console.log('Document message:', message.document);
      // TODO: Handle document message
      break;

    case 'audio':
      console.log('Audio message:', message.audio);
      // TODO: Handle audio message
      break;

    case 'video':
      console.log('Video message:', message.video);
      // TODO: Handle video message
      break;

    default:
      console.log('Unknown message type:', message.type);
  }
}

/**
 * Process message status update
 */
async function processMessageStatus(status: any) {
  console.log('Message status update:', {
    messageId: status.id,
    status: status.status,
    timestamp: status.timestamp,
  });

  // Status types: sent, delivered, read, failed
  // TODO: Update your database with message status
}
