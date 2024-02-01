import React, { FC } from "react";
import { SessionScoreboard } from "../models/Session";

interface ScoreboardComponentProps {
  scoreBoard: SessionScoreboard[];
}

const ScoreboardComponent: FC<ScoreboardComponentProps> = ({ scoreBoard }) => {
  console.log(scoreBoard);
  const filteredScoreboard = scoreBoard.filter((s) => s.rank <= 10);
  return (
    <div className="">
      <h2>Scoreboard</h2>
      <table className="table table-stripded">
        <thead>
          <tr>
            <th className="mx-2 w-25">Rank</th>
            <th className="mx-2">Player</th>
            <th className="mx-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredScoreboard &&
            filteredScoreboard.map((scoreboard, index) => (
              <tr key={index}>
                <td>{scoreboard.rank}</td>
                <td className="text-truncate">{scoreboard.playerName}</td>
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
