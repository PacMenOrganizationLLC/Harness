import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetGameQuery } from "../games/gameHooks";
import { Spinner } from "../../components/Spinner";
import { useGetCompetitionsByGameQuery } from "../competitions/competitionHooks";
import { FormatDate, getTimeNoSeconds } from "../../helpers/dateAndTimeHelpers";

export const GameInfo = () => {
  const navigate = useNavigate();
  const gameId = useParams<{ id: string }>().id;
  const gameQuery = useGetGameQuery(gameId);
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
        <div className="col-3 my-auto">
          <button className="btn" onClick={() => navigate(-1)}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-6 my-auto">
          <h1 className="text-center">{game.name}</h1>
        </div>
        <div className="col my-auto text-end">
          {game.repoLink && (
            <a
              href={game.repoLink}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none fs-4"
            >
              <i className="bi-github pe-1" />
              Github
            </a>
          )}
        </div>
        <div className="col my-auto">
          <a
            href="https://marswebpacmen.azurewebsites.net/swagger/index.html"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none fs-4"
          >
            <i className="bi-box-arrow-up-right pe-1" />
            Swagger
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="fs-4 text-center">How to Join</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Condimentum id venenatis a condimentum vitae sapien pellentesque
            habitant. Velit scelerisque in dictum non consectetur a erat. Elit
            duis tristique sollicitudin nibh. Leo in vitae turpis massa. Etiam
            dignissim diam quis enim lobortis scelerisque fermentum dui. Non
            nisi est sit amet facilisis magna. Erat pellentesque adipiscing
            commodo elit at imperdiet dui accumsan. Lacus viverra vitae congue
            eu consequat ac felis donec. Netus et malesuada fames ac turpis
            egestas sed tempus urna. Eget nunc scelerisque viverra mauris. Nisl
            condimentum id venenatis a condimentum vitae sapien pellentesque. Et
            malesuada fames ac turpis egestas integer eget. Faucibus purus in
            massa tempor nec. Semper quis lectus nulla at volutpat diam. Dictum
            sit amet justo donec enim. Odio pellentesque diam volutpat commodo
            sed egestas egestas fringilla. Donec massa sapien faucibus et
            molestie ac feugiat sed.
          </div>
        </div>
        <div className="col">
          <div className="fs-4 text-center">How to Play</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Condimentum id venenatis a condimentum vitae sapien pellentesque
            habitant. Velit scelerisque in dictum non consectetur a erat. Elit
            duis tristique sollicitudin nibh. Leo in vitae turpis massa. Etiam
            dignissim diam quis enim lobortis scelerisque fermentum dui. Non
            nisi est sit amet facilisis magna. Erat pellentesque adipiscing
            commodo elit at imperdiet dui accumsan. Lacus viverra vitae congue
            eu consequat ac felis donec. Netus et malesuada fames ac turpis
            egestas sed tempus urna. Eget nunc scelerisque viverra mauris. Nisl
            condimentum id venenatis a condimentum vitae sapien pellentesque. Et
            malesuada fames ac turpis egestas integer eget. Faucibus purus in
            massa tempor nec. Semper quis lectus nulla at volutpat diam. Dictum
            sit amet justo donec enim. Odio pellentesque diam volutpat commodo
            sed egestas egestas fringilla. Donec massa sapien faucibus et
            molestie ac feugiat sed.
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
        {game.imageSource && (
          <div className="m-2">
            <img
              src={
                process.env.REACT_APP_API_URL +
                "/api/Game/Image/" +
                game.imageSource
              }
              alt="Game"
            />
          </div>
        )}
      </div>
    </div>
  );
};
