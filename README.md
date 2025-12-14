# GitGrade

An intelligent GitHub repository analyzer powered by Google's Gemini AI. Simply input a GitHub repository URL and receive a comprehensive analysis including code quality scoring, strengths, weaknesses, and a personalized development roadmap.

## Features

- **AI-Powered Analysis**: Uses Google Gemini to analyze repository structure, README, package.json, and codebase
- **Quality Scoring**: Get a 0-100 score rating the repository quality with skill level classification (Beginner/Intermediate/Advanced)
- **Detailed Insights**: 
  - Strengths and weaknesses analysis
  - Development roadmap with prioritized recommendations
  - Key repository metrics (stars, forks, language, issues)
- **Beautiful Dashboard**: Interactive visualization with gauges and detailed results display
- **Public & Private Repos**: Support for both public and private repositories with optional GitHub token

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Google Gemini API

## Getting Started

### Prerequisites
- Node.js 16+
- A Google Gemini API key (get one at [ai.google.dev](https://ai.google.dev))
- (Optional) GitHub personal access token for analyzing private repositories

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jaiadithya71/GitGrade.git
   cd GitGrade
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a GitHub repository URL (e.g., `https://github.com/facebook/react`)
2. Optionally provide a GitHub token for private repository access
3. Click "Analyze Repository"
4. View comprehensive analysis results with score, insights, and recommendations

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
├── components/          # React components
│   ├── Header.tsx
│   ├── RepoInput.tsx
│   ├── ResultsDashboard.tsx
│   ├── ScoreGauge.tsx
│   └── HowItWorksModal.tsx
├── services/           # API integrations
│   ├── github.ts       # GitHub API fetching
│   └── gemini.ts       # Gemini AI analysis
├── App.tsx
├── types.ts            # TypeScript interfaces
└── index.tsx
```

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to improve GitGrade.

## License

This project is open source and available under the MIT License.