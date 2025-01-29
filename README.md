# isonfirecli

> CLI tool to clone useful code from my repo

## Commands

### copy

Clone from GitHub repo, data is taken from _data-on-fire_ folder that is also the default value

#### Usage

```
npx isonfirecli copy <path>
```

### see

See all available paths from GitHub repository, giving you also _copy_ command for each possible path

#### Usage

```
npx isonfirecli see
```

### add

Add personal access token for GitHub API that gonna be store on your local machine
it's need to raise the rate limit of GitHub API from 60 to 5000 requests per hour

- [Create your personal token](https://github.com/settings/tokens)
  - Personal access tokens - Tokens (classic)
  - enable all options
  - set no expiration

#### Usage

```
npx isonfirecli add -t <token>
```

### deploy-test

The script initializes the readline interface to read inputs from the user.

- Prompt for branch and commit message
- Commits the _staged_ changes with the provided commit message using `git commit -m`.
- Pushes the committed _staged_ changes on current branch
- Updates development/dev and test Branches:
- Merges the specified branch into the development/dev branch
- Merges the development/dev branch into the test branch

#### Usage

```
npx isonfirecli deploy-test
```

## Thanks

This is my fist pack and it's far to be perfect, but _The first love is never forgotten_.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).