# Pool Club Scoreboard

A simple, responsive web application for keeping score in various pool and billiards games. This project aims to provide a clean and easy-to-use interface for score tracking, whether you're playing casually at home or more seriously at a club.

## Features

*   **Multiple Game Modes:** Supports popular game modes like 8-ball, 9-ball, 10-ball, and 14.1 Continuous (with a training mode).
*   **Player Input:** Allows users to enter custom player names for a personalized experience.
*   **Real-time Score Tracking:** Keeps track of scores with intuitive increment and decrement buttons.
*   **Match History:** Saves a history of previous games in the browser's local storage, so you can review previous games.
*   **14.1 Continuous Detailed Stats**: Provides detailed stats for the 14.1 continuous game mode, with innings, scores and balls potted.
*   **Responsive Design:** Works well on various devices, including tablets and desktops.

## Screenshots

### Game Selection Screen

[Replace this with a screenshot of your game selection screen]
![Game Selection Screen](path-to-your-game-selection-screenshot.png)

### Standard Scoreboard (8-ball, 9-ball, 10-ball)

[Replace this with a screenshot of the scoreboard for 8-ball, 9-ball, and 10-ball games]
![Standard Scoreboard](path-to-your-standard-scoreboard-screenshot.png)

### 14.1 Continuous Game Screen

[Replace this with a screenshot of the 14.1 Continuous Game screen, with the scoreboard on the left and the inning table on the right]
![14.1 Continuous Game Screen](path-to-your-141-continuous-game-screenshot.png)

## Usage

1.  **Select a Game Mode:** Choose from the available game modes on the main screen.
2.  **Enter Player Names (If Required):** If the game mode requires player names, enter them in the provided input fields.
3.  **Start the Game:** Click the "Start Game" button to begin.
4.  **Track Scores:** Use the "+" and "-" buttons to adjust scores.
5.  **End Game:** Click "End Game" button to finish the match, then the scores will be saved to history.
6.  **14.1 Continuous Specific Controls**:
    *    Use the number buttons to set the number of balls remaining on the table, and it will calculate the balls potted.
    *    Use foul and safety buttons to mark fouls and safeties.
    *    Use the new rack button to give you more balls, and increase the total remaining.
7. **Match History:** Review your previous games, export or import your saved history.

## Technical Details

*   **Languages:** HTML, CSS, JavaScript
*   **Libraries/Frameworks:** None (pure VanillaJS)
*   **Storage:** Match history is stored in the browser's `localStorage`.
*   **Responsive:** CSS based layout with a focus on tablet responsiveness.

## Development

### Prerequisites

*   VS Code
*   Git
*  A web browser

### Local Setup

1.  Clone the repository: `git clone https://github.com/<your-username>/pool-scoreboard.git`
2.  Open the project folder in VS Code.
3.  Open the `index.html` file in your browser.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  **Fork the Repository:** Click on the "Fork" button on the repository page to create a copy in your GitHub account.
2.  **Clone Your Fork:** Clone the forked repository to your local machine using `git clone <your-fork-url>`.
3.  **Create a Branch:** Create a new branch for your changes using `git checkout -b feature/your-new-feature`.
4.  **Make Your Changes:** Implement your desired changes, tests and improvements.
5.  **Commit Your Changes:** Use `git add .` and then `git commit -m "Your commit message"`.
6. **Push Your Changes**: Use `git push origin feature/your-new-feature` (replace `feature/your-new-feature` with the name of your branch).
7. **Create a Pull Request**: Submit a pull request from your branch to the original repository, detailing the changes made.

## License

This project is licensed under the [MIT License](LICENSE).

[View the full license text here](LICENSE) or [at the SPDX website](https://spdx.org/licenses/MIT.html)

## Feedback

Any feedback on the design, usability, features or bugs are welcome! Feel free to create an issue on GitHub or contact me directly.