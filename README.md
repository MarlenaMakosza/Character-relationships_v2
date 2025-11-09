# Character_relationships

## How to run

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

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

## About the Author

If you’d like to see more of my work, feel free to visit my personal website:  
👉 [https://marlenamakosza.com](https://marlenamakosza.com)
