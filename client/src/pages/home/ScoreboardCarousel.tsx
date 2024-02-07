import React, { useState } from 'react';
import { ScoreboardComponent } from "../../components/ScoreboardDisplay";
import { SessionScoreboard } from "../../models/Session";

export const ScoreboardCarousel = () => {
  const scoreboards: SessionScoreboard[][] = Array.from({ length: 5 }, (_, sessionIndex) =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      sessionId: sessionIndex,
      playerName: `Player ${i + 1} (Session ${sessionIndex + 1})`,
      rank: i + 1,
      score: 1000 - (i * 100),
    }))
  );

  const [currentScoreboardIndex, setCurrentScoreboardIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentScoreboardIndex((prevIndex) => prevIndex === 0 ? scoreboards.length - 1 : prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentScoreboardIndex((prevIndex) => prevIndex === scoreboards.length - 1 ? 0 : prevIndex + 1);
  };

  return (
    <div className="card bg-secondary-subtle h-100">
      <div className="card-body pt-1">
        <div className="card-title text-center fw-bold fs-4">
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
