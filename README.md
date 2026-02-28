# BizHealth AI

**BizHealth AI** is an instant, AI-powered financial health assessment tool for businesses. Enter your financial data and get a clear health score, key ratio analysis, strengths & improvement areas, and prioritised action recommendations — no accounting background required.

## Live Demo

> Deploy to Netlify or Vercel and add your URL here.

## Features

- 📊 **Financial Health Score** (0–100) powered by the Altman Z-Score model
- 📈 **Key Ratio Analysis** — Profitability, Liquidity, Leverage, and Efficiency
- ✅ **Strengths & Weaknesses** — plain-language breakdown of your financial position
- 🤖 **AI Insights** — contextual narrative summary of your results
- 📋 **Actionable Recommendations** — immediate and quarterly action items
- 📥 **Export Report** — download a text report to share with advisors or lenders

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Recharts](https://recharts.org/) for data visualisation
- [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) for form validation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```sh
# 1. Clone the repository
git clone https://github.com/gmaina254/BizHealth.git
cd BizHealth

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist/` folder.

### Preview Production Build Locally

```sh
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── assesment/      # Assessment step components (Income, Balance Sheet, Cash Flow)
│   ├── results/        # Results display components (Score, Metrics, Recommendations)
│   └── ui/             # shadcn/ui base components
├── lib/
│   ├── calculations.ts # Core financial ratio & Z-Score engine
│   └── utils.ts
├── pages/
│   ├── Landing.tsx     # Home / landing page
│   ├── Assessment.tsx  # 3-step assessment wizard
│   ├── Results.tsx     # Financial health results & report
│   └── NotFound.tsx    # 404 page
└── types/
    └── financial.ts    # TypeScript interfaces for all financial data
```

## Deployment

Deploy the `dist/` folder to any static hosting provider:

| Platform | Steps |
|----------|-------|
| **Netlify** | Drag-drop `dist/` at [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` in the project root, or connect your GitHub repo |
| **GitHub Pages** | Push `dist/` to the `gh-pages` branch |

> ⚠️ **SPA routing**: Add a rewrite rule so all paths serve `index.html`. On Netlify, create `public/_redirects` containing `/* /index.html 200`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## License

MIT
