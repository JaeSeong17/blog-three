import { Suspense, useState } from 'react';
import MainCanvas from './components/three/canvas/MainCanvas';
import Loading from './Loading';

function App() {
  const [isComplete, setComplete] = useState<boolean>(false);

  return (
    <>
      <Loading isComplete={isComplete} />
      <Suspense fallback={null}>
        <MainCanvas setComplete={setComplete} />
      </Suspense>
    </>
  );
}

export default App;
