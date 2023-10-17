import { Session } from "../sessions/Session";

export const Home = () => {
  return (
    <div className="container">
      <Session sessionId={2} />
    </div>
  );
};
