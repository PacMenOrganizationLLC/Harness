import { useParams } from "react-router-dom"
import { useGetCompetitionQuery } from "./competitionHooks"
import { Spinner } from "../../components/Spinner"

export const CompetitionDetails = () => {
  const competitionId = useParams<{ id: string }>().id
  const competitionQuery = useGetCompetitionQuery(Number(competitionId))

  if (competitionQuery.isLoading) return <Spinner />
  if (competitionQuery.isError) return <div>Error getting competition</div>
  if (!competitionQuery.data) return <div>Could not get competition</div>

  return (
    <div>{competitionQuery.data.location}</div>
  )
}
