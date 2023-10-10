import { FC } from "react"
import { useGetGameTemplateConfigurationQuery } from "./sessionConfigHooks";
import { Spinner } from "../../../components/Spinner";
import { CustomModal, ModalButton, useModal } from "../../../components/CustomModal";
import { NewConfigForm } from "./NewConfigForm";

export const AddSessionConfigModal: FC<{
  gameId: number,
}> = ({ gameId }) => {
  const gameTemplateQuery = useGetGameTemplateConfigurationQuery(gameId);
  const gameTemplate = gameTemplateQuery.data ?? [];

  const controls = useModal("Add Session Config", "xl")

  if (gameTemplateQuery.isLoading) return (
    <div className="text-center">
      <h3>Loading starting config template...</h3>
      <Spinner />
    </div>
  )

  const ModalButton: ModalButton = ({ showModal }) => (
    <button className="btn btn-outline-secondary px-2 py-1"
      onClick={showModal}>
      <div className="card-body p-0">
        <div className="card-title my-auto">
          <i className="bi bi-plus-lg" />
        </div>
      </div>
    </button>
  )

  const closeHandler = () => {
    controls.hide();
  }


  return (
    <CustomModal ModalButton={ModalButton} controls={controls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fs-bold fs-4">
            New Session Config
          </div>
          <button className="btn-close"
            onClick={closeHandler}>
          </button>
        </div>
        <div className="modal-body">
          <NewConfigForm template={gameTemplate}
            gameId={gameId}
            closeHandler={closeHandler} />
        </div>
      </div>
    </CustomModal>
  )
}
