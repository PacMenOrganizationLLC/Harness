import { Spinner } from "../../components/Spinner";
import { useGetCompetitionsQuery } from "../competitions/competitionHooks";
import { CompetitionCarousel } from "./CompetitionCarousel";
import { ScoreboardCarousel } from "./ScoreboardCarousel";

export const Home = () => {
  const competitionsQuery = useGetCompetitionsQuery();
  const competitions = competitionsQuery.data ?? [];

  if (competitionsQuery.isLoading) return <Spinner />;
  if (competitionsQuery.isError) return <h3 className="text-center">Error getting competitions</h3>;
  if (!competitionsQuery.data) return <h3 className="text-center">Unable to get competitions</h3>;

  const now = new Date();
  const pastCompetitions = competitions.filter(c => new Date(c.endAt) < now)
  const upcomingCompetitions = competitions.filter(c => new Date(c.endAt) >= now)

  return (
    <div className="container">
      <CompetitionCarousel competitions={upcomingCompetitions} title="Upcoming Competitions" />
      <div className="row mt-1">
        <div className="col-md-8 col-lg col-12">
          <ScoreboardCarousel />
        </div>
        <div className="col-md col-12 my-1 my-md-0">
        </div>
      </div>
      <CompetitionCarousel competitions={pastCompetitions.reverse()} title="Past Competitions" />
    </div>
  );
};
