import { CompetitionEditorModal } from "../competitions/CompetitionEditorModal";

export const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center">Hello</h1>
      <CompetitionEditorModal eventId={1}/>
    </div>
  );
};
