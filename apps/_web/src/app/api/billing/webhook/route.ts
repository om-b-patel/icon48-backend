import { NextRequest } from 'next/server';
import { handleStripeWebhook } from '@icon48/api';

export async function POST(req: NextRequest) {
  return handleStripeWebhook(req);
}


