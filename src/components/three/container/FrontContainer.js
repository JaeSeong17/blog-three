import DataTower from '../common/DataTower';
import LoginBox from '../common/LoginBox';
import StartText3d from '../common/StartText3d';
import UsernameText3d from '../common/UsernameText3d';
import LogButton from '../common/LogButton';

const FrontContainer = () => {
  return (
    <group position={[0, -20, 0]}>
      <DataTower />
      <StartText3d />
      <LoginBox />
      <UsernameText3d />
      <LogButton />
    </group>
  );
};

export default FrontContainer;
