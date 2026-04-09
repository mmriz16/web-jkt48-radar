# JKT48 Radar

JKT48 Radar is a real-time dashboard for monitoring JKT48 member activities across multiple live streaming platforms. Built with Next.js, it provides an all-in-one interface for fans to stay connected with their favorite JKT48 members.

## Features

- Real-time Live Streaming Updates: Monitor JKT48 members live on Showroom and IDN platforms
- Multi-Viewer Support: Watch multiple streams simultaneously
- Member Profiles: Access detailed member information and photos
- Theater Schedules: Stay updated with upcoming theater performances
- Event Tracking: Never miss JKT48 events and announcements
- News Feed: Get the latest JKT48 news and updates
- Background Removal: Automatic member photo cutout generation for clean displays
- Responsive Design: Optimized for desktop and mobile viewing

## Tech Stack

- Framework: Next.js 16 with App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Image Processing: @imgly/background-removal-node
- Fonts: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- API key for JKT48 data services

### Installation

1. Clone the repository:
git clone https://github.com/mmriz16/web-jkt48-radar.git
cd web-jkt48-radar

2. Install dependencies:
npm install

3. Create a .env.local file and add your API key:
API_KEYS=your_api_key_here

4. Run the development server:
npm run dev

5. Open http://localhost:3000 in your browser

## API Endpoints

/api/live-feed - Returns real-time live streaming data from Showroom and IDN platforms.
/api/member-cutout - Processes member photos with automatic background removal for clean cutout images.

## Scripts

npm run dev - Start development server
npm run build - Build for production
npm run start - Start production server
npm run lint - Run ESLint

## Credits

- JKT48 Official: https://jkt48.com
- Showroom: https://www.showroom-live.com
- IDN: https://www.idn.app

Built with love for JKT48 fans
