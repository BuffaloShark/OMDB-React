import React from "react";

const shimmerStyle = {
  background: "linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)",
  backgroundSize: "1000px 100%",
  animation: "shimmer 1.2s infinite",
};

const MovieDetailsSkeleton = () => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
        `}
      </style>

      <div id="movies__body">
        <main id="movies__main">
          <div className="movies__container">
            <div className="row">
              <div className="movie__selected">
                <figure className="movie__selected--figure">
                  <div
                    className="movie__selected--img"
                    style={{ ...shimmerStyle, width: "300px", height: "450px", borderRadius: "8px" }}
                  ></div>
                </figure>

                <div className="movie__selected--description">
                  <div
                    className="movie__selected--title"
                    style={{ ...shimmerStyle, width: "60%", height: "2rem", borderRadius: "4px" }}
                  ></div>

                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      style={{ ...shimmerStyle, width: "40%", height: "1rem", borderRadius: "4px", margin: "0.75rem 0" }}
                    ></div>
                  ))}

                  <div
                    className="movie__summary--title"
                    style={{ ...shimmerStyle, width: "30%", height: "1.5rem", borderRadius: "4px", marginTop: "1.5rem" }}
                  ></div>

                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="movie__summary--para"
                      style={{
                        ...shimmerStyle,
                        width: i === 2 ? "80%" : "100%",
                        height: "1rem",
                        borderRadius: "4px",
                        marginTop: "0.5rem",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MovieDetailsSkeleton;
