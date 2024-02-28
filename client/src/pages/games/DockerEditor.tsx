import { FC, FormEvent } from "react"
import { DockerConfig, Game } from "../../models/Game";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NumericInput, useNumericInput } from "../../components/forms/NumbericInput";
import { useAddDockerConfigMutation } from "./gameHooks";

export const DockerEditor: FC<{
  existingGame?: Game;
}> = ({ existingGame }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const addDockerConfigMutation = useAddDockerConfigMutation(existingGame?.id);

  const imageControl = useTextInput(existingGame?.dockerImage ?? "")
  const apiSubPathControl = useTextInput(existingGame?.apiSubPath ?? "")
  const durationControl = useNumericInput(existingGame?.duration ?? 60);
  const maxAmountControl = useNumericInput(existingGame?.maxAmount ?? 10);
  const internalPortControl = useNumericInput(existingGame?.internalPort ?? 80);

  const setSelectedTab = (newKey: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", newKey);
    setSearchParams(newSearchParams);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dockerConfig: DockerConfig = {
      dockerImage: imageControl.value,
      duration: durationControl.value,
      maxAmount: maxAmountControl.value,
      apiSubPath: apiSubPathControl.value,
      internalPort: internalPortControl.value
    }
    addDockerConfigMutation.mutateAsync(dockerConfig)
      .then(() => navigate("/games"))
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        <div className="col">
          <TextInput
            control={imageControl}
            label="Docker Image"
            placeholder="cwighty/mars-web"
            labelClassName="col-12"
          />
        </div>
        <div className="col">
          <TextInput
            control={apiSubPathControl}
            label="API Subpath - What players should append to the host url to hit the api"
            placeholder="/api"
            labelClassName="col-12"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <NumericInput
            control={durationControl}
            min={1}
            max={1440}
            label="Session Duration - How long the sessions are live (minutes)"
            labelClassName="col-12"
          />
        </div>
        <div className="col-3">
          <NumericInput
            control={maxAmountControl}
            min={1}
            max={100}
            label="Maximum number of sessions at one time"
            labelClassName="col-12"
          />
        </div>
        <div className="col-3">
          <NumericInput
            control={internalPortControl}
            min={0}
            max={65535}
            label="Internal docker port your container uses"
            labelClassName="col-12"
          />
        </div>
      </div>
      <div className="row text-center my-4">
        <div className="col">
          <button
            className="btn btn-secondary w-50"
            type="button"
            onClick={() => setSelectedTab("Game")}
          >
            Previous
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-bold w-50"
            type="submit"
          >
            Done
          </button>
        </div>
      </div>
    </form>
  )
}
