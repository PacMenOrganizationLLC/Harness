import { FC } from "react"
import { FormatDate, getTimeNoSeconds } from "../helpers/dateAndTimeHelpers"
import { Competition } from "../models/Competition"
import { Link } from "react-router-dom"

export const CompetitionCard: FC<{
  competition: Competition
}> = ({ competition }) => {
  return (
    <Link
      to={`/competition/${competition.id}`}
      className="text-reset text-decoration-none"
    >
      <div className="card text-center h-100 bg-secondary-subtle">
        <img
          className="card-img opacity-50"
          style={{ maxHeight: "20ex" }}
          src={`${process.env.REACT_APP_API_URL}/api/Game/ImageWithGame/${competition.gameId}`}
          alt="Card"
        />
        <div className="card-body card-img-overlay">
          <div className="card-title fw-bold">{competition.name}</div>
          <div><i className="bi-joystick me-1" />{competition.game?.name}</div>
          {new Date(competition.startAt).toDateString() ===
            new Date(competition.endAt).toDateString() ? (
            <div><i className="bi-calendar-event me-1" />{FormatDate(competition.startAt)}</div>
          ) : (
            <div>
              <i className="bi-calendar-event me-1" />{FormatDate(competition.startAt)} - {FormatDate(competition.endAt)}
            </div>
          )}
          <div>
            <i className="bi-clock me-1" />
            {getTimeNoSeconds(competition.startAt)} -{" "}
            {getTimeNoSeconds(competition.endAt)}
          </div>
          <div>
            <i className="bi-pin-map me-1" />{competition.location}
          </div>
        </div>
      </div>
    </Link>
  )
}
