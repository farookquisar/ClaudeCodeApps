import axios, { AxiosError } from 'axios';
import type { WhatsAppConfig, SendMessageResponse, WhatsAppAPIResponse, WhatsAppError } from '@/types/whatsapp';

export class WhatsAppService {
  private config: WhatsAppConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
      apiVersion: process.env.WHATSAPP_API_VERSION || 'v21.0',
    };

    this.baseUrl = `https://graph.facebook.com/${this.config.apiVersion}`;

    if (!this.config.phoneNumberId || !this.config.accessToken) {
      console.warn('WhatsApp credentials are not configured. Please set environment variables.');
    }
  }

  /**
   * Validates phone number format
   * Must include country code without + symbol
   */
  private validatePhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');

    // Remove + if present (API expects numbers without +)
    cleaned = cleaned.replace(/^\+/, '');

    if (cleaned.length < 10) {
      throw new Error('Phone number is too short. Must include country code.');
    }

    return cleaned;
  }

  /**
   * Sends a text message via WhatsApp Cloud API
   */
  async sendTextMessage(to: string, message: string): Promise<SendMessageResponse> {
    try {
      // Validate phone number
      const cleanedNumber = this.validatePhoneNumber(to);

      // Prepare request payload
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanedNumber,
        type: 'text',
        text: {
          preview_url: false,
          body: message,
        },
      };

      // Make API request
      const response = await axios.post<WhatsAppAPIResponse>(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Return success response
      return {
        success: true,
        messageId: response.data.messages[0]?.id,
      };

    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Sends a template message (for approved templates)
   */
  async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string = 'en_US',
    components?: any[]
  ): Promise<SendMessageResponse> {
    try {
      const cleanedNumber = this.validatePhoneNumber(to);

      const payload = {
        messaging_product: 'whatsapp',
        to: cleanedNumber,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          ...(components && { components }),
        },
      };

      const response = await axios.post<WhatsAppAPIResponse>(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        messageId: response.data.messages[0]?.id,
      };

    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Marks a message as read
   */
  async markMessageAsRead(messageId: string): Promise<SendMessageResponse> {
    try {
      await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return { success: true };

    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handles errors from WhatsApp API
   */
  private handleError(error: unknown): SendMessageResponse {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<WhatsAppError>;

      if (axiosError.response?.data?.error) {
        const errorData = axiosError.response.data.error;

        return {
          success: false,
          error: errorData.message,
          details: {
            type: errorData.type,
            code: errorData.code,
            trace: errorData.fbtrace_id,
            ...(errorData.error_data && { data: errorData.error_data }),
          },
        };
      }

      return {
        success: false,
        error: axiosError.message,
        details: {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
        },
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'An unknown error occurred',
    };
  }

  /**
   * Validates webhook signature (for receiving messages)
   */
  validateWebhookSignature(signature: string, payload: string): boolean {
    const crypto = require('crypto');
    const appSecret = process.env.WHATSAPP_APP_SECRET || '';

    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(payload)
      .digest('hex');

    return signature === `sha256=${expectedSignature}`;
  }
}

// Export singleton instance
export const whatsappService = new WhatsAppService();
