import { FC, FormEvent, useState } from "react";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";
import { useAddSessionMutation } from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { useGetGamesQuery } from "../games/gameHooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddSessionModal: FC<{
  competitionId?: number,
}> = ({ competitionId }) => {
  const [selectedGameId, setSelectedGameId] = useState<number | undefined>(undefined)
  const navigate = useNavigate();
  const addSessionMutation = useAddSessionMutation(competitionId);
  const gamesQuery = useGetGamesQuery();
  const games = gamesQuery.data ?? [];

  const AddSessionControl = useModal("Add Session");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      <button className="btn btn-outline-bold px-2 py-1" onClick={showModal}>
        New
      </button>
    </div>
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedGameId) {
      toast.error("Please select game")
      return
    }
    addSessionMutation.mutateAsync(selectedGameId).then((id) => {
      navigate(`/session/${id}`)
      closeHandler();
    });
  };

  const closeHandler = () => {
    setSelectedGameId(undefined);
    AddSessionControl.hide();
  };

  const disabled = games.length === 0 || !selectedGameId
  return (
    <CustomModal ModalButton={ModalButton} controls={AddSessionControl}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">Add Session</div>
          <button className="btn btn-close" onClick={closeHandler}></button>
        </div>
        <div className="modal-body">
          {addSessionMutation.isLoading || gamesQuery.isLoading ? (
            <Spinner />
          ) : (
            <form onSubmit={submitHandler}>
              <div>Please select which game you'd like to create a session for:</div>
              {games.map((g) => (
                <div className="form-check" key={g.id}>
                  <input className="form-check-input"
                    type="radio"
                    name={`game${g.id}`}
                    id={`game${g.id}`}
                    onChange={() => setSelectedGameId(g.id)}
                    checked={selectedGameId === g.id} />
                  <label className="form-check-label"
                    htmlFor={`game${g.id}`}>
                    {g.name}
                  </label>
                </div>
              ))}
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
                    disabled={disabled}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </CustomModal>
  );
};
