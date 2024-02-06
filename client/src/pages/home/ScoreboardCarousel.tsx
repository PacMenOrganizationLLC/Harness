import React, { useState } from 'react';
import { ScoreboardComponent } from "../../components/ScoreboardDisplay";
import { SessionScoreboard } from "../../models/Session";

export const ScoreboardCarousel = () => {
  // Create an array of arrays representing multiple session scoreboards
  const scoreboards: SessionScoreboard[][] = Array.from({ length: 5 }, (_, sessionIndex) =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      sessionId: sessionIndex,
      playerName: `Player ${i + 1} (Session ${sessionIndex + 1})`,
      rank: i + 1,
      score: 1000 - (i * 100),
    }))
  );

  // State to track the current index of the displayed scoreboard
  const [currentScoreboardIndex, setCurrentScoreboardIndex] = useState(0);

  // Handlers to navigate between scoreboards
  const goToPrevious = () => {
    setCurrentScoreboardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNext = () => {
    setCurrentScoreboardIndex((prevIndex) => Math.min(prevIndex + 1, scoreboards.length - 1));
  };

  return (
    <div className="card bg-secondary-subtle">
      <div className="card-body">
        <div className="card-title text-center fw-bold">
          Winners Circle - Game {currentScoreboardIndex + 1}
        </div>
        <div className="row">
          <div className="col-auto my-auto">
            <button className="btn" onClick={goToPrevious}>
              <i className="bi bi-chevron-compact-left fs-1"></i>
            </button>
          </div>
          <div className="col">
            <ScoreboardComponent scoreBoard={scoreboards[currentScoreboardIndex]} />
          </div>
          <div className="col-auto my-auto">
            <button className="btn" onClick={goToNext}>
              <i className="bi bi-chevron-compact-right fs-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
