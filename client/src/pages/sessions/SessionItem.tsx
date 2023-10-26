import { FC } from "react";
import { Session } from "../../models/Session";
import { useNavigate } from "react-router-dom";
import { useDeleteSessionMutation } from "./sessionHooks";

interface SessionItemProps {
  session: Session;
}

export const SessionItem: FC<SessionItemProps> = ({ session }) => {
  const navigate = useNavigate();
  const deleteSessionMutation = useDeleteSessionMutation(session.competitionId);
  console.log(session.competitionId)

  const deleteSessionHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteSessionMutation.mutate(session.id);
  }
  return (
    <div className="card h-100">
      <button
        className="btn p-0 h-100"
        onClick={() => navigate(`/session/${session.id}`)}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-6 offset-3 fs-5">
              {session.name}
            </div>
            <div className="col-3 my-auto">
              <button className="btn btn-outline-danger px-1 py-0"
                onClick={deleteSessionHandler}>
                <i className="bi-x" />
              </button>
            </div>
          </div>
          <div>
            {/* {getTimeNoSeconds(session.startAt)} - {getTimeNoSeconds(session.endAt)} */}
          </div>
        </div>
      </button>
    </div>
  );
};
