import "./MovieDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Rating } from "primereact/rating";
import { Carousel } from "primereact/carousel";

export default function MovieDetail({ movies }) {
  const { url_id } = useParams(); // Get the movie ID from the URL
  const url_id_integer = parseInt(url_id); // convert to integer or number

  console.log("Movie detail ID", url_id);
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(() => {
    if (movies && movies?.length > 0) {
      const movie = movies.find((movie) => movie.id === url_id_integer);
      console.log("Selected Movie", movie);
      setSelectedMovie(movie);
    }
  }, [url_id_integer, movies]);

  const carouselItemtemplate = (image) => {
    return (
      <div>
        <div className="carouselImg">
          <img src={`/images/${image}`} alt="" />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="movie-detail-card">
        <div>
          {selectedMovie && selectedMovie.additionalCarousal && (
            <Carousel
              value={selectedMovie.additionalCarousal}
              showIndicators={false}
              numVisible={1}
              numScroll={1}
              className="custom-carousel"
              circular
              itemTemplate={carouselItemtemplate}
            />
          )}
        </div>

        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{selectedMovie?.title}</h1>
          <hr />
          <div className="movie-labels">
            <span>
              <strong>Genre:</strong> {selectedMovie?.genre}
            </span>
            <span>
              <strong>Rating:</strong>
              <Rating
                value={selectedMovie?.rating || 0}
                readOnly
                cancel={false}
              />
            </span>
            <span>
              <strong>Year:</strong> {selectedMovie?.year}
            </span>
            <span>
              <strong>Actors:</strong> {selectedMovie?.actors}
            </span>
          </div>
        </div>
      </div>

      <Accordion>
        <AccordionTab header="Header I">
          <p className="movie-description">{selectedMovie?.details}</p>
        </AccordionTab>

        <AccordionTab header="Header II">
          <p className="movie-description">{selectedMovie?.details}</p>
        </AccordionTab>

        <AccordionTab header="Header III">
          <p className="movie-description">{selectedMovie?.details}</p>
        </AccordionTab>
      </Accordion>
    </>
  );
}
