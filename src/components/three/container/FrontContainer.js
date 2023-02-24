import DataTower from "../common/DataTower";
import LoginBox from "../common/LoginBox";
import StartText3d from "../common/StartText3d";

const FrontContainer = () => {
  return (
    <group position={[0, -20, 0]}>
      <DataTower />
      <StartText3d />
      <LoginBox />
    </group>
  )
}

export default FrontContainer;