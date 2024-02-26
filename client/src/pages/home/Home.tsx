import { Spinner } from "../../components/Spinner";
import { useGetCompetitionsQuery } from "../competitions/competitionHooks";
import { CompetitionCarousel } from "./CompetitionCarousel";
import { GamesCard } from "./GamesCard";
import { ScoreboardCarousel } from "./ScoreboardCarousel";

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

  const prizes = [
    {
      title: "Raspberry Pi",
      game: "Mars Rover",
      competition: "February Competition",
    },
    {
      title: "Bluetooth Headphones",
      game: "Mars Rover",
      competition: "February Competition",
    },
    {
      title: "Nintendo Switch",
      game: "Mars Rover",
      competition: "March Competition",
    },
    { title: "Nook", game: "SpaceWars", competition: "SpaceWars" },
  ];

  return (
    <div className="container">
      <CompetitionCarousel
        competitions={upcomingCompetitions}
        title="Upcoming Competitions"
      />
      <div className="row mt-1">
        <div className="col-md-8 col-lg col-12">
          <ScoreboardCarousel />
        </div>
        <div className="col-md col-12 my-1 my-md-0 ">
          <GamesCard />
        </div>
      </div>
      <div className="card bg-secondary-subtle w-100 my-2">
        <div className="card-body pt-1">
          <div className="card-title fw-bold text-center fs-4">
            Available Prizes
          </div>
          <div className="d-flex flex-wrap">
            {prizes.map((p) => (
              <div className="card mx-1 mb-1" key={p.title}>
                <div className="card-body text-center">
                  <div className="card-title fw-bold">{p.title}</div>
                  <div>{p.game}</div>
                  <div>{p.competition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
