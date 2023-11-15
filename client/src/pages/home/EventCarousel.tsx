import React from "react";
import Event from "../../models/Event";

interface EventCarouselProps {
  events: Event[];
  name: string;
  carouselId: string;
}

const EventCarousel: React.FC<EventCarouselProps> = ({
  events,
  name,
  carouselId,
}) => {
  return (
    <div className="row my-5">
      <h1 className="text-center my-3">{name}</h1>
      <div className="col-2 text-end">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
      </div>
      <div className="col-8">
        <div id={carouselId} className="carousel slide">
          <div className="carousel-inner">
            {events.map((e, index) => (
              <div
                className={`text-center carousel-item ${
                  index === 0 ? "active" : ""
                }`}
                key={index}
              >
                <h2>{e.name}</h2>
                <h1>{new Date(e.day).toDateString()}</h1>
                <h1>{e.location}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-2 text-start">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default EventCarousel;
