import { FC, useState } from "react"
import { GameConfigTemplate } from "../../../models/SessionConfig"
import { TextInput, useTextInput } from "../../../components/forms/TextInput"

export const EditConfig: FC<{
  config: GameConfigTemplate,
  editHandler: (c: GameConfigTemplate) => void
}> = ({ config, editHandler }) => {
  const [isEditing, setIsEditing] = useState(false)
  const valueControl = useTextInput(config.value)

  const updateConfigHandler = () => {
    const updatedConfig: GameConfigTemplate = {
      key: config.key,
      value: valueControl.value
    }
    editHandler(updatedConfig)
    setIsEditing(false)
  }

  if (isEditing) return (
    <div className="row my-1">
      <div className="col my-auto">
        <TextInput control={valueControl}
          label={config.key} />
      </div>
      <div className="col-auto">
        <button className="btn btn-outline-success"
          onClick={updateConfigHandler}>
          <i className="bi-check-lg" />
        </button>
      </div>
    </div>
  )
  return (
    <div className="row my-1">
      <div className="col my-auto">
        <div>{config.key}: {config.value}</div>
      </div>
      <div className="col-auto">
        <button className="btn btn-outline-secondary"
          onClick={() => setIsEditing(true)}>
          <i className="bi-pencil" />
        </button>
      </div>
    </div>
  )
}
