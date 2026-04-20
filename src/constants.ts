import { Internship, Photo, Movie } from './types';

export const INTERNSHIPS: Internship[] = [
  {
    id: 'tiktok',
    company: 'ByteDance TikTok',
    role: 'Germany Content Product Ops',
    period: '2023 - 2024',
    highlights: [
      '2026 Milan Winter Olympics Ops',
      'Intent decomposition for athlete needs',
      'Proposed "Card + Wiki + Video" integration'
    ],
    results: [
      { label: 'Agent Efficiency', value: '+30%' },
      { label: 'Intent Accuracy', value: '59%' }
    ],
    details: 'Leveraging AIGC tools to build automated content pipelines.'
  },
  {
    id: 'audi',
    company: 'Audi (China)',
    role: 'Project Management (PMO)',
    period: '2022 - 2023',
    highlights: [
      'Standardized project version control',
      'Designed "Async-Sync" collab mechanism',
      'Cross-timezone PMO specialist'
    ],
    results: [
      { label: 'Flow Efficiency', value: '+30%' },
      { label: 'Prep Time', value: '-20%' }
    ],
    details: 'Coordinating global teams for high-stakes automotive projects.'
  },
  {
    id: 'fastmoss',
    company: 'FastMoss',
    role: 'Germany Product Growth',
    period: '2023',
    highlights: [
      'UI localization for DACH region',
      'A/B testing for ad copy verification'
    ],
    results: [
      { label: 'CTR Increase', value: '+15%' }
    ],
    details: 'Driving growth through data-backed localization strategies.'
  }
];

export const PHOTOS: Photo[] = [
  { url: 'https://images.unsplash.com/photo-1590001158193-790411985c8e?auto=format&fit=crop&q=80&w=2670', title: 'Tradition & Flight', location: 'Fujian Temple' }, // 1: Plane over temple
  { url: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=2670', title: 'Lone Fisherman', location: 'Open Sea' }, // 2: Boat on sea
  { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=2670', title: 'Coastal Sanctuary', location: 'Xiamen Shore' }, // 3: Building on beach
  { url: 'https://images.unsplash.com/photo-1524311583145-d359339e18d6?auto=format&fit=crop&q=80&w=2670', title: 'Hidden Village', location: 'Yunnan Aerial' }, // 4: Aerial village
  { url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2670', title: 'Emerald Drifting', location: 'Guilin River' }, // 5: Boat on green water
  { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2670', title: 'The Great Veil', location: 'Anshun Waterfall' }, // 6: Waterfall
  { url: 'https://images.unsplash.com/photo-1520630733302-36fed8704257?auto=format&fit=crop&q=80&w=2670', title: 'Winding Essence', location: 'Grand Canyon' } // 7: Winding road
];

// Note: Using placeholder images for these as they are specific to a demo.
export const MOVIES: Movie[] = [
  { 
    year: 1999, 
    title: '我的父亲母亲', 
    role: 'The Road Home', 
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2670&auto=format&fit=crop',
    description: '章子怡的成名作，讲述了一段纯真赤诚的爱情故事。她在片中饰演的招娣纯朴而热烈。',
    descriptionEn: "Zhang Ziyi's breakout film, telling a tale of pure and sincere love. She plays Zhao Di, a simple yet passionate village girl."
  },
  { 
    year: 2000, 
    title: '卧虎藏龙', 
    role: 'Crouching Tiger, Hidden Dragon', 
    image: 'https://plus.unsplash.com/premium_photo-1673240367018-9bdaccddaa46?q=80&w=2670&auto=format&fit=crop'
  },
  { 
    year: 2005, 
    title: '艺伎回忆录', 
    role: 'Memoir of the Geisha', 
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2670&auto=format&fit=crop',
    description: '根据同名小说改编，章子怡饰演的小百合在艰难岁月中蜕变为名动一时的艺伎。',
    descriptionEn: "Based on the bestselling novel, Zhang plays Sayuri, who transforms into a renowned geisha during difficult times."
  },
  { 
    year: 2013, 
    title: '一代宗师', 
    role: 'The Grandmaster', 
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2670&auto=format&fit=crop'
  }
];
