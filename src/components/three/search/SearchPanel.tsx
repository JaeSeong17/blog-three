import { Html } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import {
  ForwardedRef,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { PostResponse } from 'screen-state-types';
import SearchItem from 'src/components/html/search/SearchItem';
import { setTarget } from 'src/modules/camController';
import { setCurrMode, setCurrPost } from 'src/modules/screenController';
import { Group } from 'three';
import { panelClickAnim } from '../anim/BoardAnim';

interface BoardPanelParams {
  position: [x: number, y: number, z: number];
  post: PostResponse;
}

const SearchPanel = forwardRef(
  (
    { position, post }: BoardPanelParams,
    ref: ForwardedRef<RefObject<Group>>,
  ) => {
    const { user, _id } = post;
    const dispatch = useDispatch();
    const panelRef = useRef<Group>(null);
    useImperativeHandle(ref, () => panelRef);

    const panelClickHandler = (e: ThreeEvent<MouseEvent> | MouseEvent) => {
      e.stopPropagation();
      panelClickAnim(panelRef.current);
      dispatch(setCurrMode('post'));
      dispatch(setTarget('connect'));
      dispatch(setCurrPost({ username: user.username, postId: _id }));
    };

    return (
      <group ref={panelRef} position={position} onClick={panelClickHandler}>
        <mesh>
          <boxGeometry args={[1.7, 13, 0.2]} />
          <meshStandardMaterial color="gray" />
          <Html
            transform
            occlude={true}
            distanceFactor={7}
            position={[0, 0, 0.11]}
            rotation={[0, 0, Math.PI * 0.5]}>
            <SearchItem post={post} panelClickHandler={panelClickHandler} />
          </Html>
        </mesh>
      </group>
    );
  },
);

export default SearchPanel;
