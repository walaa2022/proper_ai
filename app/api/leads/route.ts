import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simple Lead Scoring Logic
    let score = 'COLD';
    const isImmediate = data.timeline?.toLowerCase().includes('immediate') || data.timeline?.toLowerCase().includes('now');
    const isBudgetHigh = data.budget?.toLowerCase().includes('m') || data.budget?.toLowerCase().includes('million');
    
    if (isImmediate && isBudgetHigh) score = 'HOT';
    else if (isImmediate || isBudgetHigh) score = 'WARM';

    const { data: newLead, error } = await db
      .from('leads_master')
      .insert([{
        name: data.name || 'Anonymous',
        phone: data.phone || '',
        email: data.email || data.contact,
        intent: data.intent,
        budget: data.budget,
        location: data.location,
        timeline: data.timeline,
        lead_score: score
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, score });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const { data: leads, error } = await db
    .from('leads_master')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(leads);
}
