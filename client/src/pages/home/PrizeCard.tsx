import { Link } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { useGetWinnablePrizesQuery } from "../competitions/competitionHooks"

export const PrizeCard = () => {
  const prizesQuery = useGetWinnablePrizesQuery();
  const prizes = prizesQuery.data ?? []

  if (prizesQuery.isLoading) return <Spinner />
  if (prizesQuery.isError) return <h3 className="text-center">Error getting prizes</h3>
  return (
    <div className="card bg-secondary-subtle w-100 my-2">
      <div className="card-body pt-1">
        <div className="card-title fw-bold text-center fs-4">
          Available Prizes
        </div>
        <div className="d-flex flex-wrap">
          {prizes.map((p) => (
            <div className="card mx-1 mb-1" key={p.id}>
              <Link to={`/competition/${p.competitionId}`}
                className="text-reset text-decoration-none">
                <div className="card-body text-center">
                  <div className="card-title fw-bold">{p.prize}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
