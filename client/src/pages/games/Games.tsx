import { useGetGamesQuery } from "./gameHooks";

export const Games = () => {
  const gamesQuery = useGetGamesQuery();
  return (
    <div className="container">
      <h1 className="text-center">Games</h1>
    </div>
  );
};
