import { NextRequest } from 'next/server';
import { signup } from '@icon48/api';

export async function POST(req: NextRequest) {
  return signup(req);
}


