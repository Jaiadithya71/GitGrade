# GitGrade

An intelligent GitHub repository analyzer powered by Google's Gemini AI. Simply input a GitHub repository URL and receive a comprehensive analysis including code quality scoring, strengths, weaknesses, and a personalized development roadmap.

## Features

- **AI-Powered Analysis**: Uses Google Gemini 2.5 Flash to analyze repository structure, README, package.json, and codebase
- **Quality Scoring**: Get a 0-100 score rating the repository quality with skill level classification (Beginner/Intermediate/Advanced)
- **Detailed Insights**: 
  - Strengths and weaknesses analysis
  - Development roadmap with prioritized recommendations (High/Medium/Low priority)
  - Key repository metrics (stars, forks, language, open issues)
- **Beautiful Dashboard**: Interactive visualization with radial gauges and detailed results display
- **Public & Private Repos**: Support for both public and private repositories with optional GitHub token

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts (for score visualization)
- **Icons**: Lucide React
- **AI**: Google Generative AI SDK (@google/generative-ai)

## Getting Started

### Prerequisites
- Node.js 16+ or Node.js 18+
- A Google Gemini API key (get one free at [Google AI Studio](https://aistudio.google.com/app/apikey))
- (Optional) GitHub personal access token for analyzing private repositories or avoiding rate limits

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/GitGrade.git
   cd GitGrade
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```
   
   **Important**: The environment variable must be prefixed with `VITE_` for Vite to expose it to the client.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173))

## Usage

1. Enter a GitHub repository URL in the format: `https://github.com/owner/repository`
2. (Optional) Click "Add GitHub Token" and provide a GitHub personal access token for:
   - Analyzing private repositories
   - Avoiding GitHub API rate limits on public repos
3. Click "Analyze Repo" and wait for the analysis to complete
4. View comprehensive analysis results including:
   - Overall score (0-100)
   - Skill level assessment
   - Executive summary
   - Strengths and weaknesses
   - Personalized improvement roadmap

## Building for Production

```bash
npm run build
npm run preview
```

The production build will be output to the `dist/` directory.

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── RepoInput.tsx    # Repository URL input form
│   │   ├── ResultsDashboard.tsx  # Main results display
│   │   ├── ScoreGauge.tsx   # Radial score visualization
│   │   └── HowItWorksModal.tsx   # Information modal
│   ├── services/            # API integrations
│   │   ├── github.ts        # GitHub API data fetching
│   │   └── gemini.ts        # Gemini AI analysis
│   ├── App.tsx              # Main application component
│   ├── types.ts             # TypeScript type definitions
│   └── index.tsx            # Application entry point
├── .env                     # Environment variables (create this)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## How It Works

1. **Fetch Repository Data**: Uses GitHub API to retrieve metadata, file tree structure, README content, and package.json
2. **Pre-process Content**: Filters and structures data (up to 300 files) to provide AI with comprehensive project context
3. **Gemini AI Analysis**: Google's Gemini 2.5 Flash model analyzes code patterns, structure, and documentation against industry best practices
4. **Generate Insights**: Compiles results into a comprehensive scorecard with actionable improvement steps

## Environment Variables

- `VITE_API_KEY` - Your Google Gemini API key (required)

## API Rate Limits

- **GitHub API**: Unauthenticated requests are limited to 60 per hour. Use a GitHub token to increase this to 5,000 per hour.
- **Gemini API**: Free tier includes generous limits. Check [Google AI Studio](https://ai.google.dev/pricing) for current pricing.

## Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests to improve GitGrade
- Share feedback and suggestions

## License

This project is open source and available under the MIT License.

## Troubleshooting

### "API key is missing" error
- Ensure your `.env` file exists in the project root
- Verify the variable is named `VITE_API_KEY` (not `API_KEY`)
- Restart the dev server after creating/modifying `.env`

### GitHub API rate limit exceeded
- Add a GitHub personal access token in the optional token field
- Create a token at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

### Module not found errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again