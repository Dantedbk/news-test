import { format } from 'date-fns';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  category: 'Technology' | 'Business' | 'Sports' | 'Art' | 'Science';
  author: User;
  publishedAt: string;
  readTime: string;
  image: string;
  summary: string;
  content: string;
  likes: number;
  comments: Comment[];
}

const users: User[] = [
  { id: 'u1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=a' },
  { id: 'u2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=b' },
  { id: 'u3', name: 'Charlie Kim', avatar: 'https://i.pravatar.cc/150?u=c' },
  { id: 'u4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=d' },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Web Development',
    category: 'Technology',
    author: users[0],
    publishedAt: new Date().toISOString(),
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1579532537902-1e50099867b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbmV3c3xlbnwxfHx8fDE3NzEwMDI1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    summary: 'Artificial Intelligence is revolutionizing how we build web applications, from automated testing to code generation.',
    content: `
      <p>Artificial Intelligence is no longer just a buzzword; it's a tool that is actively reshaping the landscape of web development. From intelligent code completion to automated testing frameworks, AI is making developers more efficient and applications more robust.</p>
      
      <h2>Automating the Mundane</h2>
      <p>One of the most significant impacts of AI is the automation of repetitive tasks. Developers can now rely on AI-powered tools to scaffold projects, write boilerplate code, and even suggest optimizations. This frees up time for creative problem-solving and architectural design.</p>
      
      <h2>Enhanced User Experiences</h2>
      <p>Beyond the codebase, AI is enabling more personalized and adaptive user interfaces. Chatbots, recommendation engines, and dynamic content generation are becoming standard features in modern web apps, providing users with a tailored experience.</p>
      
      <h2>The Road Ahead</h2>
      <p>As AI models become more sophisticated, we can expect even deeper integration. Imagine a future where an AI can take a rough sketch and turn it into a fully functional UI, or debug complex distributed systems in real-time. The future of web development is bright, and it is intelligent.</p>
    `,
    likes: 124,
    comments: [
      { id: 'c1', userId: 'u2', content: 'Great read! I really think AI will change everything.', timestamp: new Date(Date.now() - 3600000).toISOString(), likes: 5 },
      { id: 'c2', userId: 'u3', content: 'I am a bit skeptical about code generation, but testing automation is huge.', timestamp: new Date(Date.now() - 7200000).toISOString(), likes: 2 },
    ]
  },
  {
    id: '2',
    title: 'Global Markets Rally as Tech Stocks Soar',
    category: 'Business',
    author: users[1],
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1570042707495-f9162924f7fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBza3lzY3JhcGVyc3xlbnwxfHx8fDE3NzEwMDI1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    summary: 'Major indices hit record highs today as technology companies report better-than-expected earnings.',
    content: `
      <p>The stock market experienced a significant boost today, led primarily by the technology sector. Major tech giants released their quarterly earnings reports, smashing analyst expectations and driving investor confidence to new heights.</p>
      
      <h2>Tech Leading the Way</h2>
      <p>Software and hardware companies alike showed resilience in a fluctuating economy. Cloud computing revenues are up, and consumer electronics sales remain strong despite supply chain concerns.</p>
      
      <h2>Global Impact</h2>
      <p>This positive trend isn't limited to the US. European and Asian markets also saw gains, reflecting a global optimism about the post-pandemic economic recovery. Analysts predict this bullish run could continue into the next quarter.</p>
    `,
    likes: 89,
    comments: [
      { id: 'c3', userId: 'u1', content: 'About time! My portfolio needed this.', timestamp: new Date(Date.now() - 40000000).toISOString(), likes: 12 },
    ]
  },
  {
    id: '3',
    title: 'Championship Finals: A Night to Remember',
    category: 'Sports',
    author: users[2],
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1766525155813-e6375a0be54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwYWN0aW9ufGVufDF8fHx8MTc3MDg5MTMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    summary: 'The underdog team secures a historic victory in overtime, shocking fans and analysts alike.',
    content: `
      <p>In what will surely go down as one of the most exciting finals in history, the underdogs managed to clinch victory in the dying moments of overtime. The stadium was electric, and the atmosphere was nothing short of magical.</p>
      
      <h2>The Turning Point</h2>
      <p>It seemed like the favorites had it in the bag until the last quarter. A surprising tactical shift by the underdog coach caught everyone off guard, leading to a quick succession of points that tied the game.</p>
      
      <h2>Overtime Drama</h2>
      <p>Overtime was a tense affair, with both defenses holding strong. It all came down to a final play that no one saw coming. The crowd erupted as the winning point was scored, cementing this team's place in history.</p>
    `,
    likes: 342,
    comments: [
      { id: 'c4', userId: 'u4', content: 'I was there! Best game of my life.', timestamp: new Date(Date.now() - 180000000).toISOString(), likes: 45 },
      { id: 'c5', userId: 'u1', content: 'Unbelievable upset.', timestamp: new Date(Date.now() - 190000000).toISOString(), likes: 8 },
    ]
  },
  {
    id: '4',
    title: 'Modern Art Exhibition Opens Downtown',
    category: 'Art',
    author: users[3],
    publishedAt: new Date(Date.now() - 250000000).toISOString(),
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1656332693864-8a7ea5976605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1vZGVybiUyMGFydCUyMG11c2V1bXxlbnwxfHx8fDE3NzEwMDI1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    summary: 'A new gallery featuring abstract works from emerging artists is turning heads in the art world.',
    content: `
      <p>The city's cultural scene just got a major upgrade with the opening of the "Visions of Tomorrow" exhibition. Featuring works from over 20 emerging artists, the gallery explores themes of technology, nature, and identity.</p>
      
      <h2>Breaking Boundaries</h2>
      <p>The pieces on display challenge traditional mediums, incorporating digital elements, projection mapping, and interactive sculptures. It's a sensory experience that invites the viewer to participate rather than just observe.</p>
      
      <h2>Critically Acclaimed</h2>
      <p>Early reviews have been glowing, with critics praising the bold curation and the diverse range of voices represented. The exhibition runs through the end of the month and is expected to draw record crowds.</p>
    `,
    likes: 67,
    comments: []
  }
];

export const currentUser: User = users[0];
