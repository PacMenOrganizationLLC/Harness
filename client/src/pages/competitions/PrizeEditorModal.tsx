import { ChangeEvent, FormEvent, useState } from "react";
import { CompetitionPrize } from "../../models/Competition";
import {
  useAddCompetitionPrizeMutation,
  useUpdateCompetitionPrizeMutation,
} from "./competitionHooks";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";
import { nameof } from "../../utils";

interface PrizeEditorModalProps {
  competitionId: number;
  existingPrize?: CompetitionPrize;
}

export const PrizeEditorModal = ({
  competitionId,
  existingPrize,
}: PrizeEditorModalProps) => {
  const addPrizeMutation = useAddCompetitionPrizeMutation();
  const updatePrizeMutation = useUpdateCompetitionPrizeMutation();
  const [prize, setPrize] = useState(
    existingPrize ??
      ({
        id: 0,
        prize: "",
        competitionId,
        placement: 1,
      } as CompetitionPrize)
  );
  const [reloadTrigger, SetTriggerReload] = useState(0);

  const editorControls = useModal("Prize Editor");
  const ModalButton: ModalButton = ({ showModal }) => (
    <>
      {existingPrize ? (
        <button
          className="btn btn-outline-secondary w-100"
          onClick={(e) => {
            e.stopPropagation();
            showModal();
          }}
        >
          <i className="bi bi-pencil" />
        </button>
      ) : (
        <button
          className="btn btn-sm btn-outline-info bi-plus-lg"
          onClick={showModal}
        />
      )}
    </>
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrize({ ...prize, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const base64 = dataUrl.split(",")[1];
        setPrize({ ...prize, imageData: base64, imageFilename: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (existingPrize) {
      updatePrizeMutation.mutate(prize);
    } else {
      addPrizeMutation.mutate(prize);
    }
    e.preventDefault();
    if (!existingPrize) {
      setPrize({
        id: 0,
        prize: "",
        competitionId,
        placement: 1,
      } as CompetitionPrize);
    }
    // const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    // if (fileInput) {
    //   fileInput.value = "";
    // }
    SetTriggerReload(() => reloadTrigger + 1);

    editorControls.hide();
  };

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
                  min={1}
                  max={100}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Image:
                <input
                  id="fileInput"
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Winner:
                <input
                  type="text"
                  name={nameof<CompetitionPrize>("winnerName")}
                  className="form-control"
                  onChange={handleChange}
                  value={prize.winnerName}
                  placeholder="Winner"
                />
              </label>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};
