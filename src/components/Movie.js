import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;
  transition: transform 0.3s ease 0s;
  position: relative;

  &:hover {
    transform: translateY(-0.125rem);
  }

  button {
    position: absolute;
    bottom: 25px;
    right: 25px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ffffff30;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease 0s;

    &:hover {
      background-color: #ffffff;
    }
  }
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, bg, isLiked }) => {
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={(e) => e.preventDefault()}>
        {isLiked ? '❤️' : '🤍'}
      </button>
    </Container>
  );
};

export default Movie;
