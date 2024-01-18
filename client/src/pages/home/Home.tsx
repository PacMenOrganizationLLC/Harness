import { Spinner } from "../../components/Spinner";
import { useGetCompetitionsQuery } from "../competitions/competitionHooks";
import { CompetitionCarousel } from "./CompetitionCarousel";

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
    <>
      <div className="row">
        <div className="col">
          <div className="text-center my-3 fs-3 fw-bold">Past Competitions</div>
          <CompetitionCarousel competitions={pastCompetitions} carouselId="carouselPast" />
        </div>
        <div className="col">
          <div className="text-center my-3 fs-3 fw-bold">Upcoming Competitions</div>
          <CompetitionCarousel competitions={upcomingCompetitions} carouselId="carouselFuture" />
        </div>
      </div>
    </>
  );
};
