import { FC, FormEvent } from "react";
import { Game } from "../../models/Games";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAddGameInstructionsMutation } from "./gameHooks";
import { MarkdownUpload } from "../../components/MarkdownUpload";

export const InstructionsEditor: FC<{
  existingGame?: Game;
}> = ({ existingGame }) => {
  const navigate = useNavigate();
  const addInstructionsMutation = useAddGameInstructionsMutation(
    existingGame?.id
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const setSelectedTab = (newKey: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", newKey);
    setSearchParams(newSearchParams);
  };
  const rulesControl = useTextInput(existingGame?.gameRules ?? "");
  const gettingStartedControl = useTextInput(
    existingGame?.gettingStartedInstructions ?? ""
  );

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addInstructionsMutation
      .mutateAsync({
        rules: rulesControl.value,
        gettingStarted: gettingStartedControl.value,
      })
      .then(() => navigate("/games"));
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        <div className="col">
          <MarkdownUpload control={rulesControl} />
          {/* <TextInput
            control={rulesControl}
            label="Game Rules"
            labelClassName="col-12"
            isTextArea={true}
            rows={12}
          /> */}
        </div>
        <div className="col">
          <MarkdownUpload control={gettingStartedControl} />
          {/* <TextInput
            control={gettingStartedControl}
            label="Getting Started Instructions"
            labelClassName="col-12"
            isTextArea={true}
            rows={12}
          /> */}
        </div>
      </div>
      <div className="row text-center my-2">
        <div className="col">
          <button
            className="btn btn-secondary w-50"
            onClick={() => setSelectedTab("Game")}
          >
            Previous
          </button>
        </div>
        <div className="col">
          <button className="btn btn-bold w-50" type="submit">
            Done
          </button>
        </div>
      </div>
    </form>
  );
};
