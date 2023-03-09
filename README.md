# Blog - THREE

개인 블로그를 직접 만들어 봅니다. react, three.js, typescript 활용을 목표로 합니다.
상태관리 redux -> reduxjs/toolkit 시도합니다.

---

# Dev Report

#### 2023.03.09

- Typescript의 .d.ts에 타입들을 별도로 모듈화 수행
- .d.ts 파일 내 declare module 'module-name' 키워드로 타입 모듈을 선언할 수 있다
- .d.ts 파일은 js로 컴파일 되지 않는 타입만 정의된 파일로 module 블럭 외부에 import 키워드 사용시 읽어오지 못함

```C
// type.d.ts
// import { a-type } from 'outer-types';  여기서 외부 모듈 참조시 읽지 못함

declare module 'inner-types' {
  import { a-type } from 'outer-types';   // 여기서 import 해야함
  export interface b-type {
    data: a-type;
  }
}
```

#### 2023.03.08

Typesciprt 도입 시도

- redux 모듈과 api쪽부터 마이그레이션
- type, interface중 interface로 타입 선언하자 (확장성 관련 문서 참조)
- Union 사용시 type guard, type assertion를 적절히 사용하자. (Union에 존재하는 모든 타입들이 이후 수행할 작업의 타입 검사를 통과해야하므로)
  - 각 타입별로 수행할 작업을 typeguard로 걸러내기
  - 해당 작업에 사용되는 변수의 타입을 type assertion로 확정해주기
- .d.ts파일로 프로젝트의 타입들을 별도 모듈로 분리하여 관리할 수 있음 (.d.ts 파일은 .ts파일과 달리 .js로 컴파일 하지 않음, .d.ts 관련 문서 참조)

###### 수정 필요

- 글 에디터로 Quill을 사용중인데 markdown을 이해하지 못하는 것 같다. 찾아보니 markdown 확장 라이브러리가 있는것으로 보임 (추가 요망)

#### 2023.03.04

- forwardRef가 두 계층 이상을 통과하지 못하는 것으로 보임, 부모-자식 계층을 하나만 연결할 수 있음

- gsap timeline으로 순차 애니메이션 적용시 value로 넘겨주는 두번째 인자 뒤에 세번쨰 인자로 label을 넘겨 병렬로 처리할 수 있음

```C
// 1번 이후 (2, 3)번이 묶여 병렬로 수행
gsap.timeline()
.to(objectRef1, {value})
.to(objectRef2, { value }, 'label')
.to(objectRef3, { value}, 'label');
```

###### 수정 필요

- 로그인 박스 내 스토어와 three 전체의 스토어 두개에서 계정정보가 중복되어 저장되고 있어 동기화 작업이 필요했음
- 이후 하나의 스토어에서 관리할 수 있도록 수정 필요

#### 2023.03.03

- 회원가입 구현: 가입 완료시 바로 로그인 되어 내부로 진입되도록 했으나 이후 수정하는 것이 필요
- 회원가입과 로그인시 인증중임을 사용자가 확인 할 수 있도록 loading ui를 구현하는 것이 필요

- 로그아웃시 root store랑 auth store 둘다 user를 비워주도록 적용해야함

- auth store의 initialize reducer가 auth정보를 초기화 하지 못하는 문제 발견 (수정완료)

#### 2023.03.02

- Screen 화면을 url을 활용한 Navigator 방식으로 전환하던 것에서 redux-store값에 따라 조건부 컴포넌트로 전환하는 방식으로 변경 완료
- reducer의 action을 dispatch할때 payload로 정보를 담아 보낼때 여러값을 보내야 한다면 객체 타입으로 감싸야함

```C
// 이렇게 보내면 payload에는 data1만 담김
dispatch(action(data1, data2));

// 객체로 감싸서 보내자
dispatch(action({data1, data2}));
```

#### 2023.03.01

- LoginBox에 threejs와 html이 한번에 들어가있던 구조를 분리하는 작업 진행
  -> LoginBox에서 AuthBox로 전환, 내부에서 LoginForm이 같이 구현되어있던 부분을 html 파일로 분리

- LoginBox에서 로그인창과 회원가입 창 전환을 위한 Router, Screen에서 포스트 뷰어를 위한 Router 동시 사용시 하나만 작동함
  -> BrowserRouter는 하나만 사용이 가능하다, 중첩 라우터를 사용하거나 라우터 하나는 다른 방식으로 구현이 필요함

#### 2023.02.27

- localstorage에 계정 정보 있을 경우 자동 로그인 수행시 첫 화면 스킵
  -> '재성의 정보저장소' 텍스트 단계가 스킵되지 않도록 수정
- 원인 : 자동 로그인 로직에서 화면 전환 명령이 포함되어 있음
- 해결 : 자동 로그인은 수행하되 화면 전환 로직을 분리 (첫 텍스트 클릭시 로그인화면 or 키화면 전환을 로그인 여부에 따라 결정)

- 로그인한 계정 ID를 띄우는 텍스트와 로그아웃 버튼 & 로직 추가
- 로그아웃시 로그인 박스 화면으로 진입하면 기존 화면에 있던 버튼들이 바닥 패널 밑으로 내려가는게 늦음
  -> 컴포넌트들이 바닥 밑으로 바로 내려가도록 수정 필요함

#### 2023.02.25

- eslint, prettier 적용 (적용했다고 생각했었는데 적용이 안되고 있었음)
  -> 컴파일시 스타일에 어긋나는 것도 마치 오류처럼 띄워줌
- typescript 적용 시도

#### 2023.02.24

- 글쓰기 완료 후 스크린에서 나갔을 때 버튼 목록으로 바로 이동하지 못하고 글 목록으로 넘어가는 문제
- 원인 : '포스트 등록' 버튼 클릭 시 currMode를 write에서 post로 바꾸는 로직 존재
- 해결 : 포스트 등록 완료 후 작성 모드에서 뷰어 모드로 전환하는 것은 currMode 전환에서 담당하지 않고 포스트 등록 버튼의 navigate 동작으로 수행되므로 해당 로직 제거

#### 2023.02.23

- 글쓰기 완료 후 다시 글쓰기 창 진입시 이전 글작성 완료 창이 계속 나타나는 문제
- 원인 : '포스트 등록' 버튼이 store의 post값을 참조하여 뷰어로 전환하는 로직이 존재하는데 첫 글쓰기 완료 후 다시 글쓰기로 재 진입시 이전 post 등록 완료 정보가 초기화 되지 않아 그대로 참조함
- 해결 : 글쓰기 페이지 진입시 store.write 정보를 initialize 함

---

### react

- useRef와 forwardRef를 동시에 사용하고 싶을 때에는 useImperativeHandle를 사용하자

```C
const innerRef = useRef();
useImperativeHandle(fowardRef, () => innerRef.current);
```

### reduxjs/toolkit

- redux와 redux-toolkit의 createAction의 prepare.payload 인자 전달 방식에 차이가 있음

```C
//redux
export const action = createAction('root/action', params => params);

//redux toolkit
export const action = createAction('root/action', (params) => ({payload: params}));
```

- useEffect의 두번째 파라미터로 특정 값 변경시점을 트래킹 하는 경우 해당 변수에 새 값을 할당 하더라도 같은 값일 경우 값이 바뀌지 않은 것으로 판단함 => useEffect 수행X

```C
const [params, setParams] = setState('initial');
useEffect(() => {
  console.log('test');
}, [params])
// params = 'initial' 을 수행해도 값이 그대로 이기 때문에 useEffect는 새로 렌더링 할 필요가 없다고 판단
```

- RTK의 PayloadAction은 단일 payload를 사용하도록 원칙 준수하기 때문에 여러개의 payload를 사용하는 것은 지양함
- redux saga에서 axios api로부터 받은 response의 meta값을 payload로 전달하지 못함

```C
// redux-saga
...
yield put({
  type: 'SUCCESS'
  payload: response.data
  meta: response
})
...

// reducer
// action: (state, {payload, meta}) => { RTK에서는 meta타입 사용을 권장하지 않음
action: (state, {payload}: PayloadAction<type>) => {
  // ...
}
```

---

### typescript

typescript에서 node_modules import시 제대로 참조하지 못하는 문제 발생

- ts 적용 이전에 node_modules 참조 방식(moduleResolution)이 Node전략을 따랐고, ts 적용 이후 Classic전략으로 바뀌면서 오류가 발생함 -> moduleResolution을 Node 전략으로 전환
  -> Node 전략: 절대 경로 참조시 node_modules 디렉토리 탐색, 이후 전역 탐색
  -> Classic 전략: 절대 경로 참조시 현재 경로에서 루트 폴더 단방향으로 올라가며 탐색, 없으면 탐색 종료

---

### three.js 기록

이 문서 내용은 Pmndrs.docs, threejs, gsap를 기반으로 작성되었습니다

https://docs.pmnd.rs/

- react에서는 react-three/fiber를 사용해야함
- react-three/fiber와 react-three/drei를 활용

#### canvas

- canvas 내의 mesh component 렌더링과 useEffect의 마운트 시점이 동기가 아니다 -> canvas 외부에서 useEffect시 canvas 내부 컴포넌트를 타겟팅한 ref가 undefined로 출력됨
- canvas 내의 컴포넌트에서 useRef hook을 다루면 정상 작동함

- canvas 내 mesh들을 group으로 묶을 수 있다
- object의 eventlistener 설정시 보는 시점에 따라 이벤트 버블링이 발생할 수 있다 (영역이 겹치면 여러개의 이벤트 발생) -> e.stopPropagation

- canavs내에서 Html element를 사용할 수 있음: threejs의 라이브러리를 활용 <Html>
- <참고!> canvas내에서 redux store에 접근시 오류 발생
  - Canvas 요소는 HTML문서의 일부이나 Canvas 안에서 렌더링되는 그래픽 요소들은 일반적인 HTML과는 다른 방식으로 처리된다
  - Canvas 내에서 렌더링된 HTML 요소들은 전체 DOM트리에 연결되어 있지 않다
  - 따라서 redux Provider의 store속성으로 연결된 redux-store는 DOM트리에 전역적으로 연결되나 Canvas 내부 HTML요소에는 제공되지 않음
  - 그러나 Canvas의 props으로 store의 state와 action을 전달하여 내부에서 사용할 수는 있다 (redux의 connect함수 참조)

##### camera movement

- useThree로 canvas 내 props에 접근 가능 (drei 문서 hook 참조)
- camera는 position과 projection 두 요소 존재 (위치와 방향)
- lookAt함수로 보는 방향 설정 가능, lerp와 함께 사용하면 보는 방향을 부드럽게 전환할 수 있다.

```C
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

##### gsap

- timeline api로 동기/비동기 처리 가능 (promise)
- 비동기 처리시 주의: 해당 작업에 의해 컴포넌트(three object)가 리렌더링 되면서 ref 참조 문제가 발생할 수 있음
- timeline 에서 함수화 한 각 애니메이션 단위를 연결시킬 수 있음

```C
function intro() {
	var tl = gsap.timeline();
	//...add animations here...
	return tl;
}

function middle() {
	var tl = gsap.timeline();
	//...add animations here...
	return tl;
}

function conclusion() {
	var tl = gsap.timeline();
	//...add animations here...
	return tl;
}

// stitch them together in a master timeline...
var master = gsap.timeline();
master.add(intro())
      .add(middle(), "+=2")     //with a gap of 2 seconds
      .add(conclusion(), "-=1") //overlap by 1 second
```

- addEventListener 방식이 제대로 동작하지 않는 문제 - useRef 할당 시점(렌더링 이후인듯 처음에 undefined로 출력됨)
- mesh에 연결하고 싶을 떄 그냥 mesh 자체의 event linstner에 할당 하자 - https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction
- 이벤트 연속 발생시 이전 이벤트와 겹치는 현상 발생 -> immediateRender props으로 즉시 완료 후 새 이벤트 실행
- onComplete 속성으로 특정 애니메이션이 종료되는 시점에 임의 함수를 실행할 수 있음

##### drei

- fiber 라이브러리를 좀더 풍부하게 (셰이더, 카메라 등)

- scroll.offset으로 현재 스크롤 위치 값을 받을 수 있음
- scroll.offset은 0 ~ 1 값으로 표현되며 처음과 끝 지점에서 매우 작은 수로 지수표기법(1.0e+5)으로 표현되므로 총 길이값을 곱해서 인덱스 표기시 처음과 끝에서 별도 처리 필요
- scroll.fixed 해당 화면을 스크롤에서 고정시킬 수는 있으나 스크롤 자체가 lock이 되는 것이 아니기 때문에 탈출시 jump 현상이 발생할 수 있다.

---

#### useFrame의 효율적인 작업을 위한 코드 작성법

##### useFrame에서 각 프레임 별 애니메이션 설정 (unity frame과 유사한 개념인듯하다. 자세한 내용은 조사 필요)

- useEffect(() => setInterval(() => ())) 와 유사한 동작 매커니즘을 보이는듯 함

##### 컴포넌트의 prop에 직접 접근하는 것 보다 useRef로 접근하여 값을 조작하는 것이 효율이 더 좋다고 함

```C
const ref = useRef()
useFrame((state, delta) => (ref.current.position.x += delta))
return <mesh ref={ref} />
```

##### useFrame + lerp 조합으로 부드러운 애니메이션 연출이 가능하다

- lerp: linear interpolation 선형 보간법, 애니메이션에 가속도 효과를 주는 법

```C
function Signal({ active }) {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, active ? 100 : 0, 0.1)
  })
  return <mesh ref={ref} />
```

##### redux useSelector로 상태값 조회를 애니메이션 컴포넌트 or props에 직접 접근하지 않도록 해야한다

```C
const x = useSelector((state) => state.x)
return <mesh position-x={x} />
```

-이렇게 접근할 경우 60fps 의 프레임마다 조회 수행

```C
useFrame(() => (ref.current.position.x = api.getState().x))
return <mesh ref={ref} />
```

-getState 메서드를 활용하자

##### 무차별적인 런타임 마운트를 자제하자

- threejs는 re-mount를 하지 않는것이 일반적인 방법이다. Re-mount를 할 경우 buffer와 materials가 재초기화/컴파일 을 수행하는데 이는 매우 비효율적인 작업

```C
{
  stage === 1 && <Stage1 />
}
{
  stage === 2 && <Stage2 />
}
```

이는 런타임 상황에서 리렌더링을 수행하는 코드
아래처럼 바꾸자 (visible속성을 활용하여 숨기는 방식)

```C
<Stage1 visible={stage === 1} />
<Stage2 visible={stage === 2} />
<Stage3 visible={stage === 3} />

function Stage1(props) {
  return (
    <group {...props}>
    ...
```

##### loop 내에서 새 객체를 생성하지 말것

```C
useFrame(() => {
  ref.current.position.lerp(new THREE.Vector3(x, y, z), 0.1)
})
```

new 키워드로 Vector3객체를 새로이 생성하고 있다 이는 프레임마다 새 객체를 생성하는 비효율적인 코드
아래와 같이 수정하자

```C
function Foo({ vec = new THREE.Vector(), ...props })
  useFrame(() => {
    ref.current.position.lerp(vec.set(x, y, z), 0.1)
  })
```

##### 일반로더 말고 useLoader를 사용하자

- threejs 로더는 비동기 자원을 로드할 수 있는 기능을 제공하나 재사용 하는 방식을 반드시 사용할것, 사용시마다 로드를 한다면 비효율적이다

```C
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
