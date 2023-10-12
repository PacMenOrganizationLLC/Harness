import { Competition } from "../../models/Competition";
import {
  useAddCompetitionMutation,
  useUpdateCompetitionMutation,
} from "./competitionHooks";
import { useGetGamesQuery } from "../games/gameHooks";
import { FC, FormEvent, useState } from "react";
import { CustomParamsSerializer } from "axios";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { Spinner } from "../../components/Spinner";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";

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

  const [gameId, setGameId] = useState(props.existingCompetition?.gameId ?? -1);
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
      gameId: gameId,
      eventId: props.eventId,
      startAt: startAt,
      endAt: endAt,
      location: locationControl.value,
    };
  };

  const closeHandler = () => {
    setGameId(0)
    setStartAt(new Date())
    setEndAt(new Date())
    locationControl.setValue("")
  }

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
            <div className="row">
              <label className="form-label col">
                Start At:
                <input type="date" className="form-control" />
              </label>
              <label className="form-label col">
                End At:
                <input type="date" className="form-control" />
              </label>
            </div>
            <TextInput control={locationControl} label="Location" />
            <div className="row text-center my-2">
              <div className="col">
                <button className="btn btn-secondary"
                  type="button"
                  onClick={closeHandler}>Close</button>
              </div>
              <div className="col">
                <button className="btn btn-primary"
                  // disabled={!canSubmit}
                  type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};
