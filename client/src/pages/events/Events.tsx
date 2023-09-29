import classes from "../../assets/WideContainer.module.scss";

export const Events = () => {
  return (
    <div className={classes.customContainer}>
      <div className="row">
        <div className="col border" style={{ height: "100ex" }}>
          <div className="text-center fs-4">Events</div>
        </div>
        <div className="col border-start border-end border">
          <div className="text-center fs-4">Competitions</div>
        </div>
        <div className="col border-start border-end border">
          <div className="text-center fs-4">Sessions</div>
        </div>
      </div>
    </div>
  );
};
