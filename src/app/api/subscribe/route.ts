import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Store to a simple JSON file (works on Vercel with /tmp)
    const filePath = path.join('/tmp', 'quantread_subscribers.json');

    let subscribers: { email: string; date: string; source: string }[] = [];
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      subscribers = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    // Check for duplicate
    if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
    }

    subscribers.push({
      email: email.toLowerCase().trim(),
      date: new Date().toISOString(),
      source: 'landing_page',
    });

    await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ message: 'Subscribed' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
