import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import sanity from "../../utils/sanityClient";
import styles from "../../styles/globalStyles";
import {imageUrlFor} from "../../utils/misc";

const moviesQuery = `*[_type == "movie"] { _id }`;

const singleMovieQuery = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  overview,
  releaseDate,
  poster,
  "cast": castMembers[] {
    _key,
    characterName,
    "person": person-> {
      _id,
      name,
      image
    }
  }
}[0]
`;



const Movie = ({ movie }) => {
  const {
    poster: { crop = { left: 0, top: 0 }, hotspot = { x: 0.5, y: 0.5 } }
  } = movie;
  return (
    <Layout>
      <div>
      <img
              className="poster"
              src={imageUrlFor(movie.poster)
                .ignoreImageParams()
                .width(200)}
              alt={`Movie poster for ${movie.title}`}
            />
        <h1>{movie.title}</h1>
      </div>
      <div>
      <h2>Cast</h2>
            <ul>
              {movie.cast.map(cast => (
                <li key={cast._key}>
                    <p><b>{cast.person.name}</b> as <b>{cast.characterName}</b></p>
                </li>
              ))}
            </ul>
      </div>
      <style jsx>{styles}</style>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const movies = await sanity.fetch(moviesQuery);
  const paths = movies.map(movie => ({
    params: { movie_id: movie._id }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  const movie = await sanity.fetch(singleMovieQuery, { id: params.movie_id });
  return { props: { movie } };
};

export default Movie;
