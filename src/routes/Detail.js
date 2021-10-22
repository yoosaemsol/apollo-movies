import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`; // first line is for Apollo and then else for GraphQL

const Page = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
`;

const Main = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-image: url(${(props) => props.bg});
  border-radius: 15px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Suggestion = styled.div`
  width: 100%;
  padding: 10%;
  height: fit-content;
  background-color: #ffffff20;
  display: flex;
  flex-direction: column;

  h3 {
    color: white;
    font-weight: 500;
    font-size: 30px;
    margin-bottom: 40px;
    letter-spacing: 0.05em;
  }

  div {
    display: flex;
  }

  .suggestion-poster {
    width: 300px;
    height: 500px;
    margin-right: 30px;
  }
`;

const Loader = styled.div`
  &,
  &:before,
  &:after {
    background: #ffffff;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  & {
    color: #ffffff;
    text-indent: -9999em;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  &:before,
  &:after {
    position: absolute;
    top: 0;
    content: '';
  }
  &:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  &:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;

const Detail = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) }
  });

  if (loading || !data) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  const { title, language, rating, description_intro, medium_cover_image } =
    data.movie;

  const { suggestions } = data;

  return (
    <Page>
      <Main>
        <Column>
          <Title>{title}</Title>
          <Subtitle>{`${
            language.charAt(0).toUpperCase() + language.slice(1)
          } · ${rating}`}</Subtitle>
          <Description>{description_intro}</Description>
        </Column>
        <Poster bg={medium_cover_image} />
      </Main>
      <Suggestion>
        <h3>Suggestions</h3>
        <div>
          {suggestions.map((s) => (
            <Link to={`/${s.id}`}>
              <Poster className="suggestion-poster" bg={s.medium_cover_image} />
            </Link>
          ))}
        </div>
      </Suggestion>
    </Page>
  );
};

export default Detail;
