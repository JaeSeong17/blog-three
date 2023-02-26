import { useRef } from 'react';
import gsap from 'gsap';
import { useDispatch } from 'react-redux';
import { setTarget } from '../../../modules/controller';
import { Html } from '@react-three/drei';
import PostItem from '../../html/common/PostItem';
import { setCurrPost } from '../../../modules/posts';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

const BoardPanel = forwardRef(({ position, post }, ref) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  const dispatch = useDispatch();
  const panelRef = useRef();
  useImperativeHandle(ref, () => panelRef.current);

  const anime = gsap.timeline();
  function clickAnimation() {
    anime.to(panelRef.current.position, {
      z: '-=0.1',
      duration: 0.05,
      repeat: 1,
      yoyo: true,
    });
  }

  return (
    <group
      ref={panelRef}
      position={position}
      onClick={e => {
        e.stopPropagation();
        clickAnimation();
        dispatch(setCurrPost({ username: user.username, postId: _id }));
        dispatch(setTarget('connect'));
      }}>
      <mesh>
        <boxGeometry args={[3.5, 9.2, 0.2]} />
        <meshStandardMaterial color="red" />
        <Html
          transform
          occlude={true}
          distanceFactor={7}
          style={{ opacity: 1 }}
          position={[0, 0, 0.1001]}
          rotation={[0, 0, Math.PI / 2]}>
          <PostItem post={post} />
        </Html>
      </mesh>
    </group>
  );
});

export default BoardPanel;
