import React, { FC } from "react";
import { SessionScoreboard } from "../models/Session";

interface ScoreboardComponentProps {
  scoreBoard: SessionScoreboard[];
}

const ScoreboardComponent: FC<ScoreboardComponentProps> = ({ scoreBoard }) => {
  const test_array = [0, 1, 2];
  console.log(scoreBoard);
  return (
    <div>
      <h2>Session Scoreboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreBoard &&
            scoreBoard.map((scoreboard, index) => (
              <tr key={index}>
                <td>{scoreboard.rank}</td>
                <td>{scoreboard.playerName}</td>
                <td>{scoreboard.score}</td>
              </tr>
            ))}
          {/* {test_array.map((s) => s)} */}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreboardComponent;
