/**
 * Central content source for the GFG CU Community site.
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
  sortDate?: string; // Format: YYYY-MM-DD (e.g., '2026-08-08')
  status?: 'upcoming' | 'ongoing' | 'past';
  category: string;
  description: string;
  image: string;
  location: string;
  speaker?: string;
  organizedBy?: string;
  time?: string;
  teamSize?: string;
  designation?: string;
  registrationLink?: string;
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
  src?: string;
  alt?: string;
  tier?: 'platinum' | 'gold' | 'silver';
}

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  category: "Engineering Graphics & Technology" | "Quiz Arena" | "Roboverse";
  alt: string;
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
  level: 'executive' | 'manager' | 'lead' | 'core';
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  image: string;
  bio: string;
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
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

// ---------- Hero ----------

export const heroContent = {
  eyebrow: 'Innovate. Engage. Empower.',
  affiliation: 'GFG at Chandigarh University',
  typingPhrases: [
    'Innovate. Engage. Empower.',
    'Workshops • Hackathons • Masterclasses',
    'Build DSA & Modern Tech Instincts',
    'Connecting CU Geeks with Industry Leaders',
  ],
  description:
    `We're the GFG community at Chandigarh University — a group of students who'd rather debug together than debug alone. From hands-on AI bootcamps and cybersecurity masterclasses to competitive ideathons and expert speaker sessions, this is where campus builders sharpen their skills and connect with industry leaders.`,
  universityTagline: 'Powered by Chandigarh University students who innovate, build, and lead together.',
  stats: [
    ['10+', 'Events & Workshops'],
    ['500+', 'Active Members'],
    ['1', 'United Community'],
  ] as [string, string][],
  badges: [
    { icon: '💡', title: 'Innovate', desc: 'Hackathons & ideathons' },
    { icon: '🤝', title: 'Engage', desc: 'Expert talks & bootcamps' },
    { icon: '🚀', title: 'Empower', desc: 'Peer learning & mentorship' },
    { icon: '🌐', title: 'Community', desc: 'Campus-wide tech network' },
  ],
};

export const statistics: StatItem[] = [
  {
    id: 'members',
    value: 500,
    suffix: '+',
    label: 'Active Members',
  },
  {
    id: 'events',
    value: 50,
    suffix: '+',
    label: 'Events Hosted',
  },
  {
    id: 'mentors',
    value: 30,
    suffix: '+',
    label: 'Mentors & Speakers',
  },
];

// ---------- About ----------

export const aboutContent = {
  eyebrow: 'Who We Are',
  title: 'A Chapter Built to Innovate, Engage, and Empower',
  description:
    "GFG CU Community exists to turn ideas into action across Chandigarh University. We organize high-impact hackathons, competitive ideathons, and expert bootcamps that bring campus builders together — creating a collaborative launchpad where students connect with industry leaders, build innovative projects, and grow together.",
  pillars: [
    {
      id: 'innovate',
      icon: 'Lightbulb',
      title: 'Innovate',
      description: 'Push boundaries through competitive ideathons, hands-on hackathons, and real-world project building designed to sharpen practical engineering instincts.',
    },
    {
      id: 'engage',
      icon: 'Users',
      title: 'Engage',
      description: 'Connect with industry leaders, alumni, and peers through expert speaker sessions, masterclasses, and interactive tech bootcamps across campus.',
    },
    {
      id: 'empower',
      icon: 'Rocket',
      title: 'Empower',
      description: 'Level up together through dedicated DSA tracks, collaborative peer learning, and placement-driven mentorship where no developer builds alone.',
    },
  ] as PillarItem[],
};


// ---------- Events (Actual Teammates' Data) ----------

export const events: EventItem[] = [
  {
    id: 'ev-[engineers-got-talent]',
    title: "Engineer's Got Talent",
    date: '8 September 2025',
    sortDate: '2025-09-08',
    status: 'past',
    category: 'Cultural Event',
    description: "A campus talent showcase celebrating the creativity and performances of Chandigarh University's engineering students.",
    image: '/engineers-got-talent.jpeg',
    location: 'A1 Auditorium, Chandigarh University',
    organizedBy: 'University Institute of Engineering',
  },
  {
    id: 'ev-nextgen-bootcamp-2-2026',
    title: 'NextGen Bootcamp 2.0',
    date: '13–17 April 2026',
    sortDate: '2026-04-13',
    status: 'past',
    category: 'Technical Bootcamp',
    description: 'A five-day bootcamp where technology meets insight, featuring expert sessions and practical learning opportunities.',
    image: '/nextgen-bootcamp-2.jpeg',
    location: 'C1 Seminar Hall, Chandigarh University',
    organizedBy: 'Department of Computer Science & Engineering, Final Year',
    time: '9:30 AM – 4:30 PM',
  },
  {
    id: 'ev-research-workshop-2025',
    title: 'Research Workshop',
    date: '22 August 2025',
    sortDate: '2025-08-22',
    status: 'past',
    category: 'Research Workshop',
    description: 'A research-focused workshop designed to help students turn curiosity into breakthroughs and master the art of research.',
    image: '/research-workshop.jpeg',
    location: 'C3 Seminar Hall, Chandigarh University',
    speaker: 'Dr. Abhishek Kumar',
    designation: 'Assistant Director, Chandigarh University; Senior Researcher, Universidad de Castilla-La Mancha',
    time: '9:30 AM – 4:20 PM',
  },
  {
    id: 'ev-yashoda-ai-squad',
    title: 'Yashoda AI Squad',
    date: 'Date not specified',
    sortDate: '2025-01-01',
    status: 'past',
    category: 'AI Quiz',
    description: 'An AI-focused initiative building the next generation of AI leaders under the Yashoda AI programme.',
    image: '/yashoda-ai-squad.jpeg',
    location: 'Chandigarh University',
  },
  {
    id: 'ev-code-escape-2025',
    title: 'Code Escape',
    date: '6 August 2025',
    sortDate: '2025-08-06',
    status: 'past',
    category: 'Coding Competition',
    description: 'A timed coding escape challenge where participants raced the clock to solve problems through code.',
    image: '/code-escape.jpeg',
    location: 'Chandigarh University',
  },
  {
    id: 'ev-ai-playground-roboverse-2026',
    title: 'AI Playground – RoboVerse',
    date: '26 February 2026',
    sortDate: '2026-02-26',
    status: 'past',
    category: 'Technical Workshop',
    description: 'A workshop on robotics and futuristic technology focused on building, coding, and innovating. Dive into the world of robotics and innovation with hands-on learning and real-world exploration.',
    image: '/ai-playground-roboverse.jpeg',
    location: 'B5 Seminar Hall, Chandigarh University',
    organizedBy: 'Computer Science & Engineering (Final Year)',
    time: '9:30 AM – 3:30 PM',
  },
  {
    id: 'ev-tech-edge-bootcamp-2026',
    title: 'Tech Edge Bootcamp',
    date: '6 August 2026',
    sortDate: '2026-08-06',
    status: 'past',
    category: 'Technical Workshop',
    description: 'Tech Edge Bootcamp is an industry-focused technical workshop featuring Abhisekh Dudeja, Founder & CEO of Orvo. The session provides practical insights into modern software development, AI infrastructure, and real-world engineering practices.',
    image: '/NewPoster.jpeg',
    location: 'B1 Seminar Hall, Chandigarh University',
    speaker: 'Abhisekh Dudeja',
    organizedBy: 'CSE Takshashila',
    time: '9:30 AM – 4:30 PM',
  },
  {
    id: 'ev-bharat-buildathon-ideathon-2026',
    title: 'Bharat Buildathon – Ideathon',
    date: '12 August 2026',
    sortDate: '2026-08-12',
    status: 'past',
    category: 'Ideathon',
    description: 'An innovation-driven ideathon designed to inspire students to solve real-world challenges through creativity, collaboration, and technology. Build impactful ideas that contribute towards the vision of Viksit Bharat while working in teams and presenting innovative solutions.',
    image: '/bharat-buildathon-ideathon.jpeg',
    location: 'C1 & C3 Seminar Hall, Chandigarh University',
    organizedBy: 'CSE Takshashila',
    time: '9:30 AM – 4:25 PM',
    teamSize: '3–4 Members',
    registrationLink: 'https://bharat-buildathon-cu.vercel.app/',
  },
];

// ---------- Achievements ----------

export const achievements: AchievementItem[] = [
  {
    id: 'ach-1',
    year: '2026',
    title: 'Top CU Community — Regional Recognition',
    description: 'Recognized among the top-performing GFG CU communities for community engagement.',
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
  {
    id: 's1',
    name: 'Eventeye',
    src: '/Asset%2010%20horizontal%20logo-white.png',
    alt: 'Eventeye logo',
    tier: 'platinum',
  },
  {
    id: 's2',
    name: 'Unclefab',
    src: '/2.png',
    alt: 'Unclefab logo',
    tier: 'gold',
  },
  {
    id: 's3',
    name: 'Tamboo Baba',
    src: '/Copy%20of%20TAMBOOBABA-LOGOS.png',
    alt: 'Tamboo Baba logo',
    tier: 'gold',
  },
];

export const partners: LogoItem[] = [
  { id: 'p1', name: 'Campus Coding Club' },
  { id: 'p2', name: 'IEEE Student Branch' },
  { id: 'p3', name: 'Google Developer Group' },
  { id: 'p4', name: 'Open Source Society' },
];

// ---------- Gallery ----------

export const galleryImages: GalleryImage[] = [
  {
    id: "egt-01",
    src: "/gallery/egt-01.jpg",
    thumbnail: "/gallery/thumbnails/egt-01.webp",
    title: "Engineering Graphics & Design Workshop",
    alt: "Engineering Graphics and Design Workshop",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "egt-02",
    src: "/gallery/egt-02.jpg",
    thumbnail: "/gallery/thumbnails/egt-02.webp",
    title: "Computer-Aided Design and Drafting",
    alt: "Computer-Aided Design and Drafting",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "egt-03",
    src: "/gallery/egt-03.jpg",
    thumbnail: "/gallery/thumbnails/egt-03.webp",
    title: "Engineering Visualization Masterclass",
    alt: "Engineering Visualization Masterclass",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "egt-04",
    src: "/gallery/egt-04.jpg",
    thumbnail: "/gallery/thumbnails/egt-04.webp",
    title: "Collaborative Engineering Lab Work",
    alt: "Collaborative Engineering Lab Work",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "egt-05",
    src: "/gallery/egt-05.jpg",
    thumbnail: "/gallery/thumbnails/egt-05.webp",
    title: "Drafting Standards and Prototyping Session",
    alt: "Drafting Standards and Prototyping Session",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "egt-06",
    src: "/gallery/egt-06.jpg",
    thumbnail: "/gallery/thumbnails/egt-06.webp",
    title: "Advanced CAD Modeling and Simulation",
    alt: "Advanced CAD Modeling and Simulation",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "quiz-01",
    src: "/gallery/quiz-01.jpg",
    thumbnail: "/gallery/thumbnails/quiz-01.webp",
    title: "Technical Quiz Championship",
    alt: "Technical Quiz Championship",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "quiz-02",
    src: "/gallery/quiz-02.jpg",
    thumbnail: "/gallery/thumbnails/quiz-02.webp",
    title: "Ideation and Problem Solving Round",
    alt: "Ideation and Problem Solving Round",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-01",
    src: "/gallery/robo-01.jpg",
    thumbnail: "/gallery/thumbnails/robo-01.webp",
    title: "Roboverse Autonomous Demonstration",
    alt: "Roboverse Autonomous Demonstration",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-02",
    src: "/gallery/robo-02.jpg",
    thumbnail: "/gallery/thumbnails/robo-02.webp",
    title: "Embedded Systems and Sensor Integration",
    alt: "Embedded Systems and Sensor Integration",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-03",
    src: "/gallery/robo-03.jpg",
    thumbnail: "/gallery/thumbnails/robo-03.webp",
    title: "Line Follower and Obstacle Avoidance Run",
    alt: "Line Follower and Obstacle Avoidance Run",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-04",
    src: "/gallery/robo-04.jpg",
    thumbnail: "/gallery/thumbnails/robo-04.webp",
    title: "Robotics Hardware Assembly Workshop",
    alt: "Robotics Hardware Assembly Workshop",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-05",
    src: "/gallery/robo-05.jpg",
    thumbnail: "/gallery/thumbnails/robo-05.webp",
    title: "IoT and Robotic Connectivity Demonstration",
    alt: "IoT and Robotic Connectivity Demonstration",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-06",
    src: "/gallery/robo-06.jpg",
    thumbnail: "/gallery/thumbnails/robo-06.webp",
    title: "Smart Automation and Robotic Arms Exhibition",
    alt: "Smart Automation and Robotic Arms Exhibition",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-07",
    src: "/gallery/robo-07.jpg",
    thumbnail: "/gallery/thumbnails/robo-07.webp",
    title: "Collaborative Robotics Project Review",
    alt: "Collaborative Robotics Project Review",
    description: "",
    category: "Engineering Graphics & Technology"
  },
  {
    id: "robo-08",
    src: "/gallery/robo-08.jpg",
    thumbnail: "/gallery/thumbnails/robo-08.webp",
    title: "Robo-Soccer and Combat Challenge",
    alt: "Robo-Soccer and Combat Challenge",
    description: "",
    category: "Engineering Graphics & Technology"
  }
];

// ---------- Testimonials (Executive Board Leads) ----------

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "Leading GFG CU Community has been an empowering experience. Our mission is to build a collaborative space where students transform coding curiosity into industry-ready software engineering skills through peer mentorship and hands-on workshops.",
    name: 'Akshat Goyal',
    designation: 'President',
    src: '/AkshatGoyal.jpeg',
    linkedin: 'https://www.linkedin.com/in/akshat-goyal10/?skipRedirect=true',
  },
  {
    quote:
      "Our chapter brings structure to student-led technical learning. By bridging fundamental problem-solving with high-impact hackathons, we ensure every member gets real exposure, confidence, and guidance for their engineering journey.",
    name: 'Anuradha Verma',
    designation: 'Vice President',
    src: '/AnuradhaVerma.png',
    linkedin: 'https://www.linkedin.com/in/anuradhaverma13/',
  },
  {
    quote:
      "Operational excellence is key to growing an active campus chapter. From seamless event logistics to managing inter-departmental collaborations, we aim to deliver valuable learning experiences for all tech enthusiasts.",
    name: 'Rupeshwari Kumari',
    designation: 'Vice President',
    src: '/RupeshvariKumari.png',
    linkedin: 'https://www.linkedin.com/in/rupeshwari-kumari-a27422329/',
  },
  {
    quote:
      "Community management is about creating meaningful student connections. We foster a supportive environment where juniors debug without hesitation, share project ideas, and learn directly alongside experienced seniors.",
    name: 'Kartik Karnwal',
    designation: 'Community Manager',
    src: '/KartikKaranwal.jpeg',
    linkedin: 'https://www.linkedin.com/in/kartik-karnwal-59b94828b/',
  },
  {
    quote:
      "Ensuring active student engagement and smooth event execution drives our community forward. We work relentlessly to organize expert-led masterclasses, coding bootcamps, and competitive ideathons on campus.",
    name: 'Ashutosh Saini',
    designation: 'Community Manager',
    src: '/AshutoshSaini.jpeg',
    linkedin: 'https://www.linkedin.com/in/ashutosh-saini-7419ba289/',
  },
];

// ---------- Team ----------

export const teamMembers: TeamMember[] = [
  // ==========================
  // EXECUTIVE BOARD (5)
  // ==========================
  {
    id: "team-1",
    name: "Akshat Goyal",
    role: "President",
    level: "executive",
    image: "/AkshatGoyal.jpeg",
    bio: "Leading the chapter vision and operations.",
    socials: { linkedin: "https://www.linkedin.com/in/akshat-goyal10/?skipRedirect=true" },
  },
  {
    id: "team-2",
    name: "Anuradha Verma",
    role: "Vice President",
    level: "executive",
    image: "/AnuradhaVerma.png",
    bio: "Supporting chapter growth and strategy.",
    socials: { linkedin: "https://www.linkedin.com/in/anuradhaverma13/" },
  },
  {
    id: "team-3",
    name: "Rupeshwari Kumari",
    role: "Vice President",
    level: "executive",
    image: "/RupeshvariKumari.png",
    bio: "Managing chapter administration.",
    socials: { linkedin: "https://www.linkedin.com/in/rupeshwari-kumari-a27422329/" },
  },
  {
    id: "team-4",
    name: "Kartik Karnwal",
    role: "Community Manager",
    level: "executive",
    image: "/KartikKaranwal.jpeg",
    bio: "Managing chapter finances.",
    socials: { linkedin: "https://www.linkedin.com/in/kartik-karnwal-59b94828b/" },
  },
  {
    id: "team-5",
    name: "Ashutosh Saini",
    role: "Community Manager",
    level: "executive",
    image: "/AshutoshSaini.jpeg",
    bio: "Ensuring smooth chapter execution.",
    socials: { linkedin: "https://www.linkedin.com/in/ashutosh-saini-7419ba289/" },
  },

  // ==========================
  // MANAGERS (8)
  // ==========================
  { id: "team-6", name: "Ayush Thakur", role: "Technical Lead", level: "manager", image: "/AyushThakur.jpeg", bio: "Overseeing technical projects.", socials: { linkedin: "https://www.linkedin.com/in/ayush-thakur-4504b9373/" } },
  { id: "team-7", name: "Aayushi Mishra", role: "Web Development Lead", level: "manager", image: "/Aayushi.jpeg", bio: "Planning and driving workshops.", socials: { linkedin: "https://www.linkedin.com/in/aayushi-mishra-6ab223297/" } },
  { id: "team-8", name: "Atishay Jain", role: "Event Lead", level: "manager", image: "/AtishayJain.jpeg", bio: "Leading social media & content.", socials: { linkedin: "https://www.linkedin.com/in/atishay-jain-0465aj/" } },
  { id: "team-9", name: "Brahamjeet Singh", role: "Sponsorship & Online Event Lead", level: "manager", image: "/BrahmjeetSingh.png", bio: "UI/UX and visual assets.", socials: { linkedin: "https://www.linkedin.com/in/brahamjeet-singh-31395b270/" } },
  { id: "team-10", name: "Divyanshi", role: "Graphic Lead", level: "manager", image: "/DivyanshiMaheshwari .png", bio: "Fostering member engagement.", socials: { linkedin: "https://www.linkedin.com/in/divyanshi-maheshwari-/" } },
  { id: "team-12", name: "Rashmika", role: "Media Lead", level: "manager", image: "/Rashmika_24BCY70097.jpg", bio: "Building campus partnerships.", socials: { linkedin: "https://www.linkedin.com/in/rashmika-389533342/" } },
  { id: "team-13", name: "Saloni Kathpal", role: "Anchor Lead", level: "manager", image: "/Saloni_Kathpal-24BAI70351.jpeg", bio: "Managing event logistics.", socials: { linkedin: "https://www.linkedin.com/in/saloni-kathpal-a155b2329/" } },

  // ==========================
  // LEADS / WEB DEVELOPERS (7)
  // ==========================
  { id: "team-14", name: "Shobhit Tomer", role: "", level: "lead", image: "/ShobhitTomar.png", bio: "Leading frontend & backend web.", socials: { linkedin: "https://www.linkedin.com/in/shobhit-tomar08/" } },
  { id: "team-15", name: "Bhaskar Joshi", role: "", level: "lead", image: "/BhaskarJoshi.png", bio: "Problem solving & contest prep.", socials: { linkedin: "https://www.linkedin.com/in/bhaskar-joshi-97ba3a313/" } },
  { id: "team-16", name: "Manthan Garg", role: "", level: "lead", image: "/MANTHANGARG.jpg", bio: "Mobile application development.", socials: { linkedin: "https://www.linkedin.com/in/manthan-garg-a96609325/" } },
  { id: "team-17", name: "Ritik Sharma", role: "", level: "lead", image: "/RitikSharma.jpg", bio: "Machine learning & data science.", socials: { linkedin: "https://www.linkedin.com/in/ritiksharma-tech/" } },
  { id: "team-18", name: "Rohan Dhami", role: "", level: "lead", image: "/RohanDhami.jpeg", bio: "Community open source PRs.", socials: { linkedin: "https://www.linkedin.com/in/rohan-dhami-aa288a355/" } },
  { id: "team-19", name: "Kanishk Kamboj", role: "", level: "lead", image: "/kanishkkamboj.jpeg", bio: "Security and CTF training.", socials: { linkedin: "https://www.linkedin.com/in/kanishk-kamboj-628962322/" } },
  { id: "team-20", name: "Bhavishya Pal", role: "", level: "lead", image: "/BhavishyaPal.png", bio: "Technical writing & blogs.", socials: { linkedin: "https://www.linkedin.com/in/bhavishyapal/" } },

  // ==========================
  // CORE MEMBERS
  // ==========================
  { id: "team-22", name: "Arunangshu Roy", role: "Anchor | 4th Year", level: "core", image: "/ArunangshuRoy.jpeg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/arunangshuxroy/" } },
  { id: "team-24", name: "Akshat Saini", role: "Graphics/Technical | 4th Year", level: "core", image: "/AkshatSaini.png", bio: "", socials: { linkedin: "https://www.linkedin.com/in/akshatsni/" } },
  { id: "team-25", name: "Aarna", role: "Anchor/Technical | 3rd Year", level: "core", image: "/AarnaGarg.jpeg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/aarnaagarg06/" } },
  { id: "team-25-2", name: "Dhrita", role: "Content/Video Editor | 3rd Year", level: "core", image: "/Dhrita_24BCS12803.jpg", bio: "", socials: { linkedin: "" } },
  { id: "team-26", name: "Eha Ahuja", role: "Anchor | 3rd Year", level: "core", image: "/EhaAhuja.jpeg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/eha-ahuja/" } },
  { id: "team-27", name: "Husanpreet Kaur", role: "Graphics | 3rd Year", level: "core", image: "/HusanpreetKaur.png", bio: "", socials: { linkedin: "https://www.linkedin.com/in/husanpreet-kaur-004337325/" } },
  { id: "team-28", name: "Pratham Pathak", role: "Graphics | 3rd Year", level: "core", image: "/PrathamPathak_24BCS11184.jpg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/prathampathak17/" } },
  { id: "team-29", name: "Sukhwinder Singh", role: "Management/Technical | 3rd Year", level: "core", image: "/SukhwinderSingh.jpg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/sukhwinder-singh-682a74349/" } },
  { id: "team-34-1", name: "GagandeepKaur", role: "Sponsorship/PR | 3rd Year", level: "core", image: "/GagandeepKaur.png", bio: "", socials: { linkedin: "https://www.linkedin.com/in/gagandeep-kaur-bb5b4b320/" } },
  { id: "team-31", name: "Bhumika Upveja", role: "Management | 2nd Year", level: "core", image: "/BhumikaUpveja.png", bio: "", socials: { linkedin: "https://www.linkedin.com/in/bhumikaupveja/" } },
  { id: "team-32", name: "Gurnoor Kaur", role: "Management/Graphics | 2nd Year", level: "core", image: "/GurnoorKaur.jpeg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/gurnoor-kaur14/?skipRedirect=true" } },
  { id: "team-33", name: "Khushi Raheja", role: "Sponsorship/PR Team | 2nd Year", level: "core", image: "/KhushiRaheja.jpg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/khushi-raheja-tech/" } },
  { id: "team-34-2", name: "Vaibhav Sharma", role: "Videographer | 2nd Year", level: "core", image: "/VaibhavSharma.jpeg", bio: "", socials: { linkedin: "https://www.linkedin.com/in/vaibhav-sharma-8a462a379/" } },
];

// ---------- Faculty ----------

export const facultyMembers: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. Jasneet Kaur",
    role: "Faculty Mentor",
    designation: "Head of Department (HOD)",
    department: "Department of Computer Science & Engineering",
    image : "/JasneetKaurMam.png",
    bio: "Providing strategic vision and academic guidance to empower student developers across the CSE department.",
  },
  {
    id: "fac-2",
    name: "Er. Anamika",
    role: "Faculty Advisor",
    designation: "Assistant Professor",
    department: "Department of Computer Science & Engineering",
    image : "/AnamikaMam.jpeg",
    bio: "Guiding daily operations, student initiatives, and fostering technical excellence within the chapter.",
  },
];

// ---------- FAQ ----------

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Who can join the GFG CU Community at CU?',
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
    question: 'How do I join the chapter team?',
    answer: "Click the 'Join Now' button in the navigation bar or Hero section, fill out the recruitment application form with your details and domains of interest, and our core team will review your application and reach out to you.",
  },
  {
    id: 'faq-5',
    question: 'Can beginners with no event or technical experience participate?',
    answer: 'Absolutely. All our hackathons, ideathons, workshops, and speaker sessions are open to students across all skill levels and departments. We provide mentorship, hands-on guidance, and resources to help you get started.',
  },
];

// ---------- Contact ----------

export const contactInfoCards: ContactInfoCard[] = [
  { id: 'c1', icon: 'Mail', title: 'Email', detail: 'gfg.cu@cumail.in' },
  { id: 'c2', icon: 'Instagram', title: 'Instagram', detail: '@gfg.cu' },
  { id: 'c3', icon: 'Linkedin', title: 'LinkedIn', detail: 'GFG CU Community - Chandigarh University' },
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
    { label: 'Gallery', href: '#gallery' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'FAQ', href: '#faq' },
  ],
};

export const socialLinks = [
  { icon: 'Instagram', href: 'https://www.instagram.com/gfg.cu/', label: 'Instagram' },
  { icon: 'Linkedin', href: 'https://www.linkedin.com/company/geeksforgeeks-campus-body-cu/posts/', label: 'LinkedIn' },
  { icon: 'Mail', href: 'mailto:gfg.cu@cumail.in', label: 'Email' },
];