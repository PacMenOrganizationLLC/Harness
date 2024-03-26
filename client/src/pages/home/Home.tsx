import { Spinner } from "../../components/Spinner";
import { useGetCompetitionsQuery } from "../competitions/competitionHooks";
import { GamesCard } from "./GamesCard";
import { Playground } from "./Playground";
import { PrizeCard } from "./PrizeCard";

export const Home = () => {
  const competitionsQuery = useGetCompetitionsQuery();
  const competitions = competitionsQuery.data ?? [];

  if (competitionsQuery.isLoading) return <Spinner />;
  if (competitionsQuery.isError)
    return <h3 className="text-center">Error getting competitions</h3>;

  const now = new Date();
  const upcomingCompetitions = competitions.filter(
    (c) => new Date(c.endAt) >= now
  );

  return (
    <div className="container">
      <div className="mt-2">
        <PrizeCard
          competitions={upcomingCompetitions} />
      </div>
      <div className="row mt-2">
        <div className="col-md-6 col-lg col-12">
          <GamesCard />
        </div>
        <div className="col-md-6 col-12 my-1 my-md-0 ">
          <Playground />
        </div>
      </div>
    </div>
  );
};
