import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$connect();
    
    console.log('Database connection successful');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected. Use "npx prisma db push" to create tables.' 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database', details: error },
      { status: 500 }
    );
  }
}