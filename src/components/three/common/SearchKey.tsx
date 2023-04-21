import KeycapTemplate from '../template/KeycapTemplate';
import { Text } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { keyClickAnim } from '../anim/CommonAnim';
import { useDispatch } from 'react-redux';
import { setHistory, setTarget } from 'src/modules/camController';

const SearchKey = () => {
  const dispatch = useDispatch();
  const keyRef = useRef<Mesh>(null);
  function searchKeyClickHandler() {
    dispatch(setHistory('search')); // 스크린 탈출 시 돌아올 history 설정
    dispatch(setTarget('search'));
    keyClickAnim(keyRef);
  }

  return (
    <group>
      <KeycapTemplate
        longType
        ref={keyRef}
        position={[0, 0, 0]}
        scale={1.3}
        color={'#ffffff'}
        emissive={'#ff0000'}
        clickHandler={searchKeyClickHandler}
      />
      <Text
        color="black"
        position={[0, 3.2, -0.6]}
        fontSize={0.6}
        rotation={[0, Math.PI / 4, Math.PI / 2]}
        anchorX="left">
        {'Search Post'}
      </Text>
    </group>
  );
};

export default SearchKey;
