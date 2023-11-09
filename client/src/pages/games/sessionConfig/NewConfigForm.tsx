import { FC, FormEvent, useState } from "react"
import { GameConfigTemplate, SessionConfig } from "../../../models/SessionConfig"
import { useAddSessionConfigMutation } from "./sessionConfigHooks"
import { TextInput, useTextInput } from "../../../components/forms/TextInput"

export const NewConfigForm: FC<{
  template: GameConfigTemplate[],
  gameId: number
  closeHandler: () => void
}> = ({ template, gameId, closeHandler }) => {
  const addConfigMutation = useAddSessionConfigMutation(gameId)
  const [configs, setConfigs] = useState(template)
  const nameControl = useTextInput("")

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newConfig: SessionConfig = {
      id: 0,
      name: nameControl.value,
      jsonConfig: JSON.stringify(configs),
      gameId: gameId
    }
    addConfigMutation.mutateAsync(newConfig).then(() => {
      nameControl.setValue("")
    })
    closeHandler();
  }

  const handleInputChange = (index: number, value: string) => {
    const updatedArray = [...configs];
    updatedArray[index].value = value;
    setConfigs(updatedArray);
  };

  return (
    <form onSubmit={submitHandler}>
      <TextInput control={nameControl}
        label="Name" />
      {template.map((t, index) => (
        <div key={index} className="row my-2">
          <div className="col">
            <div className="small">Key:</div>
            <div className="mt-2">{t.key}</div>
          </div>
          <div className="col">
            <label htmlFor={"value" + index}
              className="form-label mb-0 small">Value:</label>
            <input type="text"
              name={"value" + index}
              id={"value" + index}
              className="form-control"
              value={t.value}
              onChange={(e) => handleInputChange(index, e.target.value)} />
          </div>
        </div>
      ))}
      <div className="row text-center my-2">
        <div className="col">
          <button className="btn btn-secondary"
            type="button"
            onClick={closeHandler}>Close</button>
        </div>
        <div className="col">
          <button className="btn btn-primary"
            type="submit"
            disabled={nameControl.value === ""}>Save</button>
        </div>
      </div>
    </form>
  )
}
