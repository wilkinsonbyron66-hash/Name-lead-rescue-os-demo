export async function generateTemplateResponses({ biz, offer, name, lead, price, source, tone, currency }) {
  // Simulate API delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 1500))

  const priceStr = `${currency} ${price.toLocaleString()}`
  
  const instantReply = `Hi ${name} — absolutely. For ${offer}, our typical starting point is around ${priceStr} depending on spec and requirements.

I'd like to confirm two quick details so I can give you a precise quote:
1) What's your specific need/timeline?
2) Are you looking for the best value, premium option, or something in between?

Once I have that, I can send you the exact price and turnaround time.
