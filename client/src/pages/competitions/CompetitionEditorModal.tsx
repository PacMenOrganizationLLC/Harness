import { Competition } from "../../models/Competition";
import { useAddCompetitionMutation, useUpdateCompetitionMutation } from "./competitionHooks";
import { useGetGamesQuery } from "../games/gameHooks";
import { FC, FormEvent, useState } from "react";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { Spinner } from "../../components/Spinner";
import { CustomModal, ModalButton, useModal } from "../../components/CustomModal";
import { SelectInput, useSelectInput } from "../../components/forms/SelectInput";
import toast from "react-hot-toast";
import { FormatDatetimeLocalInput } from "../../helpers/dateAndTimeHelpers";

interface CompetitionEditorModalProps {
  existingCompetition?: Competition;
}

export const CompetitionEditorModal: FC<CompetitionEditorModalProps> = (
  { existingCompetition }
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

  const [startAt, setStartAt] = useState(existingCompetition?.startAt ?? new Date());
  const [endAt, setEndAt] = useState(existingCompetition?.endAt ?? new Date());
  const locationControl = useTextInput(existingCompetition?.location ?? "");
  const nameControl = useTextInput(existingCompetition?.name ?? "");

  const competitionEditorControls = useModal("Competition Editor");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingCompetition ? (
        <button className="btn btn-outline-secondary" onClick={(e) => {
          e.stopPropagation();
          showModal();
        }}>
          <i className="bi bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-outline-info px-2 py-1" onClick={showModal}>
          <i className="bi-plus-lg" />
        </button>
      )}
    </div>
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startAt && endAt) {
      const newCompetition: Competition = {
        id: existingCompetition?.id ?? 0,
        gameId: gameControl.value as number,
        startAt: startAt,
        endAt: endAt,
        location: locationControl.value,
        name: nameControl.value,
      };
      if (existingCompetition) {
        updateCompetitionMutation.mutate(newCompetition);
      } else {
        addCompetitionMutation.mutate(newCompetition);
      }
      closeHandler();
    }
    else {
      toast.error("Invalid Dates")
    }
  };

  const closeHandler = () => {
    if (!existingCompetition) {
      gameControl.setValue(0)
      setStartAt(new Date())
      setEndAt(new Date())
      locationControl.setValue("")
    }
    competitionEditorControls.hide();
  }

  if (getGamesQuery.isLoading) return <Spinner />;
  if (getGamesQuery.isError) return <div>Error getting games</div>;
  if (!games) return <div>No games found</div>;

  const canSubmit =
    gameControl.value !== 0 && locationControl.value !== "" && startAt && endAt && startAt < endAt;

  return (
    <CustomModal ModalButton={ModalButton} controls={competitionEditorControls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">
            {existingCompetition ? "Edit Competition" : "New Competition"}
          </div>
          <button className="btn btn-close" onClick={closeHandler}></button>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <TextInput control={nameControl} label="Name" />
            <SelectInput control={gameControl} label="Game" />
            <div className="row mt-2">
              <label className="form-label col">
                Start At:
                <input type="datetime-local" value={FormatDatetimeLocalInput(startAt)} className="form-control" onChange={(e) => setStartAt(new Date(e.target.value))} />
              </label>
              <label className="form-label col">
                End At:
                <input type="datetime-local" value={FormatDatetimeLocalInput(endAt)} className="form-control" onChange={(e) => setEndAt(new Date(e.target.value))} />
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
