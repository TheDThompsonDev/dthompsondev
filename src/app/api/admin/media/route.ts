import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getUploadedFiles } from '@/lib/db';

export async function GET() {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const files = await getUploadedFiles();
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}