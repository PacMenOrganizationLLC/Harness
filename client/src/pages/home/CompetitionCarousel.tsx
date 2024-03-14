import React, { FC, useEffect, useState } from "react";
import { Competition } from "../../models/Competition";
import { CompetitionCard } from "../../components/CompetitionCard";

export const CompetitionCarousel: FC<{
  competitions: Competition[];
  title: string;
}> = ({ competitions, title }) => {
  const [viewIndex, setViewIndex] = useState(1);
  const [viewCount, setViewCount] = useState(4);
  const maxIndex = Math.ceil(competitions.length / viewCount);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1440) {
        setViewCount(4);
      } else if (screenWidth >= 1024) {
        const newCount = 3;
        setViewCount(newCount);
      } else if (screenWidth >= 768) {
        const newCount = 2;
        setViewCount(newCount);
      } else {
        setViewCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (viewIndex > maxIndex) {
      setViewIndex(maxIndex);
    }
  }, [viewIndex, competitions, viewCount, setViewCount, maxIndex]);

  const incrementViewIndex = () => {
    const newIndex =
      (viewIndex + 1) % (Math.ceil(competitions.length / viewCount) + 1);
    setViewIndex(newIndex === 0 ? 1 : newIndex);
  };
  const decrementViewIndex = () => {
    const newIndex = (viewIndex - 1) % (maxIndex + 1);
    setViewIndex(newIndex === 0 ? maxIndex : newIndex);
  };

  return (
    <>
      <div className="text-center mt-2 fs-4 fw-bold">{title}</div>
      {competitions.length > viewCount && (
        <div className="d-flex align-items-end justify-content-end">
          {viewCount === competitions.length ? (
            <button
              className="btn btn-sm text-muted"
              onClick={() => window.dispatchEvent(new Event("resize"))}
            >
              <span className="text-bold">Hide</span>
            </button>
          ) : (
            <button
              className="btn btn-sm text-muted"
              onClick={() => setViewCount(competitions.length)}
            >
              <span className="text-bold">View All</span>
            </button>
          )}
        </div>
      )}
      <div className="row">
        {competitions.length > viewCount && (
          <button
            className="btn col-auto px-0 my-auto border-0"
            onClick={decrementViewIndex}
          >
            <i className="bi bi-chevron-compact-left fs-1"></i>
          </button>
        )}
        <div className="col my-auto">
          <div className="row">
            {competitions.map((c, index) => (
              <React.Fragment key={index}>
                {index <= viewIndex * viewCount - 1 &&
                  index >= (viewIndex - 1) * viewCount && (
                    <div
                      className="col-12 col-md-6 col-lg-4 col-xl-3 my-1"
                    >
                      <CompetitionCard competition={c} />
                    </div>
                  )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {competitions.length > viewCount && (
          <button
            className="btn px-0 col-auto my-auto border-0"
            onClick={incrementViewIndex}
          >
            <i className="bi bi-chevron-compact-right fs-1"></i>
          </button>
        )}
      </div>
    </>
  );
};
