// import { Text3dTemplate } from '../template/Text3DTemplate';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTarget } from '../../../modules/camController';
// import { RootState } from 'root-state-types';
// import { useState } from 'react';

// const RegisterButton = () => {
//   const target = useSelector((state: RootState) => state.camController.target);
//   const dispatch = useDispatch();
//   const [pos, setPos] = useState<number>(-0.4);
//   return (
//     <group
//       position={[1.72, -0.25, -2.22]}
//       rotation={[-Math.PI / 20, 0, -Math.PI / 20]}
//       onClick={e => {
//         e.stopPropagation();
//         if (target === 'login') {
//           dispatch(setTarget('register'));
//           setPos(-0.3);
//         } else {
//           dispatch(setTarget('login'));
//           setPos(-0.4);
//         }
//       }}>
//       <mesh>
//         <boxGeometry args={[1.1, 0.2, 0.45]} />
//         <meshStandardMaterial color="#aaaaaa" />
//       </mesh>
//       <Text3dTemplate
//         innerText={target === 'login' ? '계정생성' : '로그인'}
//         position={[pos, -0.01, -0.07]}
//         rotation={[Math.PI / 2, 0, 0]}
//         color={'white'}
//         height={0.02}
//         size={0.16}
//         bevelSize={0.005}
//         letterSpacing={-0.01}
//       />
//     </group>
//   );
// };

// export default RegisterButton;
