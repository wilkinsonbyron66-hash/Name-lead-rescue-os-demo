export async function generateTemplateResponses({ biz, offer, name, lead, price, source, tone, currency }) {
  // Simulate API delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 1500))

  const priceStr = `${currency} ${price.toLocaleString()}`
  
  const instantReply = `Hi ${name} — absolutely. For ${offer}, our typical starting point is around ${priceStr} depending on spec and requirements.

I'd like to confirm two quick details so I can give you a precise quote:
1) What's your specific need/timeline?
2) Are you looking for the best value, premium option, or something in between?

Once I have that, I can send you the exact price and turnaround time.`

  const followUp = `DAY 0 — Value-first reply
Send the instant reply above. Goal: get one easy answer, not "close the sale".

DAY 1 — Proof
"Quick one, ${name} — I can also send you 2–3 examples of ${offer} we've done recently. Want me to send them?"

DAY 3 — Remove uncertainty
"Just checking in, ${name}. Most people choose based on: budget, timeline, or maximum quality. Which matters most to you?"

DAY 6 — Direct CTA
"Still considering ${offer}? I have an opening next week. If you want, I can reserve a slot and lock in today's price for you."

DAY 12 — Breakup / reactivation
"Hey ${name} — I'll close this enquiry for now. But if you decide to move forward with ${offer} later, just reply 'YES' and I'll pick it up immediately."`

  const qualification = `QUALIFICATION SCORECARD

Need / urgency (0–2)
• Is there a specific problem or desired outcome?
• Is there a date/deadline mentioned?

Fit (0–2)
• Does this match your ideal customer profile?
• Any constraints that make delivery difficult?

Buying signal (0–2)
• Asked about price, availability, or process?
• Responded more than once or with detail?

Commercial value (0–2)
• Estimated value: ${priceStr}
• Upsell/cross-sell opportunity?

Next action (0–2)
• Ask ONE low-friction question
• Do not dump a brochure

TOTAL: /10
7–10 = high intent • 4–6 = nurture • 0–3 = low priority`

  const nextAction = `1) Reply to "${name}" with the instant reply above (gets 1 easy question answered).
2) If no response in 3 days → Send DAY 3 follow-up: "Just checking in, ${name}..."`

  return {
    reply: instantReply,
    follow: followUp,
    qualify: qualification,
    nextAction: nextAction
  }
}
