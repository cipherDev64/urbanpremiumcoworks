// Single source of truth for business facts. Everything here is taken from
// https://urbanpremiumcoworks.com/ or supplied by the business owner.
export const SITE = {
  name: 'Urban Premium Coworks',
  url: 'https://urbanpremiumcoworks.com',
  email: 'urbanpremiumcoworks@gmail.com',
  phoneDisplay: '+91 98866 62272',
  phoneHref: 'tel:+919886622272',
  emailHref: 'mailto:urbanpremiumcoworks@gmail.com',
  address: {
    lines: ['#328, 3rd Stage, 4th Block', 'Shakthi Ganapathi Nagara', 'West of Cord Road Extension, Ward #74', 'Bengaluru, Karnataka 560079, India'],
    full: '#328, 3rd Stage, 4th Block, Shakthi Ganapathi Nagara, West of Cord Road Extension, Ward #74, Bengaluru, Karnataka 560079, India',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560079',
    country: 'IN',
    street: '#328, 3rd Stage, 4th Block, Shakthi Ganapathi Nagara, West of Cord Road Extension, Ward #74',
  },
  geo: { lat: 12.992057, lng: 77.538543 },
  tagline: 'The Future of Work is Flexible',
};
SITE.directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.address.full)}`;
SITE.mapEmbed = `https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=16&output=embed`;

export const CABINS = [
  { id: 'duo-cabin', name: 'Duo Cabin', seats: '2', seatLabel: '2 seats', teamSize: '2', text: 'For co-founders or remote partners needing a private base.' },
  { id: 'startup-studio', name: 'Startup Studio', seats: '3–4', seatLabel: '3–4 seats', teamSize: '3–4', text: 'Small team, big ideas. Perfect for early-stage ventures.' },
  { id: 'growth-pod', name: 'Growth Pod', seats: '6', seatLabel: '6 seats', teamSize: '5–6', text: 'For scaling teams that need more room for brainstorming.' },
  { id: 'enterprise-hub', name: 'Enterprise Hub', seats: '8–10', seatLabel: '8–10 seats', teamSize: '7–10', text: 'Room to expand, collaborate, and lead your department.' },
];

// Enquiry form options. `team` pre-fills team size when a workspace is chosen.
export const SPACE_OPTIONS = [
  { id: 'open-desk', label: 'Open Desk', team: 'Just me' },
  { id: 'dedicated-desk', label: 'Dedicated Desk', team: 'Just me' },
  { id: 'private-cabin', label: 'Private Cabin (not sure which size)' },
  ...CABINS.map((c) => ({ id: c.id, label: `${c.name} · ${c.seatLabel}`, team: c.teamSize })),
  { id: 'meeting-space', label: 'Meeting Space · Urban Premium Boards' },
  { id: 'not-sure', label: 'Not sure yet' },
];
export const TEAM_SIZES = ['Just me', '2', '3–4', '5–6', '7–10', 'More than 10'];
// Legacy values used by the original site's links (?space=desk / ?space=office).
export const SPACE_ALIASES = { desk: 'open-desk', office: 'private-cabin', cabin: 'private-cabin', meeting: 'meeting-space' };

export const WORKSPACES = [
  {
    slug: 'open-desks',
    spaceId: 'open-desk',
    name: 'Open Desks',
    alias: 'The Commons',
    kicker: 'Shared zone',
    seats: 'Any open spot',
    tagline: 'Just plug in and work, anywhere.',
    summary: 'Choose any open spot in our shared zone. Ideal for daily or weekly use, with all amenities included.',
    intro: 'The Commons is our open desk area, built around collaborative energy. Sit wherever suits your day, settle in, and get to work alongside other independent professionals.',
    image: 'DSC03343',
    imagePos: '50% 60%',
    hero: 'DSC03346',
    gallery: ['DSC03374', 'DSC03376', 'DSC03370', 'DSC03348'],
    includes: ['Access to common seating', 'Ideal for daily or weekly use', 'All amenities included', 'Choose any open spot in the shared zone'],
    suits: ['Freelancers', 'Remote workers', 'Solo entrepreneurs', 'Anyone who loves flexibility'],
    cta: 'Enquire about Open Desks',
    seoDescription: 'Open Desks at Urban Premium Coworks in Bengaluru: choose any open spot in a shared zone, ideal for daily or weekly use with all amenities included.',
  },
  {
    slug: 'dedicated-desks',
    spaceId: 'dedicated-desk',
    name: 'Dedicated Desks',
    alias: 'Your personal desk, every day',
    kicker: '1 seat',
    seats: '1 seat',
    tagline: 'Reserved exclusively for you.',
    summary: 'A fixed desk with storage, on a monthly plan. Designed for focus and long-term solo professionals.',
    intro: 'Arrive to the same desk every morning. A dedicated desk gives you fixed seating and storage on a monthly plan, so your workday starts without setup.',
    image: 'DSC03387',
    imagePos: '50% 50%',
    hero: 'DSC03386',
    gallery: ['DSC03365', 'DSC03381', 'DSC03395', 'DSC03379'],
    includes: ['Reserved desk, fixed seating', 'Storage', 'Monthly plans', 'Designed for focus'],
    suits: ['Long-term solo professionals', 'Anyone who wants fixed seating and storage', 'People who work best with a consistent base'],
    cta: 'Reserve a Dedicated Desk',
    seoDescription: 'Dedicated Desks at Urban Premium Coworks in Bengaluru: a reserved desk with fixed seating and storage on monthly plans, designed for focus.',
  },
  {
    slug: 'private-cabins',
    spaceId: 'private-cabin',
    name: 'Private Cabins',
    alias: 'Executive Suites · Team Sanctuaries',
    kicker: '2 to 10 seats',
    seats: '2–10 seats',
    tagline: 'Privacy without isolation.',
    summary: 'Enclosed, lockable cabins for teams of 2 to 10, with ergonomic furniture and branding options.',
    intro: 'Team Sanctuaries are enclosed cabins with seating for 2 to 10 members. Every cabin is lockable and furnished with ergonomic furniture, and branding options are available so the space feels like yours.',
    image: 'DSC03391',
    imagePos: '50% 50%',
    hero: 'DSC03390',
    gallery: ['DSC03380', 'DSC03381', 'DSC03391', 'DSC03390'],
    includes: ['Lockable private cabins', 'Ergonomic furniture included', 'Branding options available', 'Sizes from 2 to 10 seats'],
    suits: ['Co-founders and remote partners', 'Early-stage ventures', 'Scaling teams', 'Departments of larger organisations'],
    cta: 'Enquire about Private Cabins',
    seoDescription: 'Private Cabins at Urban Premium Coworks in Bengaluru: lockable team cabins from the 2-seat Duo Cabin to the 8–10 seat Enterprise Hub, with ergonomic furniture.',
  },
  {
    slug: 'meeting-rooms',
    spaceId: 'meeting-space',
    name: 'Meeting Rooms',
    alias: 'Urban Premium Boards',
    kicker: 'Presentation suites',
    seats: 'Enquire for details',
    tagline: 'State-of-the-art presentation suites.',
    summary: 'Urban Premium Boards are our state-of-the-art presentation suites for meetings and presentations.',
    intro: 'Urban Premium Boards are our state-of-the-art presentation suites. Speak with the team to discuss availability and what your meeting needs.',
    image: 'DSC03327',
    imagePos: '50% 55%',
    hero: 'DSC03331',
    gallery: ['DSC03326', 'DSC03335', 'DSC03332', 'DSC03394'],
    includes: ['Presentation suites', 'Glass-walled rooms with a boardroom table', 'Booking and availability on enquiry'],
    suits: ['Team meetings', 'Presentations', 'Anyone who needs a proper room for a conversation'],
    cta: 'Enquire about Meeting Space',
    seoDescription: 'Urban Premium Boards at Urban Premium Coworks in Bengaluru: state-of-the-art presentation suites and meeting rooms. Enquire for availability.',
  },
];

export const AMENITIES = [
  { title: 'Hyper-speed fiber', text: 'Dedicated symmetric gigabit fiber with enterprise-grade security for every user.' },
  { title: 'Fluid flexibility', text: 'Scale your space up or down monthly, with no long-term leases.' },
  { title: 'Curated community', text: 'Exclusive weekly events and workshops.' },
  { title: 'Artisan amenities', text: 'Small-batch roasted coffee, premium tea and healthy gourmet snacks, included.' },
  { title: 'Lockable private cabins', text: 'Enclosed team cabins you can lock, furnished with ergonomic furniture.' },
  { title: 'Urban Premium Boards', text: 'State-of-the-art presentation suites for meetings and pitches.' },
];

export const WHY = [
  { title: 'Flexible by design', text: 'Move between open desks, dedicated desks and cabins, and scale monthly with no long-term leases.' },
  { title: 'Privacy without isolation', text: 'Lockable cabins for teams of 2 to 10, set within a shared workspace you can step back into.' },
  { title: 'Built for focus', text: 'Ergonomic furniture, fast fiber and a calm, considered environment for silent focus and professional elevation.' },
  { title: 'A community worth joining', text: 'Weekly events and workshops, and a shared zone that brings independent professionals and teams together.' },
];

export const STEPS = [
  { title: 'Enquire', text: 'Tell us about your team and the workspace you have in mind, by form, phone or email.' },
  { title: 'Take a tour', text: 'Connect with our team to book a private tour of the workspace and see the options in person.' },
  { title: 'Choose your space', text: 'Pick an open desk, a dedicated desk, a private cabin or a meeting suite that fits how you work.' },
  { title: 'Settle in and scale', text: 'Start working, then scale your space up or down monthly as your team changes.' },
];

export const FAQS = [
  { q: 'Do I need a long-term lease?', a: 'No. You can scale your space up or down monthly, with no long-term leases.' },
  { q: 'What is included with an Open Desk?', a: 'Open Desks give you any open spot in the shared zone, ideal for daily or weekly use, with all amenities included.' },
  { q: 'What is a Dedicated Desk?', a: 'A desk reserved exclusively for you, with fixed seating and storage, on a monthly plan.' },
  { q: 'What cabin sizes are available?', a: 'Private cabins come as the Duo Cabin (2 seats), Startup Studio (3–4 seats), Growth Pod (6 seats) and Enterprise Hub (8–10 seats).' },
  { q: 'Are the private cabins really private?', a: 'Yes. Cabins are enclosed and lockable, and come with ergonomic furniture. Branding options are available.' },
  { q: 'What amenities are included?', a: 'Dedicated symmetric gigabit fiber with enterprise-grade security, small-batch roasted coffee, premium tea and healthy gourmet snacks, plus exclusive weekly events and workshops.' },
  { q: 'Do you have meeting rooms?', a: 'Yes. Urban Premium Boards are our state-of-the-art presentation suites. Get in touch to discuss availability and booking.' },
  { q: 'How much does it cost?', a: 'We don’t publish prices online. Send us an enquiry or call, and we’ll share current options for the workspace you’re interested in.' },
  { q: 'How can I visit?', a: 'Book a private tour through the enquiry form, or call +91 98866 62272 or email urbanpremiumcoworks@gmail.com.' },
];

// Homepage / gallery selections (filenames from assets/EDITED PHOTOS).
export const GALLERY = [
  { name: 'DSC03406', alt: 'Open workspace with blue and purple desk partitions facing a wall of glass and trees', ratio: 'wide' },
  { name: 'DSC03316', alt: 'Glass-fronted Urban Premium Coworks building seen through a large tree', ratio: 'tall' },
  { name: 'DSC03327', alt: 'Boardroom table with black ergonomic chairs beside a window', ratio: 'wide' },
  { name: 'DSC03381', alt: 'Window-side table with four chairs inside a glass cabin', ratio: 'wide' },
  { name: 'DSC03373', alt: 'Long white shared desk with purple and blue privacy screens', ratio: 'wide' },
  { name: 'DSC03387', alt: 'Dedicated desk with storage drawers in front of a tree-lined window', ratio: 'wide' },
  { name: 'DSC03390', alt: 'Glass-walled cabins looking across the open workspace', ratio: 'wide' },
  { name: 'DSC03335', alt: 'Meeting room with a long white table and a window onto greenery', ratio: 'wide' },
  { name: 'DSC03344', alt: 'Row of desks with blue and purple partitions and ceiling lighting', ratio: 'wide' },
  { name: 'DSC03397', alt: 'Marble-finished counter area with a small window', ratio: 'tall' },
];

export const IMAGE_ALTS = {
  DSC03410: 'Symmetrical rows of desks with blue and purple partitions in front of floor-to-ceiling glass and trees',
  DSC03406: 'Open workspace with blue and purple desk partitions facing a wall of glass and trees',
  DSC03344: 'Row of desks with blue and purple partitions and ceiling lighting',
  DSC03343: 'The Commons open desk area with rows of white desks and coloured partitions',
  DSC03346: 'Open desk area stretching toward floor-to-ceiling windows',
  DSC03348: 'Long white desks with blue and purple partitions in the open workspace',
  DSC03374: 'Shared desks with purple and blue partitions under bright ceiling panels',
  DSC03376: 'Shared desk row with ergonomic mesh chairs',
  DSC03370: 'Open desks with partitions and glass-walled rooms behind',
  DSC03365: 'Desk with a purple partition and mesh chairs near a glass door',
  DSC03379: 'Shared desks with blue and purple partitions and ergonomic chairs',
  DSC03395: 'Row of ergonomic mesh chairs at a long desk with coloured partitions',
  DSC03386: 'Single reserved desk beside a window with a tree view',
  DSC03387: 'Dedicated desk with storage drawers in front of a tree-lined window',
  DSC03381: 'Window-side table with four chairs inside a glass cabin',
  DSC03380: 'Glass-walled private cabin with a table and chairs among trees',
  DSC03390: 'Glass-walled cabins looking across the open workspace',
  DSC03391: 'Private glass cabin with a table, with the open workspace beyond',
  DSC03327: 'Boardroom table with black ergonomic chairs beside a window',
  DSC03326: 'Long white meeting table with chairs along a glass wall',
  DSC03331: 'Glass-walled meeting room with a long white table',
  DSC03332: 'Meeting room with a long table and the workspace visible through glass',
  DSC03335: 'Meeting room with a long white table and a window onto greenery',
  DSC03394: 'Long table with chairs and coloured screens leading to a glass-walled room',
  DSC03312: 'Urban Premium Coworks building with glass facade among large trees',
  DSC03316: 'Glass-fronted Urban Premium Coworks building seen through a large tree',
  DSC03319: 'Street view of the building entrance beneath a large tree',
  DSC03397: 'Marble-finished counter area with a small window',
};
