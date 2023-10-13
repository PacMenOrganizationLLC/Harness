import { Competition } from "../../models/Competition";
import {
  useAddCompetitionMutation,
  useUpdateCompetitionMutation,
} from "./competitionHooks";
import { useGetGamesQuery } from "../games/gameHooks";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { Spinner } from "../../components/Spinner";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";
import {
  SelectInput,
  useSelectInput,
} from "../../components/forms/SelectInput";

interface CompetitionEditorModalProps {
  eventId: number;
  existingCompetition?: Competition;
}

export const CompetitionEditorModal: FC<CompetitionEditorModalProps> = (
  props: CompetitionEditorModalProps
) => {
  const addCompetitionMutation = useAddCompetitionMutation();
  const updateCompetitionMutation = useUpdateCompetitionMutation();

  const getGamesQuery = useGetGamesQuery();
  const games = getGamesQuery.data ?? [];

  const gameControl = useSelectInput(
    props.existingCompetition?.gameId ?? games[0]?.id ?? 0,
    games,
    (game) => game.id,
    (game) => game.name
  );

  const [startAt, setStartAt] = useState(
    props.existingCompetition?.startAt ?? new Date()
  );
  const [endAt, setEndAt] = useState(
    props.existingCompetition?.endAt ?? new Date()
  );
  const locationControl = useTextInput(
    props.existingCompetition?.location ?? ""
  );

  const competitionEditorControls = useModal("Competition Editor");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {props.existingCompetition ? (
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
      id: props.existingCompetition?.id ?? 0,
      gameId: gameControl.value as number,
      eventId: props.eventId,
      startAt: startAt,
      endAt: endAt,
      location: locationControl.value,
    };
    if (props.existingCompetition) {
      updateCompetitionMutation.mutate(newCompetition);
    } else {
      addCompetitionMutation.mutate(newCompetition);
    }
    closeHandler();
  };

  const closeHandler = () => {
    gameControl.setValue(0);
    setStartAt(new Date());
    setEndAt(new Date());
    locationControl.setValue("");
    competitionEditorControls.hide();
  };

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
    setDate: (date: Date) => void
  ) => {
    const timeValue = e.target.value;
    const [hours, minutes] = timeValue.split(":");
    const newDate = new Date();
    newDate.setHours(Number(hours));
    newDate.setMinutes(Number(minutes));
    setDate(newDate);
  };

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
            {props.existingCompetition ? "Edit Competition" : "New Competition"}
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <SelectInput control={gameControl} label="Game" />
            <div className="row mt-2">
              <label className="form-label col">
                Start At:
                <input
                  type="time"
                  className="form-control"
                  onChange={(e) => handleTimeChange(e, setStartAt)}
                />
              </label>
              <label className="form-label col">
                End At:
                <input
                  type="time"
                  className="form-control"
                  onChange={(e) => handleTimeChange(e, setEndAt)}
                />
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
