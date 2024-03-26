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
      <div className="card text-center bg-secondary-subtle">
        <img
          className="card-img opacity-25"
          style={{ maxHeight: "30ex" }}
          src={`/api/Game/ImageWithGame/${competition.gameId}`}
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
