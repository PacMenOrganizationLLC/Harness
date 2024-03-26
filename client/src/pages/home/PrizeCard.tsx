import { Link } from "react-router-dom";
import { useGetWinnablePrizesQuery } from "../competitions/competitionHooks"
import { Spinner } from "../../components/Spinner";
import { FC } from "react";
import { Competition } from "../../models/Competition";
import { CompetitionCard } from "../../components/CompetitionCard";

export const PrizeCard: FC<{
  competitions: Competition[];
}> = ({ competitions }) => {
  const prizesQuery = useGetWinnablePrizesQuery();
  const prizes = prizesQuery.data ?? []

  if (prizesQuery.isLoading) return <Spinner />
  if (prizesQuery.isError) return <h3 className="text-center">Error getting prizes</h3>

  if (competitions.length === 0) return <></>

  return (
    <div className="card bg-secondary-subtle h-100">
      <div className="card-body pt-1">
        <div className="card-title fw-bold text-center fs-4">
          Upcoming Competition
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 col-12 mb-2">
            <CompetitionCard competition={competitions[0]} />
          </div>
          {prizes.slice(0, 3).map((p) => (
            <div className="col-lg-3 col-md-6 col-12 mb-2">
              <div className="card h-100" key={p.id}>
                <Link to={`/competition/${p.competitionId}`}
                  className="text-reset text-decoration-none">
                  <img
                    className="card-img opacity-25"
                    src={`/api/prize/image/${p.imageFilename}`}
                    alt="prize"
                    style={{ maxHeight: "30ex" }}
                  />
                  <div className="card-body card-img-overlay text-center">
                    <div className="position-absolute top-0 start-0 bg-dark text-white px-2 py-1 opacity-75 fs-5 rounded">
                      #{p.placement}
                    </div>
                    <div className="d-flex flex-column justify-content-center h-100">
                      <div className="fw-bold card-title">{p.prize}</div>
                      <div>{GetPrizePlacementText(p.placement)}</div>
                      <div>{competitions[0].name}</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GetPrizePlacementText(placement: number) {
  if (placement === 1) return "1st Place Prize"
  else if (placement === 2) return "2nd Place Prize"
  else if (placement === 3) return "3rd Place Prize"
  return "Prize " + placement
}
