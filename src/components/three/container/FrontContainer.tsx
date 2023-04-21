import DataTower from '../common/DataTower';
import AuthBox from '../authBox/AuthBox';
import Titles from '../common/Titles';
import MyProfile from '../common/MyProfile';
import LogButton from '../common/LogButton';

const FrontContainer = () => {
  return (
    <group position={[0, -20, 0]}>
      <DataTower />
      <Titles />
      <AuthBox />
      <MyProfile />
      <LogButton />
    </group>
  );
};

export default FrontContainer;
