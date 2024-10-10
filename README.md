
# Esbuild MPA Bundler

A setup for building multi-page applications (MPA) with Esbuild, providing a minimal yet efficient workflow for bundling assets and handling multiple entry points with HTML, SCSS, and Vue components. This project was built as an extension of a fun side project, so please use it at your own risk. Maintenance will be handled on a whim, and updates may happen sporadically.

## Features

- **Esbuild**: Ultra-fast bundling and minification for JavaScript, TypeScript, and CSS.
- **SCSS**: Modular and reusable stylesheets with SCSS preprocessing.
- **Vue Components**: Integration of Vue single-file components (SFCs) within a multi-page setup.
- **Multipage Support**: Build separate HTML pages with distinct JavaScript and CSS bundles.
- **Proxy Setup**: Use `env.mjs` to configure a proxy for external files, enabling smooth API access and handling external resources during local development.
- **Linting & Formatting**: Preconfigured ESLint, Stylelint, Markuplint and Prettier for consistent code quality.
- **Custom Build Process**: Tailored scripts for compiling, copying assets, and environment configuration.
- **Image Optimization**: Automatically optimize images during the build process (`npm run dev` and `npm run build`). It converts images to WebP format when applicable, and replaces the image paths accordingly, improving load times and reducing file sizes without manual intervention.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HadohhhKen/esbuild-mpa-bundler.git
   cd esbuild-mpa-bundler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the dev process:
   ```bash
   npm run dev
   ```

4. Run the build process:
   ```bash
   npm run build
   ```

5. Preview the build output:
   ```bash
   npm run preview
   ```

6. Run the diff process:
   ```bash
   npm run diff
   ```

## Directory Structure

- `public/`: Contains HTML templates and static assets.
- `src/`: Main source directory for JavaScript, SCSS, and Vue components.
  - `assets/`: Organizes styles, scripts, and Vue components.
  - `js/`: TypeScript and Vue component logic.
  - `css/`: SCSS for styling different parts of the app.
- `build-process/`: Custom build scripts used for processing assets.
  
## Scripts

- `npm run dev`: Runs the development build with auto-reloading enabled.
- `npm run build`: Runs the complete build process.
- `npm run preview`: Serves the built assets for local development.
- `npm run diff`: Compares current build output to the previous one using diff.mjs to show the differences.

## Linting & Formatting

This project is pre-configured with linting and formatting tools to ensure consistent code quality:

- **ESLint**: For linting JavaScript/TypeScript code.
- **Stylelint**: For linting SCSS stylesheets.
- **Markuplint**: For linting HTML code.
- **Prettier**: For automatic code formatting.

## License

This project is licensed under the MIT License.
