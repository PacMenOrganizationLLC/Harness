import { useGetGamesQuery } from "./gameHooks";

export const Games = () => {
  const gamesQuery = useGetGamesQuery();
  const games = gamesQuery.data ?? [];
  console.log(games);
  return (
    <div className="container">
      <h1 className="text-center">Games</h1>
      {games.map((g: any) => (
        <div>{g.date}</div>
      ))}
    </div>
  );
};
