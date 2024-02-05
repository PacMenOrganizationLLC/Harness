import { ScoreboardComponent } from "../../components/ScoreboardDisplay"
import { SessionScoreboard } from "../../models/Session";

export const ScoreboardCarousel = () => {
  const scoreboard: SessionScoreboard[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    sessionId: 0,
    playerName: `Player ${i + 1}`,
    rank: i + 1,
    score: 1000 - (i * 100)
  }));
  return (
    <div className="card bg-secondary-subtle">
      <div className="card-body">
        <div className="card-title text-center fw-bold">Some Game</div>
        <div className="row">
          <div className="col-auto my-auto">
            <button className="btn">
              <i className="bi bi-chevron-compact-left fs-1"></i>
            </button>
          </div>
          <div className="col">
            <ScoreboardComponent scoreBoard={scoreboard} />
          </div>
          <div className="col-auto my-auto">
            <button className="btn">
              <i className="bi bi-chevron-compact-right fs-1"></i>
            </button >
          </div>
        </div>
      </div>
    </div>
  )
}
