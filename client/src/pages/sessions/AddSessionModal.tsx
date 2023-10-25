import { FC, FormEvent } from "react";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";
import { useAddSessionMutation } from "./sessionHooks";
import { Session } from "../../models/Session";

export const AddSessionModal: FC<{
  competitionId: number
}> = ({ competitionId }) => {
  const addSessionMutation = useAddSessionMutation(competitionId);

  const nameControl = useTextInput("");

  const AddSessionControl = useModal("Add Session");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      <button className="btn btn-outline-info px-2 py-1" onClick={showModal}>
        <i className="bi-plus-lg" />
      </button>
    </div>
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSession: Session = {
      id: 0,
      competitionId,
      name: nameControl.value,
      playId: 'test_play_id',
      creationDate: new Date()
    };

    addSessionMutation.mutateAsync(newSession).then(() => {
      closeHandler();
    });
  };

  const closeHandler = () => {
    nameControl.setValue("");
    AddSessionControl.hide();
  };

  const canSubmit = nameControl.value !== "";

  return (
    <CustomModal ModalButton={ModalButton} controls={AddSessionControl}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">Add Session</div>
          <button className="btn btn-close" onClick={closeHandler}></button>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <TextInput control={nameControl} label="Name" />
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
