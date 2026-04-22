import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { triggerMarketingAutomation } from '@/lib/marketing';

export async function GET() {
  const { data: props, error } = await db
    .from('properties_inventory')
    .select('*')
    .order('id', { ascending: false });
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(props);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const { data: newProp, error } = await db
      .from('properties_inventory')
      .insert([{
        transaction_type: data.transaction_type,
        images: data.images || '/default-prop.jpg',
        price: data.price,
        location: data.location,
        rooms: data.rooms || 2,
        roi_estimate: data.roi || '10%',
        lat: data.lat,
        lng: data.lng,
        status: 'Active'
      }])
      .select()
      .single();

    if (error) throw error;
    
    // Trigger Automated Marketing
    await triggerMarketingAutomation(newProp);

    return NextResponse.json({ success: true, id: newProp.id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
