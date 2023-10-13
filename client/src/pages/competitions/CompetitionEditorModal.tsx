import { Competition } from "../../models/Competition";
import { useAddCompetitionMutation, useUpdateCompetitionMutation } from "./competitionHooks";
import { useGetGamesQuery } from "../games/gameHooks";
import { FC, FormEvent, useState } from "react";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { Spinner } from "../../components/Spinner";
import { CustomModal, ModalButton, useModal } from "../../components/CustomModal";
import { SelectInput, useSelectInput } from "../../components/forms/SelectInput";

interface CompetitionEditorModalProps {
  eventId: number;
  existingCompetition?: Competition;
}

export const CompetitionEditorModal: FC<CompetitionEditorModalProps> = (
  { eventId, existingCompetition }
) => {
  const addCompetitionMutation = useAddCompetitionMutation();
  const updateCompetitionMutation = useUpdateCompetitionMutation();

  const getGamesQuery = useGetGamesQuery();
  const games = getGamesQuery.data ?? [];

  const gameControl = useSelectInput(
    existingCompetition ? existingCompetition.gameId : games[0]?.id,
    games,
    (game) => game.id,
    (game) => game.name
  );

  const [startAt, setStartAt] = useState(existingCompetition ? extractTime(existingCompetition.startAt) : "");
  const [endAt, setEndAt] = useState(existingCompetition ? extractTime(existingCompetition.endAt) : "");
  const locationControl = useTextInput(existingCompetition?.location ?? "");

  const competitionEditorControls = useModal("Competition Editor");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingCompetition ? (
        <button className="btn btn-outline-secondary" onClick={showModal}>
          <i className="bi bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-outline-info" onClick={showModal}>
          New
        </button>
      )}
    </div>
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCompetition: Competition = {
      id: existingCompetition?.id ?? 0,
      gameId: gameControl.value as number,
      eventId: eventId,
      startAt: timeToDate(startAt),
      endAt: timeToDate(endAt),
      location: locationControl.value,
    };
    if (existingCompetition) {
      updateCompetitionMutation.mutate(newCompetition);
    } else {
      addCompetitionMutation.mutate(newCompetition);
    }
    closeHandler();
  };

  const closeHandler = () => {
    if (!existingCompetition) {
      gameControl.setValue(0)
      setStartAt("")
      setEndAt("")
      locationControl.setValue("")
    }
    competitionEditorControls.hide();
  }

  if (getGamesQuery.isLoading) return <Spinner />;
  if (getGamesQuery.isError) return <div>Error getting games</div>;
  if (!games) return <div>No games found</div>;

  const canSubmit =
    gameControl.value !== 0 && locationControl.value !== "" && startAt < endAt;

  return (
    <CustomModal ModalButton={ModalButton} controls={competitionEditorControls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">
            {existingCompetition ? "Edit Competition" : "New Competition"}
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <SelectInput control={gameControl} label="Game" />
            <div className="row mt-2">
              <label className="form-label col">
                Start At:
                <input type="time" value={startAt} className="form-control" onChange={(e) => setStartAt(e.target.value)} />
              </label>
              <label className="form-label col">
                End At:
                <input type="time" value={endAt} className="form-control" onChange={(e) => setEndAt(e.target.value)} />
              </label>
            </div>
            <TextInput control={locationControl} label="Location" />
            <div className="row text-center my-2">
              <div className="col">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeHandler}
                >
                  Close
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  disabled={!canSubmit}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

function extractTime(date: Date): string {
  const actualDate = new Date(date);
  const hours = actualDate.getHours();
  const minutes = actualDate.getMinutes();
  return `${hours}:${minutes}`;
}

function timeToDate(time: string): Date {
  const [hours, minutes] = time.split(':');
  const newDate = new Date();
  newDate.setHours(Number(hours));
  newDate.setMinutes(Number(minutes));
  return newDate;
}