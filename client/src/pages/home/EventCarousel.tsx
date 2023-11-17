import React from "react";
import Event from "../../models/Event";

interface EventCarouselProps {
  events: Event[];
  carouselId: string;
}

export const EventCarousel: React.FC<EventCarouselProps> = ({
  events,
  carouselId,
}) => {
  return (
    <div id={`carouselExampleControls${carouselId}`}
      className="carousel slide"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        {events.map((e, index) => (
          <div key={index}
            className={`text-center carousel-item ${index === 0 && "active"}`}>
            <div className="fw-bold fs-4">{e.name}</div>
            <div className="fs-5">{new Date(e.day).toDateString()}</div>
            <div>{e.location}</div>
          </div>
        ))}
      </div>
      {events.length > -1 && (
        <>
          <button className="carousel-control-prev"
            type="button"
            data-bs-target={`#carouselExampleControls${carouselId}`}
            data-bs-slide="prev">
            <i className="bi-chevron-compact-left fs-1 text-secondary" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next"
            type="button"
            data-bs-target={`#carouselExampleControls${carouselId}`}
            data-bs-slide="next">
            <i className="bi-chevron-compact-right fs-1 text-secondary" />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  )
};
