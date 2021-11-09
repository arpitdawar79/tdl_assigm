import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import sanity from "../utils/sanityClient";
import globalStyles from "../styles/globalStyles";
import {imageUrlFor} from "../utils/misc";

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  poster,
  "posterAspect": poster.asset->.metadata.dimensions.aspectRatio,
  "director": crewMembers[job == "Director"][0].person->name
}[0...150]
`;

const Movies = ({ movies }) => {
  return (
    <Layout>
      <div className="movies">
        <ul className="list">
          {movies.map(movie => (
            <li key={movie._id} className="list__item">
              <Link href="/movie/[movie_id]" as={`/movie/${movie._id}`}>
                <a>
                  {movie.poster && (
                    <img
                      src={imageUrlFor(movie.poster)
                        .ignoreImageParams()
                        .width(300)}
                      width="100"
                      height={100 / movie.posterAspect}
                    />
                  )}
                  <div style={{ paddingTop: "0.2em" }}>
                    {movie.releaseDate.substr(0, 4)}
                  </div>
                  <h3>{movie.title}</h3>
                  
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .movies {
          padding: 1rem;
        }
        .movies-list__directed-by {
          display: block;
          font-size: 1rem;
        }
      `}</style>
      <style jsx>{globalStyles}</style>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const movies = await sanity.fetch(query);
  return {
    props: { movies }
  };
};

export default Movies;
