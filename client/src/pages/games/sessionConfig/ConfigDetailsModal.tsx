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

  const deleteHandler = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteConfigMutation.mutate(id)
  }

  const ModalButton: ModalButton = ({ showModal }) => (
    <div className="card me-2" key={config.id}>
      <button className="btn"
        onClick={showModal}>
        <div className="card-body">
          <div className="card-title my-auto">
            <div className="row">
              <div className="col">
                {config.name}
              </div>
              <div className="col-2">
                <button className="btn btn-outline-danger px-1 py-0"
                  onClick={(e) => deleteHandler(config.id, e)}>
                  <i className="bi bi-x" />
                </button>
              </div>
            </div>
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
        <div className="modal-footer">
          <div className="text-end">
            <button className="btn btn-secondary"
              onClick={controls.hide}>Close</button>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}
