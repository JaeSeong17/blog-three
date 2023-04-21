import { useRef, useEffect } from 'react';
import { Text } from '@react-three/drei';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { useSelector } from 'react-redux';
import WriteKey from '../common/WriteKey';
import TagKey from '../common/TagKey';
import tags from 'src/static/tags';
import {
  keysOnAnim,
  keyOnAnim,
  keysOffAnim,
  keyOffAnim,
  keyOnAnimRe,
  keyOffAnimRe,
} from '../anim/KeysAnim';
import { RootState } from 'root-state-types';
import { Group, Mesh } from 'three';
import SearchKey from '../common/SearchKey';

const KeyContainer = () => {
  const target = useSelector((state: RootState) => state.camController.target);
  const user = useSelector((state: RootState) => state.user.user);
  const boxesRef = useRef<Array<Mesh | null>>([]);
  const textsRef = useRef<Array<Mesh | null>>([]);
  const writeBtnRef = useRef<Mesh>(null);
  const writeTextRef = useRef<Mesh>(null);
  const searchRef = useRef<Group>(null);
  const onTarget = ['key', 'board', 'search', 'connect', 'screen'];
  gsap.registerPlugin(CustomEase);

  // Tag, Write key 애니메이션 컨트롤
  useEffect(() => {
    if (
      !boxesRef.current ||
      !boxesRef.current.every(item => item !== null) ||
      !textsRef.current ||
      !textsRef.current.every(item => item !== null) ||
      !writeBtnRef.current ||
      !writeTextRef.current ||
      !searchRef.current
    )
      return;
    if (onTarget.includes(target)) {
      gsap
        .timeline()
        .add(
          keysOnAnim(
            boxesRef.current as Array<Mesh>,
            textsRef.current as Array<Mesh>,
          ),
        )
        .add(keyOnAnim(writeBtnRef.current, writeTextRef.current), 'funcKey')
        .add(keyOnAnimRe(searchRef.current), 'funcKey');
    } else {
      gsap
        .timeline()
        .add(
          keysOffAnim(
            boxesRef.current as Array<Mesh>,
            textsRef.current as Array<Mesh>,
          ),
          'closeLabel',
        )
        .add(
          keyOffAnim(writeBtnRef.current, writeTextRef.current),
          'closeLabel',
        )
        .add(keyOffAnimRe(searchRef.current), 'closeLabel');
    }
  }, [target]);

  return (
    <group position={[0, -4, 0]}>
      {/* 글 목록 키 */}
      {tags.map((d, idx) => (
        <group key={idx}>
          <TagKey
            ref={el => (boxesRef.current[idx] = el)}
            position={[9 - idx * 4, 0, -3]}
            index={idx}
            tag={d.title}
          />
          <Text
            ref={el => (textsRef.current[idx] = el)}
            color="black"
            position={[9 - idx * 4, 1.5, -3]}
            fontSize={0.6}
            rotation={[0, Math.PI / 4, Math.PI / 2]}
            anchorX="left">
            {d.title}
          </Text>
        </group>
      ))}
      {/* 글 검색 키 */}
      <group ref={searchRef} position={[5, -9, -3]}>
        <SearchKey />
      </group>
      {/* 글 쓰기 키 */}
      <group position={[9, -9, 0]}>
        <WriteKey ref={writeBtnRef} position={[0, 0, -3]} />
        <Text
          ref={writeTextRef}
          color="black"
          position={[0, 1.5, -2]}
          fontSize={0.6}
          rotation={[0, Math.PI / 4, Math.PI / 2]}
          anchorX="left">
          {user ? 'Write new Post' : 'Write (login required)'}
        </Text>
      </group>
    </group>
  );
};

export default KeyContainer;
