import { useParams, useSearchParams } from "react-router-dom";
import { GameEditor } from "./GameEditor";
import { useGetGameQuery } from "./gameHooks";
import { Spinner } from "../../components/Spinner";
import { InstructionsEditor } from "./InstructionsEditor";
import { useState } from "react";
import { DockerEditor } from "./DockerEditor";

export const EditGame = () => {
  const id = useParams<{ id: string }>().id;
  const [gameId, setGameId] = useState(id || isNaN(Number(id)) ? Number(id) : undefined)
  const gameQuery = useGetGameQuery(gameId);
  const existingGame = gameQuery.data ?? undefined

  const tabs = [
    "Game",
    "Instructions",
    "Docker"
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const setSelectedTab = (newKey: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", newKey);
    setSearchParams(newSearchParams);
  };
  const tab = searchParams.get("tab");
  const selectedTab = tab ? tab : tabs.length > 0 ? tabs[0] : "";

  if (gameQuery.isFetching) return <Spinner />
  if (gameQuery.isError) return <h3 className="text-center">Error getting game</h3>

  return (
    <div className="container mt-2">
      <h1 className="text-center">{existingGame ? "Edit Game" : "New Game"}</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {tabs.map(t => (
            <li className={`breadcrumb-item ${selectedTab === t && "active text-bold"}`}
              role="button"
              onClick={() => setSelectedTab(t)}>
              {t}
            </li>
          ))}
        </ol>
      </nav>
      {selectedTab === "Game" && (
        <GameEditor existingGame={existingGame} setGameId={(g?: number) => setGameId(g)} />
      )}
      {selectedTab === "Instructions" && (
        <InstructionsEditor existingGame={existingGame} />
      )}
      {selectedTab === "Docker" && (
        <DockerEditor existingGame={existingGame} />
      )}
    </div>
  )
}
