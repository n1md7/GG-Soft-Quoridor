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

You can run also `bun run build` to build the project for production. This assumes that the root directory is the
content
of the `dist` folder. While in GitHub pages, the root directory is the name of the repository.

## Release

To release a new version, you need to do the following:

1. Go to the releases and create a new tag.
2. The tag should be in the format `vX.Y.Z` where `X.Y.Z` is the version number.
3. The release should have a title and a description.
4. Select the tag you just created.
5. Publish the release.
6. The release will be automatically deployed to GitHub pages and will be available at
   https://n1md7.github.io/GG-Soft-Quoridor. However, the specific release will be available
   at https://n1md7.github.io/GG-Soft-Quoridor/vX.Y.Z.

## Contributing

To contribute to the project, you need to do the following:

1. Find the issue you want to work on.
2. Ask if you can work on it.
3. Take the issue and create a new branch.
4. Work on the issue.
5. Create a pull request.
6. Wait for the pull request to be reviewed.
7. Merge the pull request.

## Descriptions for the game:

---

Short Description

▎ Outsmart your opponent in this stunning 3D strategy board game! Place walls, plan your path, and use powerful abilities to reach the other side first.

---

Medium Description:

▎ Quoridor3D brings the beloved classic board game to life in a beautiful 3D environment. Race your pawn across a 9x9 board while strategically placing walls to block your opponent — but
watch out, they're doing the same to you! Choose from three difficulty levels, earn coins from victories, and unlock game-changing powers like Path Vision, Extra Wall, Block Move, and
Undo. Simple to learn, impossible to master.

---

Full Description (for the Crazy Games submission page):

▎ Quoridor3D is a beautifully crafted 3D strategy board game where every move counts. Your goal is simple: be the first to reach the opposite side of the board. But your AI opponent has
the same idea — and 10 walls to throw in your way.

▎ How to Play
▎ Take turns moving your pawn one space or placing a wall to redirect your opponent's path. You can never fully block someone in — there must always be a way through. Think ahead, cut
off routes, and find the shortest path to victory.

▎ Features
▎ - Gorgeous 3D board with smooth animations and immersive sound
▎ - 3 difficulty levels: Easy, Medium, and Hard — each with smarter AI
▎ - Earn coins from every match and spend them on powerful abilities
▎ - 4 unique powers: Path Vision (reveal the shortest route), Extra Wall (get an 11th wall), Block Move (skip your opponent's turn), and Undo Move (reverse the last play)
▎ - Track your stats: win rate, best times, and total games per difficulty
▎ - Leaderboard to compare your performance across all difficulty levels
▎ - Celebration effects for wins and smooth UI throughout

▎ Can you outwit the AI on Hard mode? Play now and find out!

## Controls

- Click/Tap your pawn — Highlights all valid moves on the board

  - Click/Tap a highlighted cell — Move your pawn to that cell
  - Hover over any cell — An arrow appears showing where a wall can be placed (top, bottom, left, or right side of the cell depending on your cursor/finger position)
  - Click/Tap while the wall placeholder is shown — Place the wall in that position

  Camera Controls (Desktop):

  - Right Click + Drag — Pan the camera
  - Scroll Wheel — Zoom in/out
  - Left Click + Drag (on empty space) — Rotate the view

  Camera Controls (Mobile):

  - Two-Finger Drag — Pan the camera
  - Pinch — Zoom in/out
  - One-Finger Drag (on empty space) — Rotate the view
