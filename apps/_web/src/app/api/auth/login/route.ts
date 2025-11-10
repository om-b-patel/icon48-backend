import { NextRequest } from 'next/server';
import { login } from '@icon48/api';

export async function POST(req: NextRequest) {
  return login(req);
}


