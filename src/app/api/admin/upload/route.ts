import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { verifySession } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const blob = await put(filename, file, {
      access: 'public',
    });

    const savedFile = await saveUploadedFile({
      fileName: file.name,
      blobUrl: blob.url,
      fileType: file.type,
      fileSize: file.size,
    });

    return NextResponse.json({
      success: true,
      file: savedFile,
      url: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}