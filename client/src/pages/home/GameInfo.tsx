import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetGameQuery } from "../games/gameHooks";
import { Spinner } from "../../components/Spinner";
import { useGetCompetitionsByGameQuery } from "../competitions/competitionHooks";
import { FormatDate, getTimeNoSeconds } from "../../helpers/dateAndTimeHelpers";
import ReactMarkdown from "react-markdown";

export const GameInfo = () => {
  const navigate = useNavigate();
  const gameId = useParams<{ id: string }>().id;
  const gameQuery = useGetGameQuery(Number(gameId));
  const game = gameQuery.data;
  const competitionsQuery = useGetCompetitionsByGameQuery(gameId);
  const upcomingCompetitions = competitionsQuery.data ?? [];

  if (gameQuery.isLoading || competitionsQuery.isLoading) return <Spinner />;
  if (gameQuery.isError)
    return <h3 className="text-center">Error getting game</h3>;
  if (competitionsQuery.isError)
    return <h3 className="text-center">Error getting competitions</h3>;
  if (!game) return <h3 className="text-center">Unable to get game</h3>;

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 col-auto my-auto">
          <button className="btn btn-sm" onClick={() => navigate(-1)}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col my-auto">
          <h1 className="text-md-center my-auto">{game.name}</h1>
        </div>
        <div className="col-md-3 col-auto my-auto text-end">
          {game.repoLink && (
            <a
              href={game.repoLink}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none fs-4"
            >
              <i className="bi-github pe-1" />
              <span className="d-none d-md-inline">Github</span>
            </a>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md ">
          <div className="card shadow bg-secondary-subtle">
            <div className="card-body">
              <div className="fs-4 text-center">Getting Started</div>
              <div style={{ maxHeight: "50vh" }} className="overflow-y-auto">
                <ReactMarkdown>{game.gettingStartedInstructions}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md mt-2 mt-md-0">
          <div className="card shadow bg-secondary-subtle">
            <div className="card-body">
              <div className="fs-4 text-center">How to Play</div>
              <div style={{ maxHeight: "50vh" }} className="overflow-y-auto">
                <ReactMarkdown>{game.gameRules}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fs-5 mt-3">Upcoming Competitions:</div>
      <div className="row">
        {upcomingCompetitions.map((c, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 my-1">
            <Link
              to={`/competition/${c.id}`}
              className="text-reset text-decoration-none"
            >
              <div className="card text-center h-100 bg-secondary-subtle">
                <div className="card-body">
                  <div className="card-title fw-bold">{c.name}</div>

                  {new Date(c.startAt).toDateString() ===
                  new Date(c.endAt).toDateString() ? (
                    <div>{FormatDate(c.startAt)}</div>
                  ) : (
                    <div>
                      {FormatDate(c.startAt)} - {FormatDate(c.endAt)}
                    </div>
                  )}
                  <div>
                    {getTimeNoSeconds(c.startAt)} - {getTimeNoSeconds(c.endAt)}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
