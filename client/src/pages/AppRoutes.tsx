import { Route, Routes } from 'react-router-dom'
import { AuthRequired } from '../AuthRequired'
import { Spinner } from '../components/Spinner'
import { CompetitionDetails } from './competitions/CompetitionDetails'
import { CompetitionList } from './competitions/CompetitionList'
import { EditGame } from './games/EditGame'
import { Games } from './games/Games'
import { GameInfo } from './home/GameInfo'
import { Home } from './home/Home'
import { Session } from './sessions/Session'
import { useIsAdmin } from '../userHooks'
import { CookieRequired } from '../CookieRequired'

export const AppRoutes = () => {

  const isAdmin = useIsAdmin();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jonathan" element={<Spinner />} />
      <Route path="/competitions" element={<CompetitionList />} />
      <Route path="/game/:id" element={<GameInfo />} />
      <Route path="/game/edit/:id" element={<EditGame />} />
      <Route path="/competition/:id" element={<CookieRequired><CompetitionDetails /></CookieRequired>} />
      <Route path="/session/:id" element={<Session />} />
      {isAdmin &&
        <Route path="/games" element={<AuthRequired><Games /></AuthRequired>} />
      }
    </Routes>
  )
}
