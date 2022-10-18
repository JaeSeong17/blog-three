# Blog - THREE
개인 블로그를 직접 만들어 봅니다. react, three.js 활용을 목표로 합니다.

## three.js 기록
- react에서는 react-three/fiber를 사용해야함
- react-three/fiber와 react-three/drei를 활용

##### useFrame에서 각 프레임 별 애니메이션 설정 (unity frame과 유사한 개념인듯하다. 자세한 내용은 조사 필요)
##### 컴포넌트의 prop에 직접 접근하는 것 보다 useRef로 접근하여 값을 조작하는 것이 효율이 더 좋다고 함 

const ref = useRef()
useFrame((state, delta) => (ref.current.position.x += delta))
return <mesh ref={ref} />

##### useFrame + lerp 조합으로 부드러운 애니메이션 연출이 가능하다
- lerp: linear interpolation 선형 보간법, 애니메이션에 가속도 효과를 주는 법

function Signal({ active }) {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, active ? 100 : 0, 0.1)
  })
  return <mesh ref={ref} />

##### redux useSelector로 상태값 조회를 애니메이션 컴포넌트 or props에 직접 접근하지 않도록 해야한다

const x = useSelector((state) => state.x)
return <mesh position-x={x} />
-이렇게 접근할 경우 60fps 의 프레임마다 조회 수행

useFrame(() => (ref.current.position.x = api.getState().x))
return <mesh ref={ref} />
-getState 메서드를 활용하자

##### 무차별적인 런타임 마운트를 자제하자
- threejs는 re-mount를 하지 않는것이 일반적인 방법이다. Re-mount를 할 경우 buffer와 materials가 재초기화/컴파일 을 수행하는데 이는 매우 비효율적인 작업

{
  stage === 1 && <Stage1 />
}
{
  stage === 2 && <Stage2 />
}



- useEffect(() => setInterval(() => ())) 와 유사한 동작 매커니즘을 보이는듯 함