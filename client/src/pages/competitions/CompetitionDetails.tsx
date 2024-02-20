import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCompetitionMutation,
  useDeleteCompetitionPrizeMutation,
  useGetCompetitionQuery,
} from "./competitionHooks";
import { Spinner } from "../../components/Spinner";
import { CompetitionEditorModal } from "./CompetitionEditorModal";
import { AddSessionModal } from "../sessions/AddSessionModal";
import { useGetSessionsQuery } from "../sessions/sessionHooks";
import { SessionItem } from "../sessions/SessionItem";
import { getTimeNoSeconds } from "../../helpers/dateAndTimeHelpers";
import { PrizeEditorModal } from "./PrizeEditorModal";

export const CompetitionDetails = () => {
  const competitionId = useParams<{ id: string }>().id;
  const getSessionsQuery = useGetSessionsQuery(Number(competitionId));
  const sessions = getSessionsQuery.data ?? [];
  const competitionQuery = useGetCompetitionQuery(Number(competitionId));
  const competition = competitionQuery.data;
  const navigate = useNavigate();
  const BaseUrl = process.env.REACT_APP_API_URL;

  const deleteCompetitionMutation = useDeleteCompetitionMutation();
  const deletePrizeMutation = useDeleteCompetitionPrizeMutation(Number(competitionId));

  const deleteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    deleteCompetitionMutation.mutate(Number(competitionId));
    navigate("/events");
  };

  if (competitionQuery.isLoading) return <Spinner />;
  if (competitionQuery.isError) return <div>Error getting competition</div>;
  if (!competition) return <div>Could not get competition</div>;

  console.log(competition);

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 my-auto">
          <button className="btn" onClick={() => navigate(-1)}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-6 text-center">
          <h1>{competition.name}</h1>
        </div>
        <div className="col-2 text-end my-auto">
          <CompetitionEditorModal existingCompetition={competition} />
        </div>
        <div className="col-1 my-auto">
          <button className="btn btn-outline-danger" onClick={deleteHandler}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
      {competition.description && (
        <div className="text-center">{competition.description}</div>
      )}
      <div>
        <i className="bi-joystick" /> {competition.game?.name}
      </div>
      <div>
        <i className="bi-pin-map" /> {competition.location}
      </div>
      <div>
        <i className="bi-calendar-event" />{" "}
        {new Date(competition.startAt).toDateString()},{" "}
        {getTimeNoSeconds(competition.startAt)} -{" "}
        {new Date(competition.endAt).toDateString()},{" "}
        {getTimeNoSeconds(competition.endAt)}
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
          competition.competitionPrizes.map((p) => (
            <div className="col-lg-3 col-md-6 col-12 my-1 px-1">
              <div className="text-center border rounded my-1" key={p.id + "competition"}>
                <img
                  className="img-fluid rounded mx-auto d-block"
                  src={`${BaseUrl}/api/prize/image/${p.imageFilename}`}
                  alt={p.prize} />
                <div>#{p.placement}</div>
                <div className="text-truncate">{p.prize}</div>
                <div className="d-flex w-100 justify-content-center">
                  <div className="m-1">
                    <PrizeEditorModal existingPrize={p} competitionId={competition.id} />
                  </div>
                  <button className="btn btn-outline-danger m-1 my-auto" onClick={(e) => {
                    e.stopPropagation();
                    deletePrizeMutation.mutate(p.id);
                  }}>
                    <i className="bi bi-x" />
                  </button>
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
          <AddSessionModal competitionId={competition.id} />
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
