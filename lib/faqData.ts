import type { FAQItem } from './types'

export const FAQ_TABS = [
  { id: 'general',       label: 'General' },
  { id: 'rehab',         label: 'Rehab' },
  { id: 'training',      label: 'Training' },
  { id: 'performance',   label: 'Performance' },
  { id: 'physiotherapy', label: 'Physiotherapy' },
]

export const ALL_FAQS: Record<string, FAQItem[]> = {
  general: [
    { num: '01', q: 'How do I book a consult?',               a: 'Use the booking form on the site. Choose your service, preferred coach and time, then submit. We confirm your slot and arrange payment within 2 hours.' },
    { num: '02', q: 'Where are you located?',                  a: 'Rebuilt Academy operates at three Core Collective locations in Singapore: Robinson (120 Robinson Rd), Dempsey (27A Loewen Rd) and Katong (i12 Katong, 112 East Coast Rd).' },
    { num: '03', q: 'What are your hours?',                    a: 'Monday to Friday, 7am to 9pm. Saturday, 8am to 2pm. Closed Sunday.' },
    { num: '04', q: 'What payment methods do you accept?',     a: 'PayNow and card. Payment is arranged after your booking is confirmed, not upfront on the site.' },
    { num: '05', q: 'What is the cancellation policy?',        a: 'Cancel or reschedule at least 12 hours before your timeslot and there is no charge. If you miss a session without notice, that session is forfeited. To reschedule, message us on WhatsApp or email.' },
    { num: '06', q: 'How do I know which service is right for me?', a: 'If you are coming back from injury or surgery, start with Rehab. If you want to get stronger, leaner or fitter, start with Training. If you play sport competitively, look at Performance. If you have pain or need clinical assessment, book Physiotherapy. Still unsure? Book a consult and we will work it out together.' },
  ],
  rehab: [
    { num: '01', q: 'Do I need a referral or a scan first?',                      a: 'No referral or scan needed. We can work from any notes you have, but most clients come in directly and we carry out our own assessment first.' },
    { num: '02', q: 'Can you work with my physiotherapist or surgeon?',            a: 'Yes, and we encourage it. We can liaise with your clinician, share session notes and adjust the programme based on their input at any point.' },
    { num: '03', q: 'How soon after surgery can I start?',                        a: 'For most surgeries, non-affected work can begin within days. We have worked with clients from week one post-ACL, shoulder repair and hip replacement.' },
    { num: '04', q: 'What should I bring to a session?',                          a: 'Comfortable training clothes and trainers. If you have clinic letters, discharge notes or scan results, bring those too. They help us calibrate the programme.' },
    { num: '05', q: 'Can I start while still seeing a government physiotherapist or specialist?', a: 'Yes. We work alongside external clinicians regularly. Share your discharge notes or clinic letters and we will align the programme with whatever restrictions or guidelines they have given you.' },
  ],
  training: [
    { num: '01', q: 'How often should I train each week?',     a: 'Two to three sessions per week works for most people. We factor in your recovery, schedule and what you are already doing when we write the programme.' },
    { num: '02', q: 'Do I need gym experience to start?',      a: 'No. We have coached complete beginners through to competitive athletes. The first few sessions cover the basics so everything that follows is built on solid ground.' },
    { num: '03', q: 'Can we train around an old injury?',      a: 'Almost always yes. Old injuries are factored in from the start. Often they are a reason to train, not a reason not to.' },
    { num: '04', q: 'What session formats are available?',     a: 'We offer one-to-one sessions, pairs (two people sharing a coach) and small groups of three to five. Pricing differs per format. Check the Training page for current rates.' },
  ],
  performance: [
    { num: '01', q: 'How is this different from personal training?', a: 'Performance work is built around testing at both ends so improvement is measurable. The focus is speed, power and conditioning for sport, not general fitness.' },
    { num: '02', q: 'What do you actually test?',                    a: 'Sprint speed over 10 and 30 metres, vertical and horizontal power, single-leg strength and sport-specific conditioning. All retested at the end of the block.' },
    { num: '03', q: 'Can you work with my club coach?',              a: 'Yes. We can share session data and loading parameters, and time the programme around your team schedule.' },
    { num: '04', q: 'Do I need to be at a certain level?',           a: 'No minimum. We have worked with recreational athletes and national-level competitors. The programme is calibrated to where you start.' },
    { num: '05', q: 'Which block should I start with?',              a: 'If you have an upcoming season, start with Pre-season. If you are mid-competition, look at In-season. If you have just finished a season, Post-season is the right fit. Not sure? Book a consult and we will advise.' },
    { num: '06', q: 'Are instalment plans available?',               a: 'Yes. Pre-season and Post-season blocks can be paid in two monthly instalments. Pre-season (SGD 2400 total) is 2 × SGD 1200 per month. Post-season (SGD 4320 total) is 2 × SGD 2160 per month. In-season is already billed monthly.' },
  ],
  physiotherapy: [
    { num: '01', q: 'How does the partnership with Rehab & Beyond work?', a: 'Rebuilt Academy works in partnership with Rehab & Beyond, a registered physiotherapy clinic. You book through us, sessions take place at Core Collective, and both teams share notes so your physiotherapy treatment and your training stay aligned.' },
    { num: '02', q: 'Do I need a referral or a scan before booking?',     a: 'No referral needed. You can come in directly. If you have existing scan results, clinic letters or discharge notes, bring them and they will be used to calibrate your treatment.' },
    { num: '03', q: 'What conditions do you treat?',                      a: 'Sports injuries, post-surgical rehab, musculoskeletal pain and return-to-sport cases. This includes ACL reconstructions, shoulder instability, back pain, hip issues and general soft tissue problems.' },
    { num: '04', q: 'How much does a physiotherapy session cost?',         a: 'A 45-minute session is SGD 200 and a 60-minute session is SGD 250. Rates are set by Rehab & Beyond.' },
    { num: '05', q: 'Can I claim insurance for my session?',               a: 'Yes, as long as you have a doctor\'s referral. Check whether your insurance policy names a specific physiotherapy clinic. Some providers require you to use their preferred clinic. Confirm with your insurer before booking.' },
    { num: '06', q: 'Can my physiotherapist and my coach work together?',  a: 'Yes, and this is exactly the point of the partnership. Session notes are shared between the physiotherapist and the Rebuilt Academy coaching team so nothing falls through the gap between clinic and gym.' },
  ],
}
