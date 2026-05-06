# Chef Recipe Station 🍳

A professional, interactive recipe management and viewing station built with [Symbols.app](https://symbols.app/) and [DOMQL](https://domql.com/). This application allows chefs and home cooks to view recipes with dynamic scaling, unit conversions, and a step-by-step interactive guide.

## 🏗️ Project Architecture & Problem Solved

Traditional recipe sites often struggle with static content that doesn't adapt to the user's needs (e.g., changing serving sizes or switching between Metric and Imperial units). **Chef Recipe Station** solves this by leveraging a reactive state-driven architecture.

Built on the **Symbols/DOMQL v3** framework, the application utilizes:
- **Reactive State Management**: Real-time updates to ingredient quantities and UI states.
- **Atomic Design System**: A consistent, token-based design system for typography, colors, and spacing.
- **Component-Based UI**: Highly reusable objects that extend base Symbols elements like `Flex`, `Grid`, and `Button`.
- **Declarative Logic**: Functional properties that respond to state changes (e.g., `text: (el, s) => ...`).

## ✨ Features & Use Cases

- **Dynamic Ingredient Scaling**: Adjust the target yield (portions) using simple controls. All ingredient quantities update instantly based on the recipe's base yield.
- **Unit System Toggle**: Seamlessly switch between **US (Imperial)** and **Metric** units. The application handles conversions for common units like cups to ml and oz to g.
- **Interactive Step-by-Step Instructions**: A "Instruction Stepper" that highlights the current step and allows users to navigate through the cooking process.
- **Smart Ingredient Checklist**: Ingredients can be marked as "checked" or "complete" as they are prepared, with visual feedback (opacity and strike-through).
- **Responsive "Two-Pane" Layout**: A layout optimized for both large kitchen displays and mobile devices, ensuring recipes are easy to read anywhere.
- **Auto-Formatting**: Quantities are automatically formatted into human-readable fractions (e.g., 1/2, 3/4) for better usability.

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Global Dependencies**:
  - `smbls` CLI: Install via `npm install -g smbls` (optional, can be run via `npx`)

## 🚀 Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/allenbrokeit/Recipe-Station.git
   cd Recipe-Station
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory if you plan to integrate with external services (like Supabase, which is listed in dependencies):
   ```env
   SUPABASE_URL=[INSERT SUPABASE URL HERE]
   SUPABASE_KEY=[INSERT SUPABASE KEY HERE]
   ```

## 🏃 Running the Application

### Development Mode
To start the local development server with hot-reloading:
```bash
npm start
```
The application will typically be available at `http://localhost:1234` (or as specified by the Parcel/Symbols CLI).

### Production Build
To create an optimized production bundle:
```bash
npm run build
```

### Deployment
To deploy the application to your configured target (Symbols, Cloudflare, Vercel, etc.):
```bash
npm run deploy
```

## 🧪 Testing

The project includes a suite of integration and unit tests using **Puppeteer** and **jsdom**.

### Running Integration Tests
To run the browser-based integration tests (ensure the dev server is running first):
```bash
node test_browser.js
```

### Unit Tests
Individual components and logic can be tested using the provided test scripts:
- `node test_metric.js`: Verifies unit conversion logic.
- `node test_ingredients.js`: Tests ingredient scaling and formatting.
- `node test_reactivity.mjs`: Ensures state updates trigger UI changes.

## 📂 Data Management

The application's recipe data is stored in `symbols/recipes.js`. You can refresh or update the recipe list by running the data fetching script:

```bash
node fetch_recipes.mjs
```
This script pulls recipe data from external sources, parses ingredient strings into structured objects, and updates the local data file.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

**GitHub Project URL**: [https://github.com/allenbrokeit/Recipe-Station](https://github.com/allenbrokeit/Recipe-Station)
