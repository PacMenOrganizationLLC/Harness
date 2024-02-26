import { Link } from "react-router-dom"
import { useGetGamesQuery } from "../games/gameHooks";
import { Spinner } from "../../components/Spinner";

export const GamesCard = () => {
  const gamesQuery = useGetGamesQuery();
  const games = gamesQuery.data ?? []

  if (gamesQuery.isLoading) return <Spinner />
  if (gamesQuery.isError) return <h3 className="text-center">Error getting games</h3>;
  return (
    <div className="card bg-secondary-subtle h-100">
      <div className="card-body pt-1">
        <div className="card-title fw-bold text-center fs-4">Games</div>
        <div className="row row-cols-1 row-cols-lg-2">
          {games.map(g => (
            <div className="col mb-2" key={g.id}>
              <Link to={`/game/${g.id}`}
                className="text-reset text-decoration-none">
                <div className="card h-100">
                  {g.imageSource && (
                    <img
                      className="card-img opacity-50"
                      src={`${process.env.REACT_APP_API_URL}/api/Game/ImageWithGame/${g.id}`}
                      alt="Card"
                    />
                  )}
                  <div className={`card-body ${g.imageSource && "card-img-overlay"}`}>
                    <div className="card-title text-center fs-5 fw-bold">{g.name}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
