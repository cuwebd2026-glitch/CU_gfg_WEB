/**
 * Central content source for the GFG Student Chapter site.
 *
 * Per project rule "never hardcode content, drive from JSON/data":
 * every section component imports its copy/data from here instead of
 * inlining strings in JSX. Swap this for a real CMS/API later without
 * touching component code.
 */

// ---------- Shared types ----------

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface PillarItem {
  id: string;
  icon: string; // lucide icon name, mapped in component
  title: string;
  description: string;
}

export interface FeatureTabContent {
  id: string;
  label: string;
  icon: string;
  cards: { title: string; description: string }[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  status: 'upcoming' | 'past';
  category: string;
  description: string;
  image: string;
  location: string;
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  description: string;
  metric: string;
}

export interface LogoItem {
  id: string;
  name: string;
  tier?: 'platinum' | 'gold' | 'silver';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  designation: string;
  src: string;
  linkedin?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfoCard {
  id: string;
  icon: string;
  title: string;
  detail: string;
}

// ---------- Navigation ----------

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

// ---------- Hero ----------

export const heroContent = {
  eyebrow: 'Code. Connect. Conquer.',
  typingPhrases: [
    'Code. Connect. Conquer.',
    'Master DSA, One Problem at a Time',
    'Build With Geeks Who Get It',
    'From First Commit to First Offer',
  ],
  description:
    `We're the GeeksforGeeks Student Chapter at Chandigarh University — a community of geeks who'd rather debug together than debug alone. Whether you're writing your first "Hello World" or grinding LeetCode before placements, this is where you show up, code, and grow with people on the same path.`,
  stats: [
    ['1', 'Confirmed Event'],
    ['1', 'Campus Community'],
    ['3', 'Official Contact Channels'],
  ] as [string, string][],
  badges: [
    { icon: '💻', title: 'Code', desc: 'Practice-first learning' },
    { icon: '🤝', title: 'Connect', desc: 'Community over crowd' },
    { icon: '🏆', title: 'Conquer', desc: 'Compete and grow' },
    { icon: '🌱', title: 'Contribute', desc: 'Learn and give back' },
  ],
};

// ---------- Statistics ----------

export const statistics: StatItem[] = [
  { id: 'members', value: 500, suffix: '+', label: 'Active Members' },
  { id: 'events', value: 50, suffix: '+', label: 'Events Hosted' },
  { id: 'projects', value: 120, suffix: '+', label: 'Projects Shipped' },
  { id: 'mentors', value: 30, suffix: '+', label: 'Mentors & Speakers' },
];

// ---------- About ----------

export const aboutContent = {
  eyebrow: 'Who We Are',
  title: 'A Chapter Built on Code, Connection, and Conquering Goals',
  description:
    "GFG Student Chapter - CU exists for one reason: to make Chandigarh University a place where learning to code doesn't feel like a solo grind. We bring together students who want to get better at problem-solving, build things that work, and support each other while doing it — whether that's untangling a recursion bug at 1am or prepping for a placement interview together.",
  pillars: [
    {
      id: 'code',
      icon: 'BookOpen',
      title: 'Code',
      description: 'Practice-first learning. DSA, problem-solving, and real programming skill built through consistent practice, not just theory.',
    },
    {
      id: 'connect',
      icon: 'Users',
      title: 'Connect',
      description: 'A community over a crowd. Peers, seniors, and mentors who actually answer your doubts instead of just adding you to a group.',
    },
    {
      id: 'conquer',
      icon: 'Rocket',
      title: 'Conquer',
      description: 'Compete, ship, and win. From contests to hackathons to placement prep — we show up to conquer the goal, together.',
    },
    {
      id: 'contribute',
      icon: 'Code2',
      title: 'Contribute',
      description: 'Give back what you learn. Whether it is helping a junior debug or writing your first open-source PR, growth here goes both ways.',
    },
  ] as PillarItem[],
};

// ---------- Features ----------

export const featureTabs: FeatureTabContent[] = [
  {
    id: 'core',
    label: 'Core Programs',
    icon: 'Zap',
    cards: [
      { title: 'DSA Sprints', description: 'Master Data Structures and Algorithms with guided sprints and daily challenges.' },
      { title: 'Hackathons', description: 'Build innovative projects and compete with peers in exciting coding competitions.' },
    ],
  },
  {
    id: 'learning',
    label: 'Learning Paths',
    icon: 'BookOpen',
    cards: [
      { title: 'Beginner Track', description: 'Start from the fundamentals and build a strong foundation in programming.' },
      { title: 'Advanced Track', description: 'Dive deep into advanced topics and prepare for technical interviews.' },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    icon: 'Users',
    cards: [
      { title: 'Mentorship', description: 'Get guidance from experienced developers and industry professionals.' },
      { title: 'Networking', description: 'Connect with like-minded developers and build lasting relationships.' },
    ],
  },
  {
    id: 'opensource',
    label: 'Open Source',
    icon: 'Code',
    cards: [
      { title: 'Contributions', description: 'Contribute to open-source projects and make a real impact.' },
      { title: 'Projects', description: 'Build and maintain community-driven projects together.' },
    ],
  },
];

// ---------- Events ----------

export const events: EventItem[] = [
  {
    id: 'ev-coding-minds-symposium-2024',
    title: 'Coding Minds Symposium',
    date: 'Jan 23, 2024',
    status: 'past',
    category: 'Community Competition',
    description: "A joint event with Alexa Developer's Community CU built to test coding instincts under pressure — rapid-fire coding questions, logical challenges, and on-the-spot problem-solving, with GeeksforGeeks swag on the line for top performers.",
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    location: 'B4 Seminar Hall, Chandigarh University',
  },
];

// ---------- Achievements ----------

export const achievements: AchievementItem[] = [
  {
    id: 'ach-1',
    year: '2026',
    title: 'Top Student Chapter — Regional Recognition',
    description: 'Recognized among the top-performing GFG Student Chapters for community engagement.',
    metric: '#1 Regional',
  },
  {
    id: 'ach-2',
    year: '2025',
    title: '1000+ Students Mentored',
    description: 'Crossed a major milestone in one-on-one and group mentorship sessions.',
    metric: '1000+',
  },
  {
    id: 'ach-3',
    year: '2025',
    title: 'HackChapter 2.0 Launched',
    description: 'Our largest hackathon yet, with teams from 12+ colleges participating.',
    metric: '300+ builders',
  },
  {
    id: 'ach-4',
    year: '2024',
    title: 'Chapter Founded',
    description: 'Started with 20 members and a shared goal: build a real developer community.',
    metric: 'Day 1',
  },
];

// ---------- Sponsors & Partners ----------

export const sponsors: LogoItem[] = [
  { id: 's1', name: 'GeeksforGeeks', tier: 'platinum' },
  { id: 's2', name: 'DevSprint', tier: 'gold' },
  { id: 's3', name: 'CodeForge', tier: 'gold' },
  { id: 's4', name: 'CloudNine Labs', tier: 'silver' },
  { id: 's5', name: 'ByteWorks', tier: 'silver' },
  { id: 's6', name: 'StackHouse', tier: 'silver' },
];

export const partners: LogoItem[] = [
  { id: 'p1', name: 'Campus Coding Club' },
  { id: 'p2', name: 'IEEE Student Branch' },
  { id: 'p3', name: 'Google Developer Group' },
  { id: 'p4', name: 'Open Source Society' },
];

// ---------- Gallery ----------

export const galleryImages: GalleryImage[] = [
  { id: 'g1', src: 'https://lh3.googleusercontent.com/pw/AP1GczMVlg_V8ZbQcIT9eO2I5GTk-Ybv_zECCgIKZM3MfRl9wXYfrGLqfOnvv7fxS0e6rZFs8sBTlqVvg2wukzD-765OyaER8Fa18Gv15oDf6QV8MZOU7Zna=w1200-h900', alt: 'Students collaborating at a chapter hackathon', category: 'Hackathon' },
  { id: 'g2', src: 'https://lh3.googleusercontent.com/pw/AP1GczNHCqr9R2tvNA1NIiSTJMKWRsk0lJ0uTCc5cEUWUoyly0989BCRHQwVYoqQ8rXnmi5poZFVMlWr5JcRkHrEeOgiMVxBsG6efTMfhZ_cGMzJ6-dsaIVu=w1200-h900', alt: 'Workshop session with chapter students', category: 'Workshop' },
  { id: 'g3', src: 'https://lh3.googleusercontent.com/pw/AP1GczO8OapC9JpDCdvhOiXVTeZE8RfQjiwmXX0cLqPUwOQuRVZDkZ3Ep07Xcb2hn295-iCb1J9GqhJ_gih3FrhGxJkjQYnq3HkIn9am52PiLlyc2-pQ8FDJ=w1200-h900', alt: 'Speaker and audience moment from chapter event', category: 'Talk' },
  { id: 'g4', src: 'https://lh3.googleusercontent.com/pw/AP1GczMNPzgOn-yqptjJGBShUYdcrKmoZfY8yP34e3OTo2QUeZGLZqEVBfqrlGlDjdiAKlfY-rZvVqBL2PaW4P0uCgRo-2LyPKdy5n--StcHRmUKyKZ9jnoR=w1200-h900', alt: 'Community meetup snapshot', category: 'Community' },
  { id: 'g5', src: 'https://lh3.googleusercontent.com/pw/AP1GczOE-30LZhndFPsF3vuH-i9eloXQkCHvEYz3gfcd77SvfduXG1bgz1fzeMknDXBFqwVRH4E2RU3qV05VGOaqafbCRyo9V-IJYDUrMDNqPvpkh7pArGe7=w1200-h900', alt: 'Hands-on learning activity in chapter session', category: 'Workshop' },
  { id: 'g6', src: 'https://lh3.googleusercontent.com/pw/AP1GczPyhvHDaaRDG7zUIQVt990RKSvnQuIKwKgwVMZdeVNfi5fyEglPQ45EBLwm5CnOd61alUTEBYGmHCxGokZa-6XvcBkALLVBpVOlPDgDqzUalbkon60=w1200-h900', alt: 'Group photo of chapter members', category: 'Community' },
  { id: 'g7', src: 'https://lh3.googleusercontent.com/pw/AP1GczMc4k0V5dGE0OGVY6nD3kfrGDMOYZhKQEZmiQ4q4jTq3puJyEzbylMACvs24CN1A1gqGfOufV47k8vQsL5wX_EwJ99vfY6OO93UYMhrQoetz15LCko=w1200-h900', alt: 'Team working during a coding activity', category: 'Hackathon' },
  { id: 'g8', src: 'https://lh3.googleusercontent.com/pw/AP1GczPdVTMqvR7HTgAYeGoRIEBj6Q-0lgApF8xYYKmYuqgESzuvEWeh0ya42PWSobKZqvEwW2L2_y1PKCAiAnuBvBNdVorz6IvTPgQx9C3C770YcnoPqBw=w1200-h900', alt: 'Chapter event moment from stage', category: 'Talk' },
];

// ---------- Testimonials ----------

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "Leading the GFG Student Chapter has been an incredible journey. The community's passion for learning and growth is truly inspiring. Together, we're building the next generation of tech leaders.",
    name: 'Shobhit Tomar',
    designation: 'Community Lead & Founder',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    linkedin: 'https://www.linkedin.com/in/shobhit-tomar08/',
  },
  {
    quote:
      'Our DSA programs have helped hundreds of students master data structures and algorithms. The mentorship and guidance from our team makes all the difference in their coding journey.',
    name: 'Vaibhav Sharma',
    designation: 'DSA Mentor & Technical Lead',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    linkedin: 'https://www.linkedin.com/in/vaibhav-sharma-8a462a379',
  },
  {
    quote:
      'Organizing hackathons and coding competitions is my passion. Seeing students collaborate, innovate, and build amazing projects is what drives me every day.',
    name: 'Saloni Kathpal',
    designation: 'Hackathon Coordinator',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    linkedin: 'https://www.linkedin.com/in/saloni-kathpal-a155b2329',
  },
  {
    quote:
      "Open-source contributions are the backbone of innovation. I'm committed to helping students understand the importance of giving back to the community through open-source projects.",
    name: 'Sukhwinder Singh',
    designation: 'Open Source Lead',
    src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?w=400&h=400&fit=crop',
    linkedin: 'https://www.linkedin.com/in/sukhwinder-singh-682a74349',
  },
  {
    quote:
      'Empowering students through mentorship and guidance is what the GFG community is all about. Every interaction, every discussion, every project helps someone grow.',
    name: 'Husanpreet Kaur',
    designation: 'Mentorship Coordinator',
    src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=400&h=400&fit=crop',
    linkedin: 'https://www.linkedin.com/in/husanpreet-kaur-004337325',
  },
];

// ---------- Team ----------

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Ayush Singh',
    role: 'Core Team Member',
    image: '/team/ayush-singh.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-2',
    name: 'Brahamjeet Singh',
    role: 'Core Team Member',
    image: '/team/brahamjeet-singh.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-3',
    name: 'Dhrita',
    role: 'Core Team Member',
    image: '/team/dhrita.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-4',
    name: 'Gagandeep Kaur',
    role: 'Core Team Member',
    image: '/team/gagandeep-kaur.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-5',
    name: 'Husanpreet Kaur',
    role: 'Core Team Member',
    image: '/team/husanpreet-kaur.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-6',
    name: 'Kartik Karnwal',
    role: 'Core Team Member',
    image: '/team/kartik-karnwal.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-7',
    name: 'Khushi Raheja',
    role: 'Core Team Member',
    image: '/team/khushi-raheja.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-8',
    name: 'Manthan Garg',
    role: 'Core Team Member',
    image: '/team/manthan-garg.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-9',
    name: 'Pratham Pathak',
    role: 'Core Team Member',
    image: '/team/pratham-pathak.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-10',
    name: 'Ritik Sharma',
    role: 'Core Team Member',
    image: '/team/ritik-sharma.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-11',
    name: 'Rohan Dhami',
    role: 'Core Team Member',
    image: '/team/rohan-dhami.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-12',
    name: 'Saloni Kathpal',
    role: 'Core Team Member',
    image: '/team/saloni-kathpal.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-13',
    name: 'Sukhwinder Singh',
    role: 'Core Team Member',
    image: '/team/sukhwinder-singh.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
  {
    id: 'team-14',
    name: 'Vaibhav Sharma',
    role: 'Core Team Member',
    image: '/team/vaibhav-sharma.jpg',
    bio: 'Active contributor in the GFG Student Chapter community.',
    socials: {},
  },
];

export const facultyCoordinator = {
  name: 'Dr. Anjali Mehra',
  role: 'Faculty Coordinator, GFG Student Chapter',
  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop',
  bio: "Dr. Mehra has guided the chapter since its founding, championing student-led initiatives and bridging the gap between classroom theory and industry-ready skills. Her mentorship has shaped the chapter's culture of curiosity and collaboration.",
  department: 'Department of Computer Science & Engineering',
};

// ---------- FAQ ----------

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Who can join the GFG Student Chapter at CU?',
    answer: "Any student at Chandigarh University — no matter your year, branch, or how much coding experience you already have. If you're curious about code, you're in the right place.",
  },
  {
    id: 'faq-2',
    question: 'Is there a membership fee?',
    answer: 'No. Being part of the chapter is free. You just have to show up and put in the work.',
  },
  {
    id: 'faq-3',
    question: "I'm a complete beginner. Will I be lost?",
    answer: 'No. The chapter is built for people at every level — from your first line of code to competitive programming. Beginners get just as much support as advanced members.',
  },
  {
    id: 'faq-4',
    question: 'How do I actually join?',
    answer: "Follow @gfg.cu on Instagram or check the chapter's LinkedIn page for the latest recruitment drive and event announcements, or reach out directly at gfg.cu@cumail.in.",
  },
  {
    id: 'faq-5',
    question: 'Do you help with placement prep?',
    answer: 'DSA practice, problem-solving, and coding consistency are core to what the chapter is about — all things that directly help with technical interviews.',
  },
];

// ---------- Contact ----------

export const contactInfoCards: ContactInfoCard[] = [
  { id: 'c1', icon: 'Mail', title: 'Email', detail: 'gfg.cu@cumail.in' },
  { id: 'c2', icon: 'Instagram', title: 'Instagram', detail: '@gfg.cu' },
  { id: 'c3', icon: 'Linkedin', title: 'LinkedIn', detail: 'GeeksforGeeks Student Chapter - CU' },
];

// ---------- Footer ----------

export const footerLinks: Record<string, NavItem[]> = {
  Community: [
    { label: 'About Us', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ],
  Explore: [
    { label: 'Features', href: '#features' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'FAQ', href: '#faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Code of Conduct', href: '#' },
  ],
};

export const socialLinks = [
  { icon: 'Instagram', href: 'https://www.instagram.com/gfg.cu/', label: 'Instagram' },
  { icon: 'Linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'Mail', href: 'mailto:gfg.cu@cumail.in', label: 'Email' },
];
