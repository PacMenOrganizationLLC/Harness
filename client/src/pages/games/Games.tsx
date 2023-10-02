import { useGetGamesQuery } from "./gameHooks";

export const Games = () => {
  const gamesQuery = useGetGamesQuery();
  const games = gamesQuery.data ?? [];
  return (
    <div className="container">
      <h1 className="text-center">Games</h1>
      {games.map((g) => (
        <div>{g.name}</div>
      ))}
    </div>
  );
};
