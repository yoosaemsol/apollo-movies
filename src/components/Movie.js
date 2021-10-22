import { Link } from 'react-router-dom';

const Movie = ({ id }) => {
  return (
    <Link to={`/${id}`}>
      <div>{id}</div>
    </Link>
  );
};

export default Movie;
