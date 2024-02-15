import { ChangeEvent, FormEvent, useState } from "react";
import { CompetitionPrize } from "../../models/Competition";
import { useAddCompetitionPrizeMutation, useUpdateCompetitionPrizeMutation } from "./competitionHooks";
import { CustomModal, ModalButton, useModal } from "../../components/CustomModal";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { nameof } from "../../utils";

interface PrizeEditorModalProps {
  competitionId: number;
  existingPrize?: CompetitionPrize;
}

export const PrizeEditorModal = ({ competitionId, existingPrize }: PrizeEditorModalProps) => {
  const addPrizeMutation = useAddCompetitionPrizeMutation();
  const updatePrizeMutation = useUpdateCompetitionPrizeMutation();

  const [prize, setPrize] = useState(existingPrize ?? {
    id: 0,
    prize: "",
    competitionId,
    placement: 0,
  } as CompetitionPrize);

  const editorControls = useModal("Prize Editor");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingPrize ? (
        <button className="btn btn-outline-secondary" onClick={(e) => {
          e.stopPropagation();
          showModal();
        }}>
          <i className="bi bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-sm btn-outline-info bi-plus-lg" onClick={showModal} />
      )}
    </div>
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrize({ ...prize, [e.target.name]: e.target.value });
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (existingPrize) {
      updatePrizeMutation.mutate(prize);
    }
    else {
      addPrizeMutation.mutate(prize);
    }
    e.preventDefault();
    editorControls.hide();
  }

  return (
    <CustomModal ModalButton={ModalButton} controls={editorControls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">
            {existingPrize ? "Edit Prize" : "Add Prize"}
          </div>
          <button className="btn btn-close" onClick={editorControls.hide} />
        </div>
        <div className="modal-body d-block">
          <form onSubmit={submitHandler}>
            <div>
              <label className="form-label">
                Prize:
                <input
                  type="text"
                  name={nameof<CompetitionPrize>("prize")}
                  value={prize.prize}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Prize"
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Placement:
                <input
                  type="number"
                  name={nameof<CompetitionPrize>("placement")}
                  value={prize.placement}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Placement"
                />
              </label>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  )
}
