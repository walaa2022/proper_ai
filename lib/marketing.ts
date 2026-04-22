import db from './db';

export async function triggerMarketingAutomation(newProperty: any) {
  console.log(`--- [CLOUDFLARE/SUPABASE MARKETING AUTOMATION] TRIGGERED ---`);
  console.log(`New Property Added: ${newProperty.location} for ${newProperty.price}`);
  
  // Find matching leads (HOT/WARM)
  const { data: leads, error } = await db
    .from('leads_master')
    .select('*')
    .in('lead_score', ['HOT', 'WARM'])
    .ilike('location', `%${newProperty.location.split(',')[0]}%`);

  if (error) {
    console.error("Marketing sync failed:", error.message);
    return 0;
  }

  console.log(`Found ${leads.length} matching leads for cloud synchronization.`);

  leads.forEach((lead: any) => {
    console.log(`[CLOUD PUSH] Sending AI-Personalized notification to ${lead.name} (${lead.phone})`);
    console.log(`Message: "Hello ${lead.name}, our AI has matched a new ${newProperty.transaction_type} in ${newProperty.location} at ${newProperty.price} to your profile. View now: https://prop-ai.com/properties/${newProperty.id}"`);
  });

  return leads.length;
}
