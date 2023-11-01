import { FC } from "react"
import { useGetGameTemplateConfigurationQuery } from "./sessionConfigHooks";
import { CustomModal, ModalButton, useModal } from "../../../components/CustomModal";
import { NewConfigForm } from "./NewConfigForm";
import { Spinner } from "../../../components/Spinner";

export const AddSessionConfigModal: FC<{
  gameId: number,
}> = ({ gameId }) => {
  const gameTemplateQuery = useGetGameTemplateConfigurationQuery(gameId);
  const gameTemplate = gameTemplateQuery.data;

  const controls = useModal("Add Session Config")

  const ModalButton: ModalButton = ({ showModal }) => (
    <button className="btn btn-outline-info px-2 py-1"
      onClick={showModal}>
      <i className="bi bi-plus-lg" />
    </button>
  )

  const closeHandler = () => {
    controls.hide();
  }

  const configForm = () => {
    if (gameTemplate) {
      return <NewConfigForm template={gameTemplate}
        gameId={gameId}
        closeHandler={closeHandler} />
    }

    return <Spinner />
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
          {configForm()}
        </div>
      </div>
    </CustomModal>
  )
}
