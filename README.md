A TypeScript + Graphql + Gatsby project for Milli Frontend. ð¥

Following plugins setup:

- ð **ESLint** â Pluggable JavaScript linter
- ð **Prettier** - Opinionated Code Formatter
- ð¶ **Husky** â Use git hooks with ease
- ð **Commitizen** - Conventional commit messages CLI
- ð **Commitlint** - Lint commit messages
- ð **Renovate** - Dependency update tool
- ð« **lint-staged** - Run linters against staged git files
- ð **Root import** - Import folders and files using the `@` prefix.

## ð Getting started

If you prefer you can clone this repository and run the following commands inside the project folder:

1. Clone the repo
1. Run `yarn start:gql` to start the mock-graphql server
1. Run `yarn gql:update` to generate typings for the graphql queries
1. Run `yarn start` to start the dev environment

To view the project you can open `http://localhost:8000`.

## Notes

- If you make a change to a query, rerun `yarn gql:update` to regenerate the typescript typings
  - if not, your changes won't reflect in your auto-complete
- if you make a change to the schema, restart `yarn start:gql`
  - re-run `yarn gql:fetch` to download the JSON version of the schema from the mock schema
  - commit `schema.sdl` and `graphql-schema.json` in the same git-commit
  - re-run `gql:update` if needed

## ð¤ Contributing

1. Fork this repository;
2. Create your branch: `git checkout -b my-new-feature`;
3. Commit your changes: `git commit -m 'Add some feature'`;
4. Push to the branch: `git push origin my-new-feature`.

**After your pull request is merged**, you can safely delete your branch.

## ð License

See the [LICENSE.md](LICENSE.md) file for more information.

## Attribution

Based off [Typescript-Start by JoÃ£o Pedro Schmitz](https://github.com/jpedroschmitz/gatsby-starter-ts)
