# Quoridor 3d

## Description

This is a 3D version of the game Quoridor. The game is played 9x9 board with 3D walls. The goal of the game is to reach
the other side of the board. The player can move in 3D space and place walls to block the opponent.

## Development

### How to setup

We are using a Bun runtime for this project. To install the required dependencies, run the following command:

```bash
bun install # Installs the dependencies
bun run dev # Automatically starts the server
```

## Deployment

The project is deployed on GitHub pages. To deploy the project, run the following command:

```bash
bun run build:github # Builds the project for GitHub pages
bun run preview      # Opens the project in the browser for the generated files
```

You can run also `bun run build` to build the project for production. This assumes that the root directory is the content
of the `dist` folder. While in GitHub pages, the root directory is the name of the repository.

## Release

To release a new version, you need to do the following:

1. Go to the releases and create a new tag.
2. The tag should be in the format `vX.Y.Z` where `X.Y.Z` is the version number.
3. The release should have a title and a description.
4. Select the tag you just created.
5. Publish the release.
6. The release will be automatically deployed to GitHub pages and will be available at
   https://n1md7.github.io/GG-Soft-Quoridor/master.

## Contributing

To contribute to the project, you need to do the following:

1. Find the issue you want to work on.
2. Ask if you can work on it.
3. Take the issue and create a new branch.
4. Work on the issue.
5. Create a pull request.
6. Wait for the pull request to be reviewed.
7. Merge the pull request.
