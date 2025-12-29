'use client';

import { useState } from 'react';
import axios from 'axios';

interface MessageStatus {
  type: 'success' | 'error' | 'info';
  message: string;
  details?: any;
}

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<MessageStatus | null>(null);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except +
    let cleaned = value.replace(/[^\d+]/g, '');

    // Ensure it starts with +
    if (cleaned && !cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }

    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields',
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.post('/api/send-message', {
        to: phoneNumber,
        message: message,
      });

      if (response.data.success) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully!',
          details: `Message ID: ${response.data.messageId}`,
        });
        setMessage(''); // Clear message field
      } else {
        setStatus({
          type: 'error',
          message: response.data.error || 'Failed to send message',
          details: response.data.details,
        });
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      setStatus({
        type: 'error',
        message: error.response?.data?.error || error.message || 'An error occurred',
        details: error.response?.data?.details,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-whatsapp-green"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            WhatsApp Cloud API
          </h1>
          <p className="text-gray-600">
            Send WhatsApp messages using the official Cloud API
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-whatsapp-green text-white p-6">
            <h2 className="text-2xl font-semibold">Send Message</h2>
            <p className="text-green-100 mt-1">
              Enter the recipient's phone number and your message
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Phone Number Input */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp-green focus:border-transparent outline-none transition"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Include country code (e.g., +1 for US, +91 for India)
              </p>
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp-green focus:border-transparent outline-none transition resize-none"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {message.length} characters
              </p>
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`p-4 rounded-lg ${
                  status.type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : status.type === 'error'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <p
                  className={`font-medium ${
                    status.type === 'success'
                      ? 'text-green-800'
                      : status.type === 'error'
                      ? 'text-red-800'
                      : 'text-blue-800'
                  }`}
                >
                  {status.message}
                </p>
                {status.details && (
                  <p
                    className={`text-sm mt-1 ${
                      status.type === 'success'
                        ? 'text-green-600'
                        : status.type === 'error'
                        ? 'text-red-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {typeof status.details === 'string'
                      ? status.details
                      : JSON.stringify(status.details, null, 2)}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-whatsapp-green hover:bg-whatsapp-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">
              Important Notes:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-whatsapp-green mt-0.5">•</span>
                <span>
                  For test numbers, recipient must be verified in Meta dashboard
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-whatsapp-green mt-0.5">•</span>
                <span>
                  Phone number must include country code without spaces
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-whatsapp-green mt-0.5">•</span>
                <span>
                  Test numbers have limits: 250 messages/day, 50/hour
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-whatsapp-green mt-0.5">•</span>
                <span>
                  Check the README.md file for complete setup instructions
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>
            Powered by{' '}
            <a
              href="https://developers.facebook.com/docs/whatsapp/cloud-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-whatsapp-green hover:underline"
            >
              WhatsApp Cloud API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
