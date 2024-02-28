import { FC } from "react"
import { Game } from "../../models/Game"

export const GameList: FC<{
  games: Game[],
  selectedGame?: Game,
  setSelectedGame: (g: Game) => void
}> = ({ games, selectedGame, setSelectedGame }) => {
  return (
    <div className="list-group shadow-sm">
      {games.map((g) => (
        <div className={`list-group-item list-group-item-action text-truncate
          ${g.id === selectedGame?.id && "active"}`}
          onClick={() => setSelectedGame(g)}
          key={g.id}>
          {g.name}
        </div>
      ))}
    </div>
  )
}
