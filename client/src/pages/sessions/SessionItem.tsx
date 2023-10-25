import { FC } from "react";
import { Session } from "../../models/Session";
import { useNavigate } from "react-router-dom";

interface SessionItemProps {
  session: Session;
}

export const SessionItem: FC<SessionItemProps> = ({ session }) => {
  const navigate = useNavigate();
  
  return (
    <div className="card h-100">
      <button
        className="btn text-reset p-0"
        onClick={() => navigate(`/session/${session.id}`)}
      >
        <div className="card-body">
          <div className="card-title fs-5 text-truncate">{session.name}</div>
          <div>
            {/* {getTimeNoSeconds(session.startAt)} - {getTimeNoSeconds(session.endAt)} */}
          </div>
        </div>
      </button>
    </div>
  );
};
