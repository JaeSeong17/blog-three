# Blog - THREE
개인 블로그를 직접 만들어 봅니다. react, three.js 활용을 목표로 합니다.
상태관리 redux -> reduxjs/toolkit 시도합니다.

## three.js 기록
이 문서 내용은 Pmndrs.docs, threejs, gsap를 기반으로 작성되었습니다

https://docs.pmnd.rs/

- react에서는 react-three/fiber를 사용해야함
- react-three/fiber와 react-three/drei를 활용

#### react
- useRef와 forwardRef를 동시에 사용하고 싶을 때에는 useImperativeHandle를 사용하자
``` C
const innerRef = useRef();
useImperativeHandle(fowardRef, () => innerRef.current);
```

#### canvas
- canvas 내의 mesh component 렌더링과 useEffect의 마운트 시점이 동기가 아니다 -> canvas 외부에서 useEffect시 canvas 내부 컴포넌트를 타겟팅한 ref가 undefined로 출력됨
- canvas 내의 컴포넌트에서 useRef hook을 다루면 정상 작동함

- canvas 내 mesh들을 group으로 묶을 수 있다
- object의 eventlistener 설정시 보는 시점에 따라 이벤트 버블링이 발생할 수 있다 (영역이 겹치면 여러개의 이벤트 발생) -> e.stopPropagation

- canavs내에서 Html element를 사용할 수 있음 : <Html>
- <참고!> canvas내에서 redux store에 접근시 오류 발생 (캔버스 내의 html은 dom tree 상 canvas 하위 계층에 렌더링 되는것 같지 않거나 상위 tree의 리덕스 스토어를 상속받지 못함, 확실한 이유는 조사 필요) 

##### camera movement
- useThree로 canvas 내 props에 접근 가능 (drei 문서 hook 참조)
- camera는 position과 projection 두 요소 존재 (위치와 방향)
- lookAt함수로 보는 방향 설정 가능, lerp와 함께 사용하면 보는 방향을 부드럽게 전환할 수 있다.
``` C
const lookAtPos = new THREE.Vector3();
useFrame((state) => {
  lookAtPos.lerp(vec.set(x, y, z), .01)
  state.camera.lookAt(lookAtPos)
})
```
단 lookAtPos 변수를 함수 컴포넌트 내에 선언하면 리랜더링시 초기화 시켜버리기 때문에 화면 전환시마다 0,0,0에서 시작해버리는 문제 발생한다.

#### useFrame
- 2022.10.30 useFrame 사용시 해당 탭 이외 탭에서 성능 저하 발생, 여러탭 동시 사용시 사용성 저하 발생을 고려해야 한다. (크롬 브라우저, useFrame 사용과 유튜브 동시 재생시 유튜브 멈춤 현상 발생)

- fiber hook 의 하나로 fiber render loop의 모든 프레임 상에서 코드를 실행한다
- fiber hook은 반드시 <Canvas /> 내에서만 호출 할 수 있다.

- 보통 상태 변경시 setState 방식을 생각할 수 있지만 state를 통한 mesh의 update는 이상적이지 않다
- useRef로 mesh에 접근하여 값을 직접 바꿔주는게 효율적

- 각 mesh에 이벤트 핸들러를 설정할 수 있음 -> https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction

##### react spring
- mesh의 움직임을 좀더 부드럽게 만들어보자
- 3d object 의 scale은 width, height, depth 방향을 개별적으로 설정할 수 있다.
- react spring 은 animated component에만 적용이 가능하다 ex)animated.mesh

##### gsap
- timeline api로 동기/비동기 처리 가능 (promise)
- addEventListener 방식이 제대로 동작하지 않는 문제 - useRef 할당 시점(렌더링 이후인듯 처음에 undefined로 출력됨)
- mesh에 연결하고 싶을 떄 그냥 mesh 자체의 event linstner에 할당 하자 - https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction
- 이벤트 연속 발생시 이전 이벤트와 겹치는 현상 발생 -> immediateRender props으로 즉시 완료 후 새 이벤트 실행
- onComplete 속성으로 특정 애니메이션이 종료되는 시점에 임의 함수를 실행할 수 있음

##### drei
- fiber 라이브러리를 좀더 풍부하게 (셰이더, 카메라 등)

- scroll.offset으로 현재 스크롤 위치 값을 받을 수 있음
- scroll.offset은 0 ~ 1 값으로 표현되며 처음과 끝 지점에서 매우 작은 수로 지수표기법(1.0e+5)으로 표현되므로 총 길이값을 곱해서 인덱스 표기시 처음과 끝에서 별도 처리 필요 
- scroll.fixed 해당 화면을 스크롤에서 고정시킬 수는 있으나 스크롤 자체가 lock이 되는 것이 아니기 때문에 탈출시 jump 현상이 발생할 수 있다.


#### useFrame의 효율적인 작업을 위한 코드 작성법

##### useFrame에서 각 프레임 별 애니메이션 설정 (unity frame과 유사한 개념인듯하다. 자세한 내용은 조사 필요)
- useEffect(() => setInterval(() => ())) 와 유사한 동작 매커니즘을 보이는듯 함

##### 컴포넌트의 prop에 직접 접근하는 것 보다 useRef로 접근하여 값을 조작하는 것이 효율이 더 좋다고 함 

``` C
const ref = useRef()
useFrame((state, delta) => (ref.current.position.x += delta))
return <mesh ref={ref} />
```

##### useFrame + lerp 조합으로 부드러운 애니메이션 연출이 가능하다
- lerp: linear interpolation 선형 보간법, 애니메이션에 가속도 효과를 주는 법

``` C
function Signal({ active }) {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, active ? 100 : 0, 0.1)
  })
  return <mesh ref={ref} />
```

##### redux useSelector로 상태값 조회를 애니메이션 컴포넌트 or props에 직접 접근하지 않도록 해야한다
 
``` C
const x = useSelector((state) => state.x)
return <mesh position-x={x} />
```
-이렇게 접근할 경우 60fps 의 프레임마다 조회 수행

``` C
useFrame(() => (ref.current.position.x = api.getState().x))
return <mesh ref={ref} />
```
-getState 메서드를 활용하자

##### 무차별적인 런타임 마운트를 자제하자
- threejs는 re-mount를 하지 않는것이 일반적인 방법이다. Re-mount를 할 경우 buffer와 materials가 재초기화/컴파일 을 수행하는데 이는 매우 비효율적인 작업

``` C
{
  stage === 1 && <Stage1 />
}
{
  stage === 2 && <Stage2 />
}
```
이는 런타임 상황에서 리렌더링을 수행하는 코드
아래처럼 바꾸자 (visible속성을 활용하여 숨기는 방식)

``` C
<Stage1 visible={stage === 1} />
<Stage2 visible={stage === 2} />
<Stage3 visible={stage === 3} />

function Stage1(props) {
  return (
    <group {...props}>
    ...
```

##### loop 내에서 새 객체를 생성하지 말것
``` C
useFrame(() => {
  ref.current.position.lerp(new THREE.Vector3(x, y, z), 0.1)
})
```
new 키워드로 Vector3객체를 새로이 생성하고 있다 이는 프레임마다 새 객체를 생성하는 비효율적인 코드
아래와 같이 수정하자

``` C
function Foo({ vec = new THREE.Vector(), ...props })
  useFrame(() => {
    ref.current.position.lerp(vec.set(x, y, z), 0.1)
  })
```

##### 일반로더 말고 useLoader를 사용하자
- threejs 로더는 비동기 자원을 로드할 수 있는 기능을 제공하나 재사용 하는 방식을 반드시 사용할것, 사용시마다 로드를 한다면 비효율적이다
``` C
function Component() {
  const [texture, set] = useState()
  useEffect(() => void new TextureLoader().load(url, set), [])
  return texture ? (
    <mesh>
      <sphereGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  ) : null
}
```
texture 리소스를 마운트마다(useEffect) 리로드 하고 있다. 아래와 같이 바꾸자

```C
function Component() {
  const texture = useLoader(TextureLoader, url)
  return (
    <mesh>
      <sphereGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
```
