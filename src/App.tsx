import { Suspense } from 'react';
import MainCanvas from './components/three/canvas/MainCanvas';
import styled from 'styled-components';

const BackGround = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    animation: spinner 3s linear infinite;
  }
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <BackGround>
      <img className="spinner" src={process.env.PUBLIC_URL + '/Gear.png'} />
    </BackGround>
  );
};

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MainCanvas />
    </Suspense>
  );
}

export default App;
