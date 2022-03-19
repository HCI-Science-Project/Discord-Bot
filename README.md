# Discord Bot

## Overview

This is a Discord Bot created by Hwa Chong students in TypeScript to aid in student's learning of science concepts. With a wide range of commands to run, this bot can do things from posting MCQ questions to suggesting notes and resources.

## Commands

## Files

This repository has the following files:

-   README.md, the file you are currently reading
-   LICENSE, a copy of the MIT license
-   src, containing the source code for the bot

## Running the bot

Ensure:

-   Node.js: >= v16.6.0
-   You have the correct `node` packages installed (run `npm i`).
-   You have created an `.env` file in the root folder and inserted `TOKEN=<your_token>` and `PREFIX=<your_prefix>`.

### Developing

Ensure the above.

Run the following:
```sh
npm run dev
```

Lint (ESLint): 
```sh
npm run lint
# or
npm run lint -- --fix # to fix linting errors
```

Formatting (Prettier)
```sh
npm run format
```

### Running for production
Ensure the above.

Run the following:
```sh
npm run build && npm run start
```
