import DataTower from '../common/DataTower';
import AuthBox from '../common/AuthBox';
import StartText3d from '../common/StartText3d';
import UsernameText3d from '../common/UsernameText3d';
import LogButton from '../common/LogButton';
import { useEffect, useRef } from 'react';

const FrontContainer = () => {
  return (
    <group position={[0, -20, 0]}>
      <DataTower />
      <StartText3d />
      <AuthBox />
      <UsernameText3d />
      <LogButton />
    </group>
  );
};

export default FrontContainer;
