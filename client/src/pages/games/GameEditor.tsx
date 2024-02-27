import { FC, FormEvent, useState } from 'react'
import { Game } from '../../models/Games'
import ImageSubmit from '../../components/ImageSubmit';
import { useTextInput, TextInput } from '../../components/forms/TextInput';
import { GameDto } from '../../models/GameDto';
import { useAddGameMutation, useUpdateGameMutation } from './gameHooks';
import { Link, useSearchParams } from 'react-router-dom';

export const GameEditor: FC<{
  existingGame?: Game
  setGameId: (id?: number) => void
}> = ({ existingGame, setGameId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setSelectedTab = (newKey: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", newKey);
    setSearchParams(newSearchParams);
  };
  const addGameMutation = useAddGameMutation();
  const updateGameMutation = useUpdateGameMutation();
  const nameControl = useTextInput(existingGame?.name ?? "");
  const repoLinkControl = useTextInput(existingGame?.repoLink ?? "");
  const detailsControl = useTextInput(existingGame?.details ?? "");

  const [image, setImage] = useState<FormData>();
  const handleSetConvertedSrc = (imageSrc: FormData | undefined) => {
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGame: GameDto = {
      id: existingGame?.id ?? 0,
      name: nameControl.value,
      repoLink: repoLinkControl.value,
      details: detailsControl.value,
      createdAt: new Date(),
      ImageFile: image,
    };
    if (existingGame) {
      updateGameMutation.mutate(newGame);
    } else {
      addGameMutation.mutateAsync(newGame).then(g => setGameId(g));
    }
    setSelectedTab("Instructions")
  };

  const canSubmit =
    nameControl.value !== ""
  return (
    <form onSubmit={submitHandler}>
      <TextInput
        control={nameControl}
        label="*Name"
        labelClassName="col-12"
      />
      <TextInput
        control={repoLinkControl}
        label="Repo Link"
        placeholder="https://github.com/your_repo"
        labelClassName="col-12"
      />
      <TextInput
        control={detailsControl}
        label="Details"
        placeholder="Rules, Instructions, etc."
        isTextArea={true}
        labelClassName="col-12"
      />
      <div className="mt-2">
        <ImageSubmit setConvertedSrc={handleSetConvertedSrc} />
      </div>
      <div className="small">*Required</div>
      <div className="row text-center my-2">
        <div className="col">
          <Link to={"/games"}
            className="btn btn-secondary w-50"
            type="button"
          >
            Cancel
          </Link>
        </div>
        <div className="col">
          <button
            className="btn btn-bold w-50"
            disabled={!canSubmit}
            type="submit"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
