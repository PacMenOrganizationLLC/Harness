import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCompetitionMutation,
  useDeleteCompetitionPrizeMutation,
  useGetCompetitionQuery,
} from "./competitionHooks";
import { Spinner } from "../../components/Spinner";
import { CompetitionEditorModal } from "./CompetitionEditorModal";
import { useAddSessionMutation, useGetSessionsQuery } from "../sessions/sessionHooks";
import { SessionItem } from "../sessions/SessionItem";
import { PrizeEditorModal } from "./PrizeEditorModal";
import { formatCompetitionDate } from "../../models/Competition";
import toast from "react-hot-toast";
import { ConfirmationToast } from "../../components/ConfirmationToast";
import { useIsAdmin } from "../../userHooks";

export const CompetitionDetails = () => {
  const competitionId = Number(useParams<{ id: string }>().id);
  const getSessionsQuery = useGetSessionsQuery(competitionId);
  const sessions = getSessionsQuery.data ?? [];
  const competitionQuery = useGetCompetitionQuery(competitionId);
  const competition = competitionQuery.data;
  const addSessionMutation = useAddSessionMutation(competitionId)
  const navigate = useNavigate();

  const deleteCompetitionMutation = useDeleteCompetitionMutation();
  const deletePrizeMutation = useDeleteCompetitionPrizeMutation(competitionId);

  const isAdmin = useIsAdmin();

  const deleteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toast((t) => (
      <ConfirmationToast
        toastId={t.id}
        message={"Are you sure? This will permanently delete the competition."}
        confirmHandler={() => {
          deleteCompetitionMutation.mutate(competitionId);
          toast.dismiss(t.id);
          navigate("/competitions");
        }} />
    ), { duration: Infinity })
  };

  if (competitionQuery.isLoading) return <Spinner />;
  if (competitionQuery.isError) return <div>Error getting competition</div>;
  if (!competition) return <div>Could not get competition</div>;

  return (
    <div className="container mt-2">
      <div className="row mb-1">
        <div className="col-2 col-md-3 my-auto">
          <button className="btn" onClick={() => navigate(-1)}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-10 col-md-6 my-auto text-md-center">
          <h1 className="my-auto">{competition.name}</h1>
        </div>
        {isAdmin &&
          <>
            <div className="col-10 col-md-2 text-end my-auto">
              <CompetitionEditorModal existingCompetition={competition} />
            </div>
            <div className="col-1 my-auto">
              <button className="btn btn-outline-danger" onClick={deleteHandler}>
                <i className="bi bi-trash" />
              </button>
            </div>
          </>
        }
      </div>
      <div className="text-center">
        <Link to={`/game/${competition.gameId}`}
          className="btn btn-outline-bold w-50">Learn to Play</Link>
      </div>
      <div>{competition.description}</div>
      <div>
        <i className="bi-joystick" /> {competition.game?.name}
      </div>
      <div>
        <i className="bi-pin-map" /> {competition.location}
      </div>
      <div>
        <i className="bi-calendar-event pe-1" />{formatCompetitionDate(competition)}
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>Prizes:</h3>
        </div>
        <div className="col-auto my-auto">
          <PrizeEditorModal competitionId={competition.id} />
        </div>
      </div>
      <div className="row">
        {competition.competitionPrizes &&
          competition.competitionPrizes.length > 0 ? (
          competition.competitionPrizes.sort((a, b) => a.placement - b.placement).map((p) => (
            <div className="col-lg-3 col-md-6 col-12 my-1 px-1">
              <div className="text-center card my-1" key={p.id + "competition"}>
                <div className="position-relative">
                  <img
                    className="img-fluid card-img-top"
                    src={`/api/prize/image/${p.imageFilename}`}
                    alt="prize"
                    style={{ height: "30ex" }}
                  />
                  <div className="position-absolute top-0 start-0 bg-dark text-white px-2 py-1 opacity-75 fs-5 rounded">
                    #{p.placement}
                  </div>
                </div>
                <div className="card-body">
                  <div className="text-truncate">{p.prize}</div>
                  <div className="d-flex w-100 justify-content-around">
                    <div className="m-1 w-50">
                      <PrizeEditorModal existingPrize={p} competitionId={competition.id} />
                    </div>
                    <button className="btn btn-outline-danger m-1 my-auto w-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePrizeMutation.mutate(p.id);
                      }}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">No prizes</div>
        )}
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>Sessions:</h3>
        </div>
        <div className="col-auto my-auto">
          <button className="btn btn-outline-bold"
            onClick={() => addSessionMutation.mutate(competition.gameId)}>New</button>
        </div>
      </div>
      <div className="row">
        {sessions.map((s) => (
          <div className="col-lg-3 col-md-6 col-12 my-1 px-1" key={s.id + "123"}>
            <SessionItem session={s} />
          </div>
        ))}
      </div>
      <hr />
      <div className="row">
        <div className="col">

          {/* <img
            src={competition.imageFilename ?? ""}
            alt="Your competition's visual graphic here"
          ></img> */}
        </div>
      </div>
    </div>
  );
};
