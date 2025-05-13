# Recipe Book

Built to catalog all the recipes my partner and I have cooked and enjoyed - without the nonsense.

Various recipe website are either behind a paywall, clogged by advertisements, and/or include endless paragraphs of drivel for SEO purposes.
We just wanted a place to store our favourite recipes, so they're easy to find and come back to.

Able to automatically pull recipe details from a recipe website's SEO metadata and JSON-LD content.

![image](https://github.com/user-attachments/assets/8686d847-a012-4f8b-88de-3af21e41847b)

**Autofill recipe details at the click of a button!**

https://github.com/user-attachments/assets/ac92a323-2100-4fe3-b25e-9b281cd2589f

**Generate a recipe using AI!**

Also includes a fun AI powered recipe generator using [Mistral AI](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3).

Uses the following prompt:

`You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Your response should be in the format of JSON with the following properties: title (string), description (string), ingredients (string array), instructions (string array). Try and be creative with the title of the recipe, it should be fun - like a pun.`

(It doesn't do so well with the recipe names 😅)

![image](https://github.com/user-attachments/assets/d35eed99-f7fe-409d-9cb6-0a42813cacb9)

## Resources

For autofilling recipes, fetch and parse the [jsonld metadata](https://developers.google.com/search/docs/appearance/structured-data/recipe):

## Supabase

[Generating types using Supabase CLI](https://supabase.com/docs/guides/api/rest/generating-types)

- Retrieve `PROJECT_ID` from Supabase dashboard

`npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > database.types.ts`

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```
