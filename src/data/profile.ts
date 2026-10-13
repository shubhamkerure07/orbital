export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  previewImage?: string | null;
  featured?: boolean;
  highlights: string[];
}

export interface DisciplineItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  skills: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  status: string;
  location: string;
  year?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  date?: string;
}

export interface ProfileData {
  personalInfo: {
    name: string;
    fullName: string;
    initials: string;
    tagline: string;
    roleBadge: string;
    availability: string;
    location: string;
    timezone: string;
    email: string;
    phone?: string | null;
    resumeUrl?: string | null;
    /**
     * Photo URL: Currently null. When Shubham provides his personal photo later,
     * simply replace null with the path to the photo (e.g. '/profile.jpg').
     */
    photoUrl: string | null;
    bioParagraphs: string[];
    quote: string;
  };
  socialLinks: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    email?: string | null;
  };
  disciplines: DisciplineItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  /**
   * Certificates: Empty array by default.
   * If empty, the certificates section is automatically and cleanly omitted.
   */
  certificates: CertificateItem[];
  /**
   * Achievements: Empty array by default.
   * If empty, achievements are automatically and cleanly omitted.
   */
  achievements: AchievementItem[];
}

export const profileData: ProfileData = {
  personalInfo: {
    name: 'Shubham',
    fullName: 'Shubham Kerure',
    initials: 'SK',
    tagline: 'Mechatronics Engineering Student • Software & Hardware Builder',
    roleBadge: 'MECHATRONICS & SOFTWARE',
    availability: 'Available for opportunities',
    location: 'Mangalore, Karnataka, India',
    timezone: 'UTC+05:30 (IST)',
    email: 'shubhamkerure13@gmail.com',
    phone: null,
    resumeUrl: null, // Editable placeholder for when Shubham provides his resume file
    photoUrl: null, // Editable placeholder: replace with '/profile.jpg' when ready
    bioParagraphs: [
      'Mechatronics Engineering student at Mangalore Institute of Technology & Engineering (MITE). I build at the intersection of mechanical logic, embedded systems, and modern web applications.',
      'My work spans hardware and software: from closed-loop PID robotics and low-level C memory architectures to AI-powered automotive diagnostic tools with Google Gemini and interactive web audio engines.',
      'Driven by curiosity for vehicle dynamics, engine acoustics, and intelligent autonomous systems.',
    ],
    quote: 'Combining engineering hardware logic with modern software systems to build functional, real-world tools.',
  },

  socialLinks: {
    github: 'https://github.com/shubhamkerure07',
    linkedin: 'https://www.linkedin.com/in/shubham-kerure-23350938b',
    twitter: null, // Not provided
    email: 'mailto:shubhamkerure13@gmail.com',
  },

  disciplines: [
    {
      id: 'ai-diagnostics',
      number: '01',
      tag: 'AI Engineering & Full-Stack',
      title: 'Intelligent AI Diagnostics',
      description:
        'Developing practical AI applications with modern web interfaces. Leveraging LLM APIs and prompt architecture to automate complex problem triage, severity scoring, and cost estimation.',
      skills: ['Google Gemini API', 'React & TypeScript', 'Automated Triage', 'Modern Web APIs'],
    },
    {
      id: 'automotive-acoustics',
      number: '02',
      tag: 'Acoustics & Telemetry',
      title: 'Automotive Acoustics & Systems',
      description:
        'Interactive vehicle dynamics and acoustics platforms. Synthesizing powertrain acoustic models and visualizing real-time engine telemetry and mechanical specifications.',
      skills: ['Web Audio API', 'Powertrain Telemetry', 'Acoustic Synthesis', 'Engine Specs'],
    },
    {
      id: 'mechatronics-robotics',
      number: '03',
      tag: 'Robotics & Hardware',
      title: 'Autonomous Robotics & Mechatronics',
      description:
        'Engineering closed-loop autonomous machines. Designing sensor fusion arrays (IR, ultrasonic), differential drive kinematics, and PID control algorithms for real-time tracking.',
      skills: ['Arduino & C/C++', 'PID Trajectory Loops', 'Sensors & Actuators', 'Circuit Design'],
    },
    {
      id: 'embedded-systems',
      number: '04',
      tag: 'Low-Level Systems',
      title: 'Embedded Systems & C Programming',
      description:
        'Systems-level software engineering focusing on deterministic execution, manual memory allocation, custom data structures, pointers, and hardware-level communication.',
      skills: ['C & C++', 'Memory Management', 'Data Structures (DSA)', 'Bare-Metal Logic'],
    },
  ],

  projects: [
    {
      id: 'mechmate',
      title: 'MechMate — AI Automotive Diagnostic Assistant',
      category: 'AI & Full-Stack',
      description:
        'Intelligent automotive diagnostic assistant powered by Google Gemini AI. Diagnoses mechanical symptoms, categorizes safety severity, and calculates localized repair cost approximations in INR.',
      tech: ['React', 'TypeScript', 'Google Gemini API', 'Vite', 'Tailwind CSS'],
      githubUrl: 'https://github.com/shubhamkerure07/mechmate',
      liveUrl: 'https://mechmate-sigma.vercel.app',
      featured: true,
      highlights: [
        'Natural Language Symptom Triage for complex vehicle issues',
        'Safety Severity Rating distinguishing hazards from routine maintenance',
        'Localized parts and labor repair cost estimator in ₹ (INR)',
      ],
    },
    {
      id: 'rev-the-beast',
      title: 'REV-THE-BEAST — Automotive Acoustics & Telemetry',
      category: 'Automotive & Web Audio',
      description:
        'Interactive automotive sensory web platform exploring high-performance vehicle engine acoustics, mechanical powertrain specs, and exhaust telemetry.',
      tech: ['React', 'TypeScript', 'Web Audio API', 'Vite'],
      githubUrl: 'https://github.com/shubhamkerure07/REV-THE-BEAST-',
      liveUrl: null, // No live URL provided
      featured: true,
      highlights: [
        'High-displacement engine acoustic models (V8, V10, Turbocharged Inline)',
        'Real-time powertrain telemetry breakdown and technical specs',
        'Pure code Web Audio synthesis engine',
      ],
    },
    {
      id: 'neon-dash',
      title: 'Neon Dash — Cyberpunk Endless Runner & AI Bot',
      category: 'Creative Code & Canvas',
      description:
        'Fast-paced cyberpunk endless runner with procedural canvas physics, dynamic particle FX, Web Audio synthesis, and an autonomous auto-jump bot.',
      tech: ['JavaScript', 'HTML5 Canvas', 'Web Audio API', 'CSS3'],
      githubUrl: 'https://github.com/shubhamkerure07/neon-dash',
      liveUrl: null,
      previewImage: '/neon-dash.gif',
      featured: true,
      highlights: [
        'Autonomous AI Auto-Jump Bot with real-time obstacle detection',
        'Multi-layer procedural parallax cyberpunk cityscape',
        'Zero-asset dynamic Web Audio synthesizer',
      ],
    },
    {
      id: 'student-manager',
      title: 'Student Manager — Native Android App',
      category: 'Mobile Engineering',
      description:
        'Native Android application for student record management, course tracking, and GPA calculation built with modern Android architecture and Jetpack Compose.',
      tech: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Coroutines'],
      githubUrl: 'https://github.com/shubhamkerure07/student-manager',
      liveUrl: null,
      featured: false,
      highlights: [
        'Modern Material 3 declarative UI architecture',
        'Persistent local database for courses and attendance records',
        'Automatic GPA and academic milestone tracking',
      ],
    },
    {
      id: 'mite-contineo',
      title: 'MITE Contineo Enhanced — Student Portal Redesign',
      category: 'UI/UX & Web',
      description:
        'Modernized, streamlined redesign of the college academic portal with an intuitive interface, fast schedule view, and student utility integrations.',
      tech: ['TypeScript', 'React', 'CSS3', 'REST API'],
      githubUrl: 'https://github.com/shubhamkerure07/mite-contineo-webs-enhanced-version',
      liveUrl: null,
      featured: false,
      highlights: [
        'Clean mobile-first interface replacing legacy friction',
        'Fast timetable and schedule access',
        'Student utility integrations for daily academic workflows',
      ],
    },
    {
      id: 'line-follower-robot',
      title: 'Autonomous Line Following Robot',
      category: 'Robotics & Hardware',
      description:
        'Autonomous differential-drive mechatronic vehicle using IR sensor arrays and ultrasonic obstacle detection with PID trajectory correction.',
      tech: ['Arduino', 'C/C++', 'IR Sensors', 'Ultrasonic Sensors', 'Hardware'],
      githubUrl: 'https://github.com/shubhamkerure07',
      liveUrl: null,
      featured: false,
      highlights: [
        'Multi-sensor closed-loop PID control for trajectory tracking',
        'Ultrasonic obstacle avoidance and emergency stop routines',
        'Custom differential drive kinematics and motor driver interfacing',
      ],
    },
    {
      id: 'c-dsa-systems',
      title: 'Data Structures & Systems in C',
      category: 'Systems Programming',
      description:
        'Low-level systems programming in C — custom memory allocations, linked lists, trees, and hardware peripheral communications.',
      tech: ['C', 'Pointers', 'Memory Management', 'Algorithms'],
      githubUrl: 'https://github.com/shubhamkerure07',
      liveUrl: null,
      featured: false,
      highlights: [
        'Manual heap memory allocation and pointer arithmetic',
        'Optimized implementations of linked lists, binary trees, and search algorithms',
        'Clean modular compilation with zero memory leaks',
      ],
    },
  ],

  skills: [
    {
      category: 'Programming Languages',
      items: ['C', 'C++', 'Python', 'TypeScript', 'JavaScript', 'Kotlin'],
    },
    {
      category: 'Web & UI Engineering',
      items: ['React', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3', 'Web Audio API'],
    },
    {
      category: 'Mobile Development',
      items: ['Android SDK', 'Jetpack Compose', 'Kotlin Coroutines'],
    },
    {
      category: 'AI & Modern APIs',
      items: ['Google Gemini API', 'RESTful APIs', 'Prompt Engineering'],
    },
    {
      category: 'Mechatronics & Embedded',
      items: ['Arduino', 'Raspberry Pi', 'SPICE Circuit Simulation', 'Sensors & Actuators', 'PID Control'],
    },
    {
      category: 'Developer Tools & Workflow',
      items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Linux CLI'],
    },
  ],

  education: [
    {
      institution: 'Mangalore Institute of Technology & Engineering (MITE)',
      degree: 'Bachelor of Engineering in Mechatronics Engineering',
      status: 'Undergraduate Engineering Student',
      location: 'Mangalore, Karnataka, India',
    },
  ],

  // Left empty because no certificates were explicitly provided
  // The UI will cleanly hide the certificates section
  certificates: [],

  // Left empty because no achievements were explicitly provided
  // The UI will cleanly hide the achievements section
  achievements: [],
};
