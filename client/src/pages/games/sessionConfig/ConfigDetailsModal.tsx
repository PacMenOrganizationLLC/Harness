import { FC } from "react"
import { GameConfigTemplate, SessionConfig } from "../../../models/SessionConfig"
import { CustomModal, ModalButton, useModal } from "../../../components/CustomModal"
import { useDeleteSessionConfigMutation } from "./sessionConfigHooks"

export const ConfigDetailsModal: FC<{
  config: SessionConfig,
  gameId: number
}> = ({ config, gameId }) => {
  const displayConfig: GameConfigTemplate[] = JSON.parse(config.jsonConfig)
  const deleteConfigMutation = useDeleteSessionConfigMutation(gameId);
  const controls = useModal("Session Config Details")

  const deleteHandler = () => {
    deleteConfigMutation.mutateAsync(config.id).then(() => {
      controls.hide();
    })
  }

  const ModalButton: ModalButton = ({ showModal }) => (
    <div className="card me-2" key={config.id}>
      <button className="btn"
        onClick={showModal}>
        <div className="card-body">
          <div className="card-title my-auto">
            {config.name}
          </div>
        </div>
      </button>
    </div>
  )
  return (
    <CustomModal ModalButton={ModalButton} controls={controls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fs-bold fs-4">
            {config.name}
          </div>
          <button className="btn-close"
            onClick={controls.hide}>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col">
              <div>Keys:</div>
            </div>
            <div className="col">
              <div>Values:</div>
            </div>
          </div>
          {displayConfig.map((c) => (
            <div className="row">
              <div className="col">
                <div>{c.key}</div>
              </div>
              <div className="col">
                <div>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="row my-2 text-center">
          <div className="col">
            <div className="btn btn-outline-danger"
              onClick={deleteHandler}>
              Delete
            </div>
          </div>
          <div className="col">
            <button className="btn btn-secondary"
              onClick={controls.hide}>Close</button>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}
