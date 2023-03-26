import { useDispatch } from 'react-redux';
import { setTarget } from '../../../modules/camController';
import { Html } from '@react-three/drei';
import PostItem from '../../html/postPanel/PostItem';
import { setCurrPost, setCurrMode } from '../../../modules/screenController';
import {
  ForwardedRef,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import { PostResponse } from 'screen-state-types';
import { panelClickAnim } from '../anim/BoardAnim';
import { ThreeEvent } from '@react-three/fiber';
import { Group } from 'three';

interface BoardPanelParams {
  position: [x: number, y: number, z: number];
  post: PostResponse;
}

const BoardPanel = forwardRef(
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
          <boxGeometry args={[3.5, 9.2, 0.2]} />
          <meshStandardMaterial color="red" />
          <Html
            transform
            occlude={true}
            distanceFactor={7}
            style={{
              opacity: 1,
            }}
            position={[0, 0, 0.101]}
            rotation={[0, 0, Math.PI / 2]}>
            <PostItem post={post} panelClickHandler={panelClickHandler} />
          </Html>
        </mesh>
      </group>
    );
  },
);

export default BoardPanel;
