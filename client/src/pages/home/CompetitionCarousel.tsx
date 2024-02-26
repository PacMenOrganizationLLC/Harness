import { FC, useEffect, useState } from "react";
import { Competition } from "../../models/Competition";
import { FormatDate, getTimeNoSeconds } from "../../helpers/dateAndTimeHelpers";
import { Link } from "react-router-dom";

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
      <div className="row">
        <div className="col offset-2">
          <div className="text-center mt-2 fs-4 fw-bold">{title}</div>
        </div>
        <div className="col-2 d-flex align-items-end justify-content-end">
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
      </div>
      <div className="row">
        <button
          className="btn col-auto px-0 my-auto border-0"
          disabled={competitions.length <= viewCount}
          onClick={decrementViewIndex}
        >
          <i className="bi bi-chevron-compact-left fs-1"></i>
        </button>
        <div className="col my-auto">
          <div className="row">
            {competitions.map((c, index) => (
              <>
                {index <= viewIndex * viewCount - 1 &&
                  index >= (viewIndex - 1) * viewCount && (
                    <div
                      key={index}
                      className="col-12 col-md-6 col-lg-4 col-xl-3 my-1"
                    >
                      <Link
                        to={`/competition/${c.id}`}
                        className="text-reset text-decoration-none"
                      >
                        <div className="card text-center h-100 bg-secondary-subtle">
                          <img
                            className="card-img opacity-50"
                            src={`${process.env.REACT_APP_API_URL}/api/Game/ImageWithGame/${c.gameId}`}
                            alt="Card"
                          />
                          <div className="card-body card-img-overlay">
                            <div className="card-title fw-bold">{c.name}</div>
                            <div>{c.game?.name}</div>
                            {new Date(c.startAt).toDateString() ===
                              new Date(c.endAt).toDateString() ? (
                              <div>{FormatDate(c.startAt)}</div>
                            ) : (
                              <div>
                                {FormatDate(c.startAt)} - {FormatDate(c.endAt)}
                              </div>
                            )}
                            <div>
                              {getTimeNoSeconds(c.startAt)} -{" "}
                              {getTimeNoSeconds(c.endAt)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
              </>
            ))}
          </div>
        </div>
        <button
          className="btn px-0 col-auto my-auto border-0"
          disabled={competitions.length <= viewCount}
          onClick={incrementViewIndex}
        >
          <i className="bi bi-chevron-compact-right fs-1"></i>
        </button>
      </div>
    </>
  );
};
