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
      <div className="row border-bottom fw-bold">
        <div className="col-3 px-0">Rank</div>
        <div className="col text-start px-0">Player</div>
        <div className="col px-0">Score</div>
      </div>
      {filteredScoreboard.map((s) => (
        <div className="row border-bottom py-1" key={s.rank}>
          <div className="col-3 px-0">{s.rank}</div>
          <div className="col text-truncate text-start px-0">{s.playerName}</div>
          <div className="col px-0">{s.score}</div>
        </div>
      ))}
    </div>
  );
};

export default ScoreboardComponent;
