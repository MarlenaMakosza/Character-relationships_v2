# Character_relationships

## How to run

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), run the following to generate SvelteKit internals (required before first run and after cloning):

```bash
npm run check
```

Then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Run database and connect

```bash
db:start - to start the docker container
db:migrate
```

OR

Go to package.json and right click on script and run script.

#### Linux

When you use Linux and IDE like Code or WebStorm - like above - run script from IDE.

#### ENV

.env - use .env.example - and change or leave default login credentials.

## Documentation

All documentation lives in the `docs/` folder — architecture (arc42), decision records (ADRs), and diagrams.

### Architecture docs (VitePress)

Human-written docs rendered as a navigable site:

```bash
npm run docs:dev       # dev server with hot reload
npm run docs:build     # build static site
npm run docs:preview   # preview the build
```

### API reference (TypeDoc)

Generated from source — not committed to the repository. Deployed automatically to GitHub Pages on push to `main`.

To generate locally:

```bash
npm run docs:api
```

Output: `docs/api_docs/public` (public API) and `docs/api_docs/internal` (full, including internals).

To preview after generation:

```bash
npx http-server docs/api_docs/public
```

## About app

Small project drawing relationships between characters.

Now is very simple version.

### Roadmap

- forms to add characters and relationships
- editing characters and relationships
- individual pages for every character
- individual graphs relation for every character (example: Main character have relation with him, him and him)
- family tree
- and more (someday I will write)

## 👩‍💻 Author

Made by [Marlena Makosza](https://marlenamakosza.com)
