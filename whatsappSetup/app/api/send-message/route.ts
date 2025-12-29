import { NextRequest, NextResponse } from 'next/server';
import { whatsappService } from '@/lib/whatsapp';
import type { SendMessageRequest } from '@/types/whatsapp';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: SendMessageRequest = await request.json();

    // Validate required fields
    if (!body.to || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: "to" and "message" are required',
        },
        { status: 400 }
      );
    }

    // Validate message content
    if (body.message.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message cannot be empty',
        },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.WHATSAPP_PHONE_NUMBER_ID || !process.env.WHATSAPP_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: 'WhatsApp API credentials are not configured. Please check your environment variables.',
        },
        { status: 500 }
      );
    }

    // Send message via WhatsApp
    const result = await whatsappService.sendTextMessage(body.to, body.message);

    // Return response
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Error in send-message API:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
