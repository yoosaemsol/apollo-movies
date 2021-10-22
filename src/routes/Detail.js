import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`; // first line is for Apollo and then else for GraphQL

const Detail = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) }
  });

  if (loading) {
    return 'loading';
  }

  if (data && data.movie) {
    return (
      <>
        <h1>{data.movie.title}</h1>
        <br />
        <p>{data.movie.description_intro}</p>
      </>
    );
  }
};

export default Detail;
