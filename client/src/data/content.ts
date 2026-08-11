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
  title: 'A Chapter Built on Code, Connection, and Conquering Goals',
  description:
    "GFG CU Community exists for one reason: to make Chandigarh University a place where learning to code doesn't feel like a solo grind. We bring together students who want to get better at problem-solving, build things that work, and support each other while doing it — whether that's untangling a recursion bug at 1am or prepping for a placement interview together.",
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

// ---------- Events (Actual Teammates' Data) ----------

export const events: EventItem[] = [
  {
    id: 'ev-[engineers-got-talent]',
    title: "Engineer's Got Talent",
    date: '8 September',
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
    sortDate: '13 April 2026',
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
    image: '/tech-edge-bootcamp.png',
    location: 'B1 Seminar Hall, Chandigarh University',
    speaker: 'Abhisekh Dudeja',
    organizedBy: 'CSE Takshashila',
    time: '9:30 AM – 4:30 PM',
  },
  {
    id: 'ev-cyber-security-masterclass-2026',
    title: 'Cyber Security Masterclass',
    date: '7 August 2026',
    sortDate: '2026-08-07',
    status: 'upcoming',
    category: 'Technical Workshop',
    description: 'Join us for an industry-focused cybersecurity workshop featuring Harkamal S. Learn about AI security, cloud security, cyber assurance, and real-world cybersecurity practices from an experienced industry leader.',
    image: '/cyber-security-masterclass.png',
    location: 'C1 Seminar Hall, Chandigarh University',
    speaker: 'Harkamal S.',
    designation: 'Head Cyber Assurance, C2CAS | AI Security & Cloud Security',
    organizedBy: 'CSE Takshashila',
    time: '9:30 AM – 4:30 PM',
  },
  {
    id: 'ev-bharat-buildathon-ideathon-2026',
    title: 'Bharat Buildathon – Ideathon',
    date: '12 August 2026',
    sortDate: '2026-08-12',
    status: 'upcoming',
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
  // Engineering Graphics & Technology (6 images)
  {
    id: "egt-01",
    src: "/gallery/egt-01.jpg",
    thumbnail: "/gallery/thumbnails/egt-01.webp",
    category: "Engineering Graphics & Technology",
    title: "Engineering Graphics & Design Workshop",
    description: "Students actively participating in practical Engineering Graphics and Technology sessions organized by the GFG Chandigarh University Student Chapter, promoting technical learning and collaborative problem-solving.",
    alt: "Students participating in an Engineering Graphics and Technology workshop"
  },
  {
    id: "egt-02",
    src: "/gallery/egt-02.jpg",
    thumbnail: "/gallery/thumbnails/egt-02.webp",
    category: "Engineering Graphics & Technology",
    title: "Computer-Aided Design and Drafting",
    description: "Chapter members learning to build complex 3D models and engineering graphics designs, bridging theoretical graphics principles with modern technical software tools.",
    alt: "Students drafting mechanical components in a CAD software session"
  },
  {
    id: "egt-03",
    src: "/gallery/egt-03.jpg",
    thumbnail: "/gallery/thumbnails/egt-03.webp",
    category: "Engineering Graphics & Technology",
    title: "Engineering Visualization Masterclass",
    description: "Interactive training session focusing on 3D spatial visualization, geometric projections, and technical drafting to enhance design accuracy.",
    alt: "An instructor demonstrating 3D projections on a projection screen during an engineering graphics class"
  },
  {
    id: "egt-04",
    src: "/gallery/egt-04.jpg",
    thumbnail: "/gallery/thumbnails/egt-04.webp",
    category: "Engineering Graphics & Technology",
    title: "Collaborative Engineering Lab Work",
    description: "Group of students discussing geometric modeling constraints and engineering design parameters during the hands-on lab workshop.",
    alt: "Students discussing geometric modeling constraints in groups"
  },
  {
    id: "egt-05",
    src: "/gallery/egt-05.jpg",
    thumbnail: "/gallery/thumbnails/egt-05.webp",
    category: "Engineering Graphics & Technology",
    title: "Drafting Standards and Prototyping Session",
    description: "A specialized session teaching students international drafting standards, orthographic views, and technical layout design for physical prototyping.",
    alt: "Students practicing technical drafting standards on computer systems"
  },
  {
    id: "egt-06",
    src: "/gallery/egt-06.jpg",
    thumbnail: "/gallery/thumbnails/egt-06.webp",
    category: "Engineering Graphics & Technology",
    title: "Advanced CAD Modeling and Simulation",
    description: "An advanced session showcasing complex assembly designs, stress analysis simulations, and 3D printing preparation pipelines for student projects.",
    alt: "Advanced CAD modeling project showcasing complex mechanical assemblies on a screen"
  },

  // Quiz Arena (2 images)
  {
    id: "quiz-01",
    src: "/gallery/quiz-01.jpg",
    thumbnail: "/gallery/thumbnails/quiz-01.webp",
    category: "Quiz Arena",
    title: "Technical Quiz Championship",
    description: "Participants competing in the Quiz Arena finals, showcasing quick thinking, technical knowledge, and mental agility under timed pressure.",
    alt: "Students competing during the Technical Quiz Championship"
  },
  {
    id: "quiz-02",
    src: "/gallery/quiz-02.jpg",
    thumbnail: "/gallery/thumbnails/quiz-02.webp",
    category: "Quiz Arena",
    title: "Ideation and Problem Solving Round",
    description: "Teams analyzing technical problem statements and riddles to solve algorithmic puzzles, working collaboratively to reach the top of the leaderboard.",
    alt: "A team of students consulting each other during the Quiz Arena rounds"
  },

  // Roboverse (8 images)
  {
    id: "robo-01",
    src: "/gallery/robo-01.jpg",
    thumbnail: "/gallery/thumbnails/robo-01.webp",
    category: "Roboverse",
    title: "Roboverse Autonomous Demonstration",
    description: "Students presenting innovative robotics projects during the Roboverse competition, demonstrating autonomy, custom chassis designs, and smart controls.",
    alt: "Students demonstrating an autonomous robotics project during Roboverse"
  },
  {
    id: "robo-02",
    src: "/gallery/robo-02.jpg",
    thumbnail: "/gallery/thumbnails/robo-02.webp",
    category: "Roboverse",
    title: "Embedded Systems and Sensor Integration",
    description: "A close-up demonstration of integrating microcontrollers, ultrasonic sensors, and motor driver modules to build self-routing robotic units.",
    alt: "Students tuning microcontroller parameters on a mobile robotic platform"
  },
  {
    id: "robo-03",
    src: "/gallery/robo-03.jpg",
    thumbnail: "/gallery/thumbnails/robo-03.webp",
    category: "Roboverse",
    title: "Line Follower and Obstacle Avoidance Run",
    description: "Students testing autonomous line-following algorithms and real-time obstacle avoidance routines on a custom-designed track.",
    alt: "An autonomous robot navigating a test track while students monitor its performance"
  },
  {
    id: "robo-04",
    src: "/gallery/robo-04.jpg",
    thumbnail: "/gallery/thumbnails/robo-04.webp",
    category: "Roboverse",
    title: "Robotics Hardware Assembly Workshop",
    description: "Hands-on session where students assemble motor chassis, solder electrical components, and configure wireless transceivers under mentor guidance.",
    alt: "Students assembling robotics chassis and soldering sensors in the lab"
  },
  {
    id: "robo-05",
    src: "/gallery/robo-05.jpg",
    thumbnail: "/gallery/thumbnails/robo-05.webp",
    category: "Roboverse",
    title: "IoT and Robotic Connectivity Demonstration",
    description: "Showcasing internet-of-things (IoT) integrations with robotics, allowing remote telemetry monitoring and remote cloud-based navigation control.",
    alt: "Students checking real-time robotics telemetry on a display screen"
  },
  {
    id: "robo-06",
    src: "/gallery/robo-06.jpg",
    thumbnail: "/gallery/thumbnails/robo-06.webp",
    category: "Roboverse",
    title: "Smart Automation and Robotic Arms Exhibition",
    description: "A demonstration of robotic arms and pick-and-place systems programmed to perform repetitive high-precision tasks with sub-millimeter accuracy.",
    alt: "A programmable robotic arm executing a pick-and-place task"
  },
  {
    id: "robo-07",
    src: "/gallery/robo-07.jpg",
    thumbnail: "/gallery/thumbnails/robo-07.webp",
    category: "Roboverse",
    title: "Collaborative Robotics Project Review",
    description: "Chapter members and evaluators reviewing firmware code and mechanical configurations of robots designed to solve logistics problems.",
    alt: "Evaluators reviewing firmware configurations of a custom logistics robot"
  },
  {
    id: "robo-08",
    src: "/gallery/robo-08.jpg",
    thumbnail: "/gallery/thumbnails/robo-08.webp",
    category: "Roboverse",
    title: "Robo-Soccer and Combat Challenge",
    description: "An exciting, high-energy competition testing the agility, control speed, and mechanical durability of student-built remote-controlled bots.",
    alt: "Remote-controlled robots competing in a soccer arena match"
  }
];

// ---------- Testimonials (Executive Board Leads) ----------

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "Leading GFG CU Community has been an empowering experience. Our mission is to build a collaborative space where students transform coding curiosity into industry-ready software engineering skills through peer mentorship and hands-on workshops.",
    name: 'Akshat Goyal',
    designation: 'President',
    src: 'https://media.licdn.com/dms/image/v2/D5635AQHb8JGU_pvgCg/profile-framedphoto-shrink_800_800/B56ZijKblaHkAg-/0/1755084077894?e=1786608000&v=beta&t=eQfNMm8nPspR4kVDAP11oZjcvynDwPrhWBKdjY8ucNI',
    linkedin: 'https://www.linkedin.com/in/akshat-goyal10/?skipRedirect=true',
  },
  {
    quote:
      "Our chapter brings structure to student-led technical learning. By bridging fundamental problem-solving with high-impact hackathons, we ensure every member gets real exposure, confidence, and guidance for their engineering journey.",
    name: 'Anuradha Verma',
    designation: 'Vice President',
    src: 'https://media.licdn.com/dms/image/v2/D5603AQEMvMee7ugEOA/profile-displayphoto-crop_800_800/B56Z8KoAAzGcAM-/0/1782589686380?e=1787788800&v=beta&t=8_yEh9xr1zPwD7ka81cONEkzfwVH2atdsSExEWnP0Y4',
    linkedin: 'https://www.linkedin.com/in/anuradhaverma13/',
  },
  {
    quote:
      "Operational excellence is key to growing an active campus chapter. From seamless event logistics to managing inter-departmental collaborations, we aim to deliver valuable learning experiences for all tech enthusiasts.",
    name: 'Rupeshwari Kumari',
    designation: 'Vice President',
    src: 'https://media.licdn.com/dms/image/v2/D5635AQHQHoIN2nBxkA/profile-framedphoto-shrink_800_800/B56Z5RwBrWIoAg-/0/1779488005277?e=1786608000&v=beta&t=lfp1tmtQw5HL2Oz--cOgcivIpqeo1f5j1-8xedwgC1M',
    linkedin: 'https://www.linkedin.com/in/rupeshwari-kumari-a27422329/',
  },
  {
    quote:
      "Community management is about creating meaningful student connections. We foster a supportive environment where juniors debug without hesitation, share project ideas, and learn directly alongside experienced seniors.",
    name: 'Kartik Karnwal',
    designation: 'Community Manager',
    src: 'https://media.licdn.com/dms/image/v2/D5603AQEZ4Nuq1Knztg/profile-displayphoto-crop_800_800/B56ZlQucMyI8AM-/0/1757995979089?e=1787788800&v=beta&t=aF6EhLr372IfrkOU1m2k5Q3lJW3y8hbNg7oYrZr_06Y',
    linkedin: 'https://www.linkedin.com/in/kartik-karnwal-59b94828b/',
  },
  {
    quote:
      "Ensuring active student engagement and smooth event execution drives our community forward. We work relentlessly to organize expert-led masterclasses, coding bootcamps, and competitive ideathons on campus.",
    name: 'Dhruv Saini',
    designation: 'Community Manager',
    src: 'https://media.licdn.com/dms/image/v2/D5603AQG93QdWKQ9JnQ/profile-displayphoto-crop_800_800/B56Zv6S1_3IYAI-/0/1769430804816?e=1787788800&v=beta&t=rxCsHbVzwuBTgxIHeqnQ9iBa4UK6gvkz9o58Ku17jjk',
    linkedin: 'https://www.linkedin.com/in/dhruvxdsaini/',
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
    image: "https://media.licdn.com/dms/image/v2/D5635AQHb8JGU_pvgCg/profile-framedphoto-shrink_800_800/B56ZijKblaHkAg-/0/1755084077894?e=1786608000&v=beta&t=eQfNMm8nPspR4kVDAP11oZjcvynDwPrhWBKdjY8ucNI",
    bio: "Leading the chapter vision and operations.",
    socials: { linkedin: "https://www.linkedin.com/in/akshat-goyal10/?skipRedirect=true" },
  },
  {
    id: "team-2",
    name: "Anuradha Verma",
    role: "Vice President",
    level: "executive",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEMvMee7ugEOA/profile-displayphoto-crop_800_800/B56Z8KoAAzGcAM-/0/1782589686380?e=1787788800&v=beta&t=8_yEh9xr1zPwD7ka81cONEkzfwVH2atdsSExEWnP0Y4",
    bio: "Supporting chapter growth and strategy.",
    socials: { linkedin: "https://www.linkedin.com/in/anuradhaverma13/" },
  },
  {
    id: "team-3",
    name: "Rupeshwari Kumari",
    role: "Vice President",
    level: "executive",
    image: "https://media.licdn.com/dms/image/v2/D5635AQHQHoIN2nBxkA/profile-framedphoto-shrink_800_800/B56Z5RwBrWIoAg-/0/1779488005277?e=1786608000&v=beta&t=lfp1tmtQw5HL2Oz--cOgcivIpqeo1f5j1-8xedwgC1M",
    bio: "Managing chapter administration.",
    socials: { linkedin: "https://www.linkedin.com/in/rupeshwari-kumari-a27422329/" },
  },
  {
    id: "team-4",
    name: "Kartik Karnwal",
    role: "Community Manager",
    level: "executive",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEZ4Nuq1Knztg/profile-displayphoto-crop_800_800/B56ZlQucMyI8AM-/0/1757995979089?e=1787788800&v=beta&t=aF6EhLr372IfrkOU1m2k5Q3lJW3y8hbNg7oYrZr_06Y",
    bio: "Managing chapter finances.",
    socials: { linkedin: "https://www.linkedin.com/in/kartik-karnwal-59b94828b/" },
  },
  {
    id: "team-5",
    name: "Dhruv Saini",
    role: "Community Manager",
    level: "executive",
    image: "https://media.licdn.com/dms/image/v2/D5603AQG93QdWKQ9JnQ/profile-displayphoto-crop_800_800/B56Zv6S1_3IYAI-/0/1769430804816?e=1787788800&v=beta&t=rxCsHbVzwuBTgxIHeqnQ9iBa4UK6gvkz9o58Ku17jjk",
    bio: "Ensuring smooth chapter execution.",
    socials: { linkedin: "https://www.linkedin.com/in/dhruvxdsaini/" },
  },

  // ==========================
  // MANAGERS (8)
  // ==========================
  { id: "team-6", name: "Ayush Thakur", role: "Technical Lead", level: "manager", image: "https://media.licdn.com/dms/image/v2/D4D03AQE3aEEseMrpzg/profile-displayphoto-scale_400_400/B4DZkZVAQxIEA0-/0/1757066563974?e=1787788800&v=beta&t=LuaTR891W03VUSgjd-lrsvceEiBrNp91CxkTw3PRRFI", bio: "Overseeing technical projects.", socials: {linkedin: "https://www.linkedin.com/in/ayush-thakur-4504b9373/"} },
  { id: "team-7", name: "Aayushi Mishra", role: "Web Development Lead", level: "manager", image: "/Aayushi.jpeg", bio: "Planning and driving workshops.", socials: {linkedin: "https://www.linkedin.com/in/aayushi-mishra-6ab223297/"} },
  { id: "team-8", name: "Atishay Jain", role: "Event Lead", level: "manager", image: "https://media.licdn.com/dms/image/v2/D4E03AQF5FHYKVwrzvA/profile-displayphoto-crop_800_800/B4EZfMaD1BHwAM-/0/1751481073756?e=1787788800&v=beta&t=hXlz9Py-hhmjywL3g5s-TfHW-0RKGMRtR63pU7q9hxE", bio: "Leading social media & content.", socials: {linkedin: "https://www.linkedin.com/in/atishay-jain-0465aj/"} },
  { id: "team-9", name: "Brahamjeet Singh", role: "Sponsorship & Online Event Lead", level: "manager", image: "https://media.licdn.com/dms/image/v2/D5635AQHdcEUrROrANQ/profile-framedphoto-shrink_800_800/B56Z_msNcBGcAY-/0/1786281777414?e=1787061600&v=beta&t=ypNQJH1ZrF4GjK8K0ethdg2vCbDezJH8EpdZEOFh1kI", bio: "UI/UX and visual assets.", socials: {linkedin: "https://www.linkedin.com/in/brahamjeet-singh-31395b270/"} },
  { id: "team-10", name: "Divyanshi", role: "Graphic Lead", level: "manager", image: "https://media.licdn.com/dms/image/v2/D5603AQFaFGjW6IXIhA/profile-displayphoto-scale_400_400/B56Z0rHrcaHkAg-/0/1774544929068?e=1787788800&v=beta&t=LBiuhkAfcD-_zjODOA9CQSFGGS1LYonm7xN4dm3e_1Q", bio: "Fostering member engagement.", socials: {linkedin: "https://www.linkedin.com/in/divyanshi-maheshwari-/"} },
  // { id: "team-11", name: "Jatin", role: "Content Lead", level: "manager", image: "/manager6.jpg", bio: "Handling public relations.", socials: {linkedin: ""} },
  { id: "team-12", name: "Rashmika", role: "Media Lead", level: "manager", image: "/Rashmika_24BCY70097.jpg", bio: "Building campus partnerships.", socials: {linkedin: "https://www.linkedin.com/in/rashmika-389533342/"} },
  { id: "team-13", name: "Saloni Kathpal", role: "Anchor Lead", level: "manager", image: "/Saloni_Kathpal-24BAI70351.jpeg", bio: "Managing event logistics.", socials: {linkedin: "https://www.linkedin.com/in/saloni-kathpal-a155b2329/"} },

  // ==========================
  // LEADS / WEB DEVELOPERS (7)
  // ==========================
  { id: "team-14", name: "Shobhit Tomer", role: "", level: "lead", image: "https://media.licdn.com/dms/image/v2/D5603AQEaz4vHMAKvWw/profile-displayphoto-scale_400_400/B56Z8xOA3QH4Ag-/0/1783237186980?e=1787788800&v=beta&t=braAyZbZYv-cacHHSJDvYnturJephSMQnX7UlUdrKos", bio: "Leading frontend & backend web.", socials: {linkedin: "https://www.linkedin.com/in/shobhit-tomar08/"} },
  { id: "team-15", name: "Bhaskar Joshi", role: "", level: "lead", image: "https://media.licdn.com/dms/image/v2/D5603AQFmmbzx3VmTBw/profile-displayphoto-crop_800_800/B56Z_IWzLpHYAI-/0/1785772850635?e=1787788800&v=beta&t=FmGe9xCEFHri0oCaj3XKqkvT-z1-spzX5buRdGUl9Ck", bio: "Problem solving & contest prep.", socials: {linkedin: "https://www.linkedin.com/in/bhaskar-joshi-97ba3a313/"} },
  { id: "team-16", name: "Manthan Garg", role: "", level: "lead", image: "/MANTHANGARG.jpg", bio: "Mobile application development.", socials: {linkedin: "https://www.linkedin.com/in/manthan-garg-a96609325/"} },
  { id: "team-17", name: "Ritik Sharma", role: "", level: "lead", image: "/RitikSharma.jpg", bio: "Machine learning & data science.", socials: {linkedin: "https://www.linkedin.com/in/ritiksharma-tech/"} },
  { id: "team-18", name: "Rohan Dhami", role: "", level: "lead", image: "/RohanDhami.jpeg", bio: "Community open source PRs.", socials: {linkedin: "https://www.linkedin.com/in/rohan-dhami-aa288a355/"} },
  { id: "team-19", name: "Kanishk Kamboj", role: "", level: "lead", image: "/kanishkkamboj.jpeg", bio: "Security and CTF training.", socials: {linkedin: "https://www.linkedin.com/in/kanishk-kamboj-628962322/"} },
  { id: "team-20", name: "Bhavishya Pal", role: "", level: "lead", image: "https://media.licdn.com/dms/image/v2/D5603AQGKyW-5RmZMmA/profile-displayphoto-crop_800_800/B56ZuTND1xJoAI-/0/1767701239487?e=1787788800&v=beta&t=rJSsnNEoBLct9WTuAz7saMPr8d3mkqajt3bEuw0Mx0I", bio: "Technical writing & blogs.", socials: {linkedin: "https://www.linkedin.com/in/bhavishyapal/"} },

  // ==========================
  // CORE MEMBERS
  // ==========================
  { id: "team-22", name: "Arunangshu Roy", role: "Anchor | 4th Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D5603AQGjg6KDRx8IvA/profile-displayphoto-crop_800_800/B56ZwVPK3sJoAI-/0/1769882825833?e=1787788800&v=beta&t=biDpCGROfCHadJqec2vlMYuUg3h6hWBfwBcQT0QkSyQ", bio: "", socials: {linkedin: "https://www.linkedin.com/in/arunangshuxroy/"} },
  { id: "team-24", name: "Akshat Saini", role: "Graphics/Technical | 4th Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D5603AQGcEWFoOuB2Mw/profile-displayphoto-crop_800_800/B56Z8T_1QtKgAM-/0/1782746930284?e=1787788800&v=beta&t=orxSobNvAJMM3riBtighgmfPHWwy15mk0CpZSXl2Nio", bio: "", socials: {linkedin: "https://www.linkedin.com/in/akshatsni/"} },
  { id: "team-25", name: "Aarna", role: "Anchor/Technical | 3rd Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D4E03AQFeRxc6r8TIEA/profile-displayphoto-shrink_800_800/B4EZcRXeecGQAc-/0/1748343057401?e=1787788800&v=beta&t=GHOmV5-AItymTjQ2VSVOJp2H-LLeVJaOx9ybf0gp37I", bio: "", socials: {linkedin: "https://www.linkedin.com/in/aarnaagarg06/"} },
  { id: "team-25-2", name: "Dhrita", role: "Content/Video Editor | 3rd Year", level: "core", image: "/Dhrita_24BCS12803.jpg", bio: "", socials: {linkedin: ""} },
  { id: "team-26", name: "Eha Ahuja", role: "Anchor | 3rd Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D4E03AQHAiIxRhAc8gw/profile-displayphoto-shrink_800_800/B4EZx8fR_pGsAg-/0/1771615103619?e=1787788800&v=beta&t=__K8Kys6s394CGZ8vsAoSBrhL3MsXgyHKzBpGDixqP8", bio: "", socials: {linkedin: "https://www.linkedin.com/in/eha-ahuja/"} },
  { id: "team-27", name: "Husanpreet Kaur", role: "Graphics | 3rd Year", level: "core", image: "/HusanpreetKaur.png", bio: "", socials: {linkedin: "https://www.linkedin.com/in/husanpreet-kaur-004337325/"} },
  { id: "team-28", name: "Pratham Pathak", role: "Graphics | 3rd Year", level: "core", image: "/PrathamPathak_24BCS11184.jpg", bio: "", socials: {linkedin: "https://www.linkedin.com/in/prathampathak17/"} },
  { id: "team-29", name: "Sukhwinder Singh", role: "Management/Technical | 3rd Year", level: "core", image: "/SukhwinderSingh.jpg", bio: "", socials: {linkedin: "https://www.linkedin.com/in/sukhwinder-singh-682a74349/"} },
  { id: "team-34-1", name: "GagandeepKaur", role: "Sponsorship/PR | 3rd Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D5603AQHyL1lJq9rMQQ/profile-displayphoto-crop_800_800/B56ZiHxR42G0AI-/0/1754624502662?e=1787788800&v=beta&t=TSatX-zhxXjH91xwNyz71MjAeGvCu_RfwaFXowHuhTg", bio: "", socials: {linkedin: "https://www.linkedin.com/in/gagandeep-kaur-bb5b4b320/"} },
  // { id: "team-30", name: "Ayush Singh", role: "Anchor/Sponsorship | 2nd Year", level: "core", image: "/Ayush.png", bio: "", socials: {linkedin: ""} },
  { id: "team-31", name: "Bhumika Upveja", role: "Management | 2nd Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D5603AQF1gdIFSdGUtQ/profile-displayphoto-crop_800_800/B56Z76J1HoG4AI-/0/1782313342512?e=1787788800&v=beta&t=YzK0CfJTV9XbFZ3p0X4bz2S8vfLpYJam2ylQkaVbRZM", bio: "", socials: {linkedin: "https://www.linkedin.com/in/bhumikaupveja/"} },
  { id: "team-32", name: "Gurnoor Kaur", role: "Management/Graphics | 2nd Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D5603AQHyTCq5uCHiGw/profile-displayphoto-scale_400_400/B56ZzI96K1IsAg-/0/1772898199953?e=1787788800&v=beta&t=MczY8dbzzU0iD2xO-OaFc0kFfipUZAq-rlIjjhN0flQ", bio: "", socials: {linkedin: "https://www.linkedin.com/in/gurnoor-kaur14/?skipRedirect=true"} },
  { id: "team-33", name: "Khushi Raheja", role: "Sponsorship/PR Team | 2nd Year", level: "core", image: "/KhushiRaheja.jpg", bio: "", socials: {linkedin: "https://www.linkedin.com/in/khushi-raheja-tech/"} },
  { id: "team-34-2", name: "Vaibhav Sharma", role: "Videographer | 2nd Year", level: "core", image: "https://media.licdn.com/dms/image/v2/D5603AQG7qv1By86skw/profile-displayphoto-scale_400_400/B56ZuTKStpJIAg-/0/1767700510435?e=1787788800&v=beta&t=gEWf8809t-hIf40WJnRtFZzDwglZv8iDvcINbG4i7UE", bio: "", socials: {linkedin: "https://www.linkedin.com/in/vaibhav-sharma-8a462a379/"} },
];

// ---------- Faculty ----------

export const facultyMembers: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. Jasneet Kaur",
    role: "Faculty Mentor",
    designation: "Head of Department (HOD)",
    department: "Department of Computer Science & Engineering",
    image: "https://media.licdn.com/dms/image/v2/D5603AQE_NDKt8jSL5g/profile-displayphoto-crop_800_800/B56Z5A5oyuHYAI-/0/1779205314844?e=1787788800&v=beta&t=PJNpRAgr0o1GOLjq8h-oazbvP3jymdT7S1tM21WC4OQ",
    bio: "Providing strategic vision and academic guidance to empower student developers across the CSE department.",
  },
  {
    id: "fac-2",
    name: "Er. Anamika",
    role: "Faculty Advisor",
    designation: "Assistant Professor",
    department: "Department of Computer Science & Engineering",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEC3DoXncVJjQ/profile-displayphoto-crop_800_800/B56ZxIcOXuIEAI-/0/1770741885166?e=1787788800&v=beta&t=rXbGNPH0a80U9rW_dF_-x6INi8vVx5_cBH3yZi0wu7o",
    bio: "Guiding daily operations, student initiatives, and fostering technical excellence within the chapter.",
  },
  {
    id: "fac-3",
    name: "Co-Faculty Advisor Name",
    role: "Co-Faculty Advisor",
    designation: "Assistant Professor",
    department: "Department of Computer Science & Engineering",
    image: "/placeholder.jpg",
    bio: "Supporting event execution, mentorship drives, and student chapter coordination.",
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