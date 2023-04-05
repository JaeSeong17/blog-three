# Blog - THREE

![스크린샷 2023-03-26 143802](https://user-images.githubusercontent.com/37216958/227757466-e9c58bfd-7a33-46ef-8172-90ba91032825.png)
1인 프로젝트로 개인 블로그를 개발합니다.<br>
사용 기술: React, reduxjs/toolkit, redux-saga, Typescript, three.js, gsap
프로젝트 배포 주소: https://blog.jsdatabase.site/

| 개발 문서                                                                 | 개인 기록                                                                                                                                                                                                           |
| :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| - [Project Spec](#proejct-specification) <br> - [Dev Report](#dev-report) | - [react](#react) <br> - [react-redux/toolkit](#reduxjstoolkit) <br> - [typescript](#typescript) <br> - [three.js](#threejs) <br> - [useFrame의 효율적인 코드 작성법](#useFrame의-효율적인-작업을-위한-코드-작성법) |

---

# Proeject Specification

```bash
src
├─components
│  ├─html       // Canvas 내부 html
│  │  ├─auth        // AuthBox의 로그인/회원가입 화면
│  │  ├─common      // 각 화면 구성에 사용되는 최소 단위 컴포넌트
│  │  ├─post        // 포스트 뷰어
│  │  ├─postPanel   // Board의 패널 화면
│  │  ├─root        // canvas의 three component와 연결 부
│  │  ├─search      // SearchBoard 검색 패널 화면과 검색창 화면
│  │  └─write       // 글 작성
│  └─three      // Canvas 내부 3d 컴포넌트
│      ├─anim       // 애니메이션 모듈
│      ├─authBox    // 로그인 Box
│      ├─board      // 글 목록 Board
│      ├─canvas     // 최상위 Canvas
│      ├─common     // 화면 구성 최소 단위 컴포넌트 및 단일 컴포넌트
│      ├─container  // 컨테이너 - 관계별 단위 컴포넌트
│      ├─scene      // 화면 구성 Scene
│      ├─search     // 글 검색 Board
│      └─template   // 컴포넌트 세팅 값 재사용을 위한 템플릿
├─lib
│  └─api    // axios-api http request 연결
├─modules   // redux/toolkit - reducer modules
└─static    // 정적 데이터 저장 camSetting

```

---

![diagram](https://user-images.githubusercontent.com/37216958/230162081-17674ae9-b102-43d7-add5-47a09c2219d5.png)

## html - Canvas 내부에서 3D 상에 배치되는 html

아래의 폴더 내 명세는 상위컴포넌트 -> 하위 컴포넌트 순서로 작성되었습니다.

### auth - 로그인 & 회원가입 html

- `LoginForm` : 로그인 화면
- `RegisterForm` : 회원가입 화면
- `AuthTemplate` : 로그인과 회원가입 화면의 중복 구현부 모듈화

### common - 화면 구성에 재사용되는 컴포넌트

- `AskModal` : 작업 재확인 모달
- `Button` : 공통 버튼 테마
- `HtmlWrapper` : Screen의 각 페이지 최상위 여백 설정

### post - Screen의 글 뷰어 html

- `PostPage` : `ScreenHtml` 내 뷰어 최상위 페이지
- `PostViewerContainer` : 뷰어의 글 로드, 수정/삭제 이벤트 핸들러 구현부
- `PostViewer` : 뷰어 내부 구현부
- `PostActionButton` : 사용자 본인 글에서 나타나는 수정/삭제 버튼
- `AskRemoveModal` : 삭제 재확인 Modal
- `CommentContainer`: 댓글 최상위 컴포넌트
- `CommentViewer`: 댓글 뷰어
- `CommentEditor`: 댓글 수정/작성
- `CommentEditActionButtons`: 댓글 뷰어에서 나타나는 본인 댓글 수정, 삭제 버튼
- `AskRemoveCommentModal`: 댓글 삭제 재확인 Modal

### postPanel - Board의 Panel에 사용되는 html

- `PostItem` : 포스트 패널에 부착되는 글 목록의 단일 html
- `SubInfo` : 세부 정보를 위한 컴포넌트 (글 작성자, 날짜)
- `Tags` : 태그 표시을 위한 컴포넌트

### root - AuthBox, Screen의 3D Mesh에 적용되는 최상위 html

- `AuthHtml` : AuthBox에 부착되는 최상위 html
  - `LoginForm`과 `RegisterForm`을 state.auth.form에 따른 조건부로 화면 전환
- `ScreenHtml` : Screen에 부착되는 최상위 html
  - `PostPage`와 `WritePage`를 state.screenController.currMode에 따른 조건부로 화면 전환

### search - SearchBoard에 사용되는 html

- `SearchInput` : 검색 창
- `SearchItem` : SearchPanel에 부착되는 검색 글 목록의 단일 html

### write - Screen의 글 작성 html

- `WritePage` : 글 작성 최상위 html
- `EditorContainer` : 에디터 이벤트 핸들러, value 업데이트 구현부
- `Editor` : 글 작성 에디터 구현부
  - Quill 라이브러리 사용
- `TagBoxContainer` : 태그박스 이벤트 핸들러, value 업데이트 구현부
- `TagBox` : 태그박스 구현부
- `WriteActionButtonContainer` : 글 작성 확인 버튼의 이벤트 핸들러, WriteButton 속성 지정 구현부
- `WriteActionButton` : 글 작성 확인 버튼 구현부, 작성/수정 조건부로 전환

## three - 3D 화면을 구성하는 컴포넌트

Canvas 내부 컴포넌트 배치도
![image](https://user-images.githubusercontent.com/37216958/228236249-3fdccdf1-c734-4b64-8aec-7fa2bb40ad60.png)

### anim - 3D 컴포넌트에 적용되는 애니메이션

### authBox - 로그인/회원가입 컴포넌트

- `AuthBox` : 로그인/회원가입 상자 컴포넌트
  - `AuthHtml`을 통해 로그인/회원가입 화면을 보여줌
- `GuestButton` : 비로그인 상태로 진입 버튼(글 작성 비활성화)
- `RegisterButton` : 로그인/회원가입 화면전환을 위한 버튼

### board, search - 글 목록(Board), 글 검색 결과 목록을 보여주는 컴포넌트

일반 글 목록(Board)과 검색 글 목록(SearchBoard)가 같은 형태로 구성

- `Board` : 태그별 글 목록을 보여주는 컴포넌트 (Search는 검색 결과)
  - Panel On/Off 애니메이션 구현부 (패널 업데이트 로직 참고)
  - 패널 업데이트 로직
    ![image](https://user-images.githubusercontent.com/37216958/228236484-90999e78-a42d-4c04-8bf3-d53c36098a3a.png)
- `BoardPanel` : Board 글 목록의 각 단위
  - Panel의 클릭 애니메이션 구현부
- `Pagination` : 이전/다음 페이지 전환을 위한 페이지 버튼

### common - 화면 구성 재사용 단위 컴포넌트 및 단일 컴포넌트

- `ConnectBoxes` : Board와 Screen를 시각적으로 연결하는 컴포넌트
- `DataTower` : 진입부 좌측 컴포넌트
- `LogButton` : 블로그 내부의 로그인/로그아웃 버튼
- `MyProgile` : 현재 로그인한 사용자의 이름 표시
  - 비로그인시 Guest로 표시
- `Plane` : Canvas 공간 내 바닥
- `Screen` : 포스트 뷰어, 포스트 작성 화면이 부착되는 컴포넌트
- `SearchKey` : 검색 모드 진입을 위한 검색 키
- `Tagkey` : 태그별 글 목록 Board를 불러오는 태그 키
- `Titles` : 웹 진입부 제목 3D 텍스트
- `WriteKey` : 글 작성을 위한 작성 키

### container - 화면 구간 분할 단위 컴포넌트

- `FrontContainer` : 웹 진입부 컴포넌트 그룹
  - `Title`, `AuthBox`, `MyProfile`, `LogButton`을 포함하며 계정 관리 관련 컴포넌트를 포함하고 있음
- `KeyContainer` : 키 컴포넌트 그룹
  - `TagKey`, `WriteKey`, `SearchKey`를 포함하고 있음
  - state.camController.target에 따라 Key 전체 On/Off 애니메이션 컨트롤 구현
- `BoardContainer` : 글 목록을 보여주는 Board 컴포넌트 그룹
  - state.camController.target에 따라 Board 전체 On/Off 애니메이션 컨트롤 구현
  - `TagKey` 클릭을 통해 진입
- `SearchBoardContainer` : 검색창, 검색 결과를 보여주는 SearchBoard 컴포넌트 그룹
  - state.camController.target에 따라 SearchBoard 전체 On/Off 애니메이션 컨트롤 구현
  - `SearchKey` 클릭을 통해 진입

### template - 3D 컴포넌트 생성 시 동일 속성 재사용을 위한 템플릿

- `KeycapTemplate` : 키캡 메쉬 재사용을 위한 템플릿
  - Long/Short 타입을 지정하여 사용할 수 있음
- `Text3DTempalte` : 3D 텍스트 중복 속성 재사용을 위한 템플릿

## lib - http request api (Axios)

- `createRequestSaga` : request에 대한 success/failure 후처리 로직 재사용 템플릿
  - request/response 처리중 loading state 업데이트
  - request 응답 수신 결과에 따라 $`{action}`Success / $`{action}`Failure 리듀서 호출

### api - 서버 요청 api

- `auth` : 로그인, 계정 api
- `client` : axios 인스턴스 생성
- `posts` : post 요청 api
  - 태그별 글 목록, 검색 결과 목록, 특정 포스트 내용 요청

## modules - redux

- `auth` : 로그인/회원가입 상태 관리
- `boardController` : (태그) 글 목록 상태 관리
- `camController` : 카메라 컨트롤 상태 관ㄹ;
- `loading` : 모든 서버 요청 api의 loading 로직(재사용)
- `post` : 포스트 뷰어 상태 관리
- `screenController` : 스크린 상태 관리
- `search` : 검색 목록 상태 관리
- `user` : 현재 로그인 정보 관리
- `write` : 글 작성 상태 관리

## static

- `camSetting` : 화면 전환시 카메라 위치, 시야 각도 설정 값
- `tags` : 태그 목록

## User Flow

![image](https://user-images.githubusercontent.com/37216958/228266142-303b6221-e009-4613-9fc8-97073679df22.png)

- 화면 전환은 각 컴포넌트 클릭시 camController.target 값을 갱신하는 방식으로 동작
- MainScene에서 target 값이 갱신됨에 따라 static/camSetting에 설정 되어있는 각 target의 위치와 각도로 카메라 이동

---

# Dev Report

- :pencil2: : 새로 알게 된 점
- :wrench: : 추가한 작업
- :pushpin: : 추가 필요 기능
- :heavy_exclamation_mark: : 버그
- :heavy_check_mark: : 수정된 버그

#### 2023.04.01

- :wrench: 카메라 제어 최적화

  - 카메라 움직임 제어 방식을 useFrame에서 useEffect + gsap으로 변경
  - 카메라 움직임이 없는 상태에도 useFrame에 의해 불필요한 연산이 수행되고 있음을 확인
    - useFrame은 React Three Fiber에서 제공하는 훅으로, 매 프레임마다 호출됩니다. useFrame은 requestAnimationFrame에 의해 호출되며, 캔버스의 렌더링 주기에 따라 호출 빈도가 결정됩니다.

  ```C
  useFrame(state => {
    state.camera.position.lerp(vec.set(camPos.x, camPos.y, camPos.z), 0.015);
    lookAtPos.lerp(vec.set(camAngle.x, camAngle.y, camAngle.z), 0.015);
    state.camera.lookAt(lookAtPos);
  });
  ```

  - Camera 객체의 위치는 동일한 방식으로 제어 가능하나 카메라가 바라보는 각도를 회전하는 방식이 다르므로 주의
    - 이전에는 lookAt 메서드를 활용해서 바라볼 좌표를 주는 방식
    - lookAt은 메서드이므로 gsap의 target으로 전달 불가능
    - 따라서 Camera 객체의 회전 값(quaternion)을 변경해주는 방식으로 변경

  ```C
  useEffect(() => {
    // 카메라 위치 이동
    gsap.to(camera.position, {
      x: camPosVec.x,
      y: camPosVec.y,
      z: camPosVec.z,
    });

    // 카메라 회전을 위한 quarternion 계산
    const cameraQuaternion = new THREE.Quaternion();
    const upDirection = new THREE.Vector3(0, 0, 1); // 카메라 상단 방향
    const cameraRotationMatrix = new THREE.Matrix4().lookAt(
      camPosVec,
      tarPosVec,
      upDirection,
    ); // 카메라위치 좌표, 바라볼 좌표, 카메라 상단 방향으로 바라보는 각도 계산
    cameraQuaternion.setFromRotationMatrix(cameraRotationMatrix); // quarternion 변환
    cameraQuaternion.normalize(); // 정규화

    // 카메라 회전
    gsap.to(camera.quaternion, {
      x: cameraQuaternion.x,
      y: cameraQuaternion.y,
      z: cameraQuaternion.z,
      w: cameraQuaternion.w,
    });
  }, [target]);
  ```

- :wrench: CLOUDTYPE 호스팅 완료
- :pushpin: 모바일을 고려한 화면 개발 필요
- :heavy_exclamation_mark: 모바일에서 회원가입 후 register()는 작동하나, check()가 정상적으로 작동하지 않음

#### 2023.03.31

- :pencil2: 최적화와 관련된 React의 훅

  - useMemo(() => fn, [deps]): deps값의 변경 시 () => fn 함수를 실행하고 그 반환값을 반환

    - 의존성 배열내 값이 변경되지 않더라도 같은 컴포넌트 내 다른 값의 변경에 의해 해당 컴포넌트가 리렌더링 된다면 컴포넌트 내 모든 로직이 재 실행 되기 때문에 변경이 없는 연산 결과를 무의미하게 다시 연산하게 되는 경우가 발생
    - 해당 함수의 결과가 달라지는 의존 값의 변경 시에만 함수를 다시 실행하도록 하고 이외에는 메모이제이션 해둔 이전 결과를 그대로 반환하는 방법

    ```C
    function App() {
      const [x, setX] = useState(0);
      const [y, setY] = useState(0);

      // x값이 변경될때만 x 로그를 찍도록 함
      // useMemo를 사용하지 않으면 y값이 변경되더라도 App 컴포넌트가 리렌더링 되면서 console.log가 수행되어 버림
      // 함수의 연산 결과를 그대로 사용하는 방법으로도 사용
      useMemo(() => {console.log(x)}, [x]);
      // temp = useMemo(() => operate(x), [x]);

      // 두 개의 버튼을 설정했다. X버튼만이 x를 변화시킨다.
      return (
        <>
          <button onClick={() => setX((curr) => (curr + 1))}>X</button>
          <button onClick={() => setY((curr2) => (curr2 + 1))}>Y</button>
        </>
      );
    }
    ```

    - 공식문서에서는 useMemo는 성능 최적화를 위해 사용할 수는 있지만 의미상으로 보장이 있다고 생각하지 않도록 권장
    - 가까운 미래에 useMemo 기능 수정 가능성이 있으므로 최대한 사용하지 않고도 동작하도록 코드 작성을 권장

  - useCallback: useMome를 기반으로 callback 함수를 메모이제이션 하는 훅

    - useCallback(fn, deps)은 useMemo(() => fn, deps)와 같습니다.
    - 그렇다면 왜 굳이 별도로 다른 훅을 만들었을까?

      - 자식 컴포넌트에 함수 자체를 props로 전달하는 경우

        - 함수는 같은 값을 반환하더라도 함수 자체의 참조로 비교되기 때문에 다르다고 판단

        ```C
        const funcA = function() {
          return 1;
        };
        const funcB = function() {
          return 1;
        };
        // 서로의 참조가 다르기 때문에 false
        console.log(funcA === funcB);
        ```

        - 따라서 특정 함수를 props로 전달하는 경우 해당 컴포넌트 리렌더링 시 함수가 재 선언 되고 자식 컴포넌트에서는 전달받은 함수가 새로운 함수로 인식, 리렌더링 수행

        ```C
        function App() {
          const [name, setName] = useState('');
          const onSave = useCallback(() => {
            console.log(name);
          }, [name]);

          return (
            <div className="App">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Profile onSave={onSave} />
            </div>
          );
        }
        ```

      - 특정 함수 자체를 의존성 배열의 값으로 사용하는 경우

        ```C
        const [user, setUser] = useState(null);

        const fetchUser = useCallback(
          () =>
            fetch(`https://your-api.com/users/${userId}`)
              .then((response) => response.json())
              .then(({ user }) => user),
          [userId]
        );

        useEffect(() => {
          fetchUser().then((user) => setUser(user));
        }, [fetchUser]);
        ```

  - React.memo: 렌더링 결과를 재사용하는 방법 (이전과 똑같은 컴포넌트를 렌더링 해야하는 경우)
    ```C
    // React.memo를 사용해 tag값이 바뀔 때만 리렌더링되도록 처리
    // onRemove함수까지 useCallback 처리해야 기대한 최적화 효과 나타남
    const TagItem = React.memo(
      ({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) => (
        <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
      ),
    );
    ```
    - 해당 의존성 props의 비교는 `얕은비교`이므로 깊은 비교 혹은 다른 비교가 필요하다면 두번쨰 인자로 비교함수 전달 가능
    ```C
    export default React.memo(MyComponent, areEqual);
    ```
    - 공식문서에는 렌더링 `방지`를 위해 사용하지 않을 것을 권장

- :wrench: 댓글 기능
  - 포스트 뷰어 하부에 댓글 기능을 추가
  - 포스트 뷰어에 글을 불러 올 때 댓글 정보(comment)도 같이 불러오도록 수정
  - 새 댓글 작성, 자신의 댓글 수정, 삭제 기능 포함
  - 글 삭제시 해당 글에 있는 댓글도 같이 삭제 되도록 함 (백엔드에서 처리)
  - :pushpin: 대댓글 기능을 추가해봐도 좋을 것 같음

#### 2023.03.26

- :wrench: 검색 결과가 없는 경우 None 글자가 나타나도록 추가
  - SearchBoard에서 Panel과 NoneMark를 조건부로 전환하도록 구현

#### 2023.03.25

- :wrench: 새로고침 정책 수정
  - 글 또는 검색 목록에서 특정 포스트를 선택하여 Screen으로 진입 후 별도의 작업을 수행한 뒤 다시 목록으로 돌아왔을 때 자동으로 목록을 새로고침 하도록 변경
    - 자기 글 삭제 시 다시 목록으로 돌아왔을 때 삭제된 포스트가 목록에 그대로 남아 있기 때문에 새로 고침 해주는 것이 일반적이라 판단
- :wrench: 새로고침 로직 수정
  - 페이지 로드 요청을 `loadWaiting()` 하나로 일치시키고 모든 새로고침이 필요한 위치에서 `loadWaiting()`을 호출 하도록 수정
  - Board와 SearchBoard에 동일하게 적용 (Proj-spec의 패널 업데이트 로직 참조)
- :wrench: Screen에서 exit시 돌아갈 시점을 기억하기 위해 history 추가
  - Screen으로 진입한 시점을 기억하고 이후 Screen에서 나왔을 때 이전 시점으로 돌아갈 수 있도록 camController에서 history를 기억하도록 추가 (board에서 panel를 클릭하여 screen으로 들어간 경우 screen에서 나올 때 board로 돌아갈 수 있도록 함)

#### 2023.03.24

- :pencil2: useEffect의 비동기 처리

  - useEffect 내부에서 처리되는 작업은 모두 비동기로 수행되기 때문에 처리 순서를 보장할 수 없음

  ```C
  // setA가 setB보다 먼저 처리된다는 보장이 없다.
  useEffect(() => {
    dispatch(setA('a'));
    dispatch(setB('b'));
  },[]);
  ```

  - 따라서 처리 순서를 보장하고 싶다면 두 함수를 직렬화 하는 작업이 필요
  - dispatch는 Promise타입의 결과를 반환하지 않기 때문에 바로 async/await을 사용할 수 는 없지만 Thunk, Saga와 같은 미들웨어를 사용하여 Promise 타입을 반환하도록 한 뒤 async/await을 사용하여 직렬화 할 수 있음

  ```C
  import { createAsyncThunk } from '@reduxjs/toolkit'
  export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId, thunkAPI) => {
      const response = await fetch(`/api/user/${userId}`)
      const data = await response.json()
      return data
    }
  )
  async function getUser(userId) {
    try {
      const result = await dispatch(fetchUser(userId))
      console.log(result) // 비동기 작업의 결과값
    } catch(error) {
      console.log(error)
    }
  }
  ```

- :wrench: 컴포넌트들의 축을 일치시키고 rotation으로 돌려서 사용하는것이 이후 애니메이션의 재사용성에 유리하다
  - SearchBoard의 축을 Board의 축과 일치 시켜 board의 애니메이션을 재사용 할 수 있도록 수정
- :heavy_check_mark: PanelsOn/Off 애니메이션에서 파라미터로 전달받은 RefObject<Group>[] 중 요소에 null이 있는 경우를 처리하지 못함
  - null type check 필요

#### 2023.03.23

- :wrench: 검색 창 기능 구현 (프론트)
- :wrench: 페이지네이션 버튼의 활성화/비활성화로 포스트 로드 미완료 중 요청을 막기
  - waiting, complete state를 참조하여 두 값 모두가 false인 경우에만 클릭이 가능하도록 활성화
- :heavy_exclamation_mark: 특정 사용자의 포스트 목록으로 이미 로드 된 포스트가 작성자 또는 관리자에 의해 삭제되었을 경우, 해당 포스트에 접근시 '삭제되었거나 없는 글입니다'와 같은 오류 처리가 필요
- :heavy_check_mark: board가 on 되어 있는 상태에서 다른 tag 버튼를 누르는 경우
  - 애니메이션 작동 오류 (Panel On/Off 애니메이션이 작동 X)
  - 이전 tag에서 페이지가 넘어가 있는 경우 다른 태그로 이동시 페이지 수가 초기화 되지 않음
  - board on 상태에서 다른 태그로 이동후 key로 탈출했을때 board가 off되지 않음
    - board on 중에는 아예 다른 tag 키 클릭을 막거나
    - tag변환시 tag에 의존하는 useEffect 내부 로직을 수정할 필요

#### 2023.03.22

- :wrench: 검색 창 기능 구현 (백엔드)

#### 2023.03.20

- :pencil2: 타입 스크립트의 상속을 활용하기

  - 타입 스크립트의 interface도 상속이 가능하다
  - 부모 인터페이스에서 선언한 특정 속성을 자식 인터페이스에서 옵셔널로 바꿀 수 있을까? -> No
    - 인터페이스를 상속하는 경우 부모 인터페이스에서 정의된 속성과 그 타입이 일치해야 한다
  - 그렇다면 부모 인터페이스를 상속받아 특정 속성을 제거, 변경하려면? -> 유틸리티 타입을 사용하자

  ```C
  interface Person {
    name: string;
    age: number;
  }

  //interface Student extends Person {
  //  name?: string; 특정 속성의 타입을 변경, 옵셔널 여부를 변경 할 수 없다
  //  age: number;
  //}

  // Omit같은 유틸리티 타입으로 타입에 정의된 속성을 변경 할 수 있다
  // Omit으로 받은 타입을 부모 타입으로 상속 받을 수 있음
  type Student = Omit<Person, 'name'>
  //type Student = Omit<Person, 'name'> & {
  //  student: number;
  //}
  ```

  - extends로 조건부 작업을 수행할 수 있음

  ```C
  // authReducerCarrier의 타입을 FormReducerCarrier 제네릭의 파라미터 타입에 따라 결정
  export interface FormReducerCarrier<T extends AuthFormType> {
    authReducerCarrier: T extends 'login'
      ? Omit<AuthReducerCarrier, 'authRegister'>
      : Omit<AuthReducerCarrier, 'authLogin'>;
    userReducerCarrier: UserReducerCarrier;
    setTargetToKey: () => void;
  }
  ```

#### 2023.03.19

- :wrench: 이전에 작성한 자신의 글을 수정/삭제 하는 기능 추가

- ~~:pushpin: 삭제시 확인하는 모달 창 추가 필요~~ 완료

- :heavy_check_mark: Quill Editor 사용과 title input의 중복 출력 현상 발생
- :heavy_check_mark: 삭제 후 board로 돌아왔을 때 업데이트 된 글 목록이 적용되지 않음
  - 삭제 수행 후 board로 돌아올 때 loadPost api를 요청하고 현재 board에 업데이트 하는 작업이 필요

#### 2023.03.17

- :wrench: auth store를 root store로 병합 완료

  - authBox내부 Html과 외부 Html간의 상태 정보를 동기 시켜주는 작업을 제거하고 하나의 state로 관리
  - key target에서 logout 버튼으로 로그아웃 시도시 authbox내 스토어와 state를 동기화 해야 하는 작업 때문에 코드가 복잡해졌던 문제 해결

- :heavy_check_mark: 로그아웃시 LoginForm에서 로그인을 시도하는 작업이 수행됨 (check api가 호출)
  - GET response가 401 에러를 보내는 것을 보아 로그아웃은 정상적으로 수행됨

#### 2023.03.16

- :wrench: Keycap 리팩토링

  - 초기에 태그 버튼을 위해 구현했던 Keycap을 KeyContainer에서 tags.map을 사용하여 태그 목록 버튼을 구현
  - 이후 글작성 버튼을 추가하면서 Keycap에 writeBtn:boolean 속성을 주어 조건부로 동작하도록 추가하면서 구현부가 복잡해짐
  - 키캡 3D메쉬 파일을 여러곳(로그아웃 버튼, 글쓰기 버튼, 태그 버튼)에서 사용하게 되면서 메쉬 로드 코드의 재사용성이 높아짐
  - 이후 키를 추가할 때마다 메쉬를 로드하고 중복된 스타일 속성의 반복을 피하기 위해 KeycapTemplate으로 메쉬 부분만 모듈화 하는 방식으로 리팩토링을 수행

- :wrench: Text3D 리팩토링

  - Text3D에 같은 속성으로 생성되는 컴포넌트 다수 존재 (Titles, MyProfile, RegisterButton, GuestButton)
  - 각 컴포넌트 별로 다르게 지정하는 속성 (position, scale 등)만을 받아 같은 스타일로 생성해주는 Text3DTemplate으로 모듈화

- :wrench: TS 마이그레이션 완료

- ~~:pushpin: 작성한 자신의 글 수정 기능~~ 완료
- ~~:pushpin: 글 검색 기능~~ 완료

- :heavy_check_mark: 로그아웃 버튼 버그 발견
  - 로그아웃 버튼 클릭시 reducer를 정상적으로 호출하지 못함 (localStorage에 저장된 토큰이 삭제되지 못함)
  - ts 마이그레이션 하는 과정에서 logout Button의 axios api 호출부에 변경이 발생한 듯 보임
  - Canvas내부 Html에 redux가 연결되지 못하는 문제 해결(임시방편)을 위해 store를 여러개 두었던 구조로 두 store 간의 state를 동기 시켜야 하는 문제 발생
  - 하나의 store로 통합하고 Canvas내부 Html의 속성으로 state와 action을 전달하는 방식으로 수정을 계획

#### 2023.03.15

- :pencil2: public 폴더와 src 폴더의 차이는? 정적 파일을 public에?

  - public폴더는 빌드시 변환되지 않고 그대로 복사된다. 이미지 파일과 같은 정적 파일은 public 폴더에 위치시켜 별도 처리 없이 사용할수 있음
  - src 폴더에 위치시키면 빌드 과정에서 변환되어 번들링 된 파일 내부에 포함되어 용량이 커지고 초기 로딩 시간이 늘어갈 가능성이 있음
  - 하지만 이미지 파일을 동적으로 로드해야 하는 경우 src 폴더에 위치시키는 것이 코드가 필요에 따라 동적으로 생성해서 관리 할 수 있어 이점이 있다.

- :pencil2: RefObject와 ForwardedRef의 차이는?
  - ForwardedRef는 React.ForwardedRef<T> 제네릭 타입으로 선언, T타입의 참조 대상을 다루는 React.Ref 타입
  - RefObject타입이 ForwardedRef타입의 부분집합으로 RefObject를 ForwardedRef로 사용할 수 있음
  - 하지만 ForwardedRef가 더 구체적인 타입으로 RefObject와 같지는 않다
    - ForwardedRef는 current속성이 없으므로 useImperativeHandler(forwardRef, () => {}); 방식으로 사용해야함
    - ForwardedRef<T>의 타입은 ((instance: T | null) => void)로 T 혹은 null 타입의 인스턴스를 생성하는 콜백함수에 의해 생성된 인스턴스가 할당되는 타입

#### 2023.03.14

- :pencil2: gsap 애니메이션을 모듈화 해서 분리했는데 재사용성은 떨어져 보임
- :pencil2: 각 컴포넌트에 적용할 On/Off애니메이션을 일일이 다 만드는것 보다 움직임에 필요한 x, y, z 값을 전달받아 움직이는 애니메이션 하나를 두는게 관리 측면에서 용이해 보임

- :pencil2: GLTF mesh파일을 사용하는 방식 참조

```C
const gltf = useLoader(GLTFLoader, '/path/to/file.gltf');
// gltf 객체는 보통 블렌더로 찍은 3d메쉬 파일을 받아올 때 사용할 수 있는 형식이며
// nodes, scene 중에 하나를 선택에서 메쉬 파일을 받아올 수 있음.
// 하나의 파일에는 여러개의 mesh가 포함될 수 있으므로 아래의 방식으로 찾을 수 있음
const object = gltf.scene.childre.find(obj => obj.name === '찾고자 하는 메쉬 이름') as Mesh;
// 여기서 할당되는 객체의 타입을 추론하지 못하기 떄문에 단언 필요
// 이후 <mesh> 컴포넌트에서 geometry 속성으로 사용할 수 있음
const loadedObj = () => {
return <mesh geometry={object.geometry} />
}
```

#### 2023.03.13

- :pencil2: @types/Three 타입 모듈 설치
  -> GroupProps와 Group 타입 차이가 있음, Group 컴포넌트는 THREE.Group 타입을 상속하기 때문에 ref에 RefObject<GroupProps>를 등록하면 오류 발생
- :pencil2: gsap의 yoyo속성을 가지는 애니메이션은 kill을 하기 전까지 반복 재생 - 자원소모

- :heavy_check_mark: Pagination Button을 Panel들이 업데이트 완료되기 전에 누르면 Page 숫자만 올라가고 board가 업데이트 되지 못함
  - panels이 loading중 일때 pagination button이 클릭되지 못하게 막아야함

#### 2023.03.12

- :pencil2: useEffect의 의존성 배열에 중첩객체를 넣는다면 해당 객체의 최상위에 위치한 값만 추적되고 내부 객체의 값은 감지하지 못함
  - 의존성 배열에 추적하려는 값에는 중첩객체 까지 모두 명시해주어야 한다.

```C
const obj = {
  nestedObj: {
    prop1: 'value1',
    prop2: 'value2'
  },
  prop3: 'value3'
}

useEffect(() => {
  // obj.nestedObj.prop1 값을 참조하는 코드
}, [obj, obj.nestedObj]); // 중첩객체도 추가해주어야 함
```

- :wrench: Board 구조에서 전체 동작 애니메이션을 Container쪽에서 모두 처리하고자 Board와 panels의 ref를 모두 BoardContainer까지 끌어올려 제어하려고 리팩토링을 시도

```C
const Parent = () => {
  const doubleNestedRef = useRef();

  return <Child ref={doubleNestedRef} />
};

const Child = forwardRef((props, doubleNestedRef) => {
  const nestedRef = useRef();
  useImperativeHandler(doubleNestedRef, () => {
    nestedRef,
  })    // 중간층에서 최하층의 ref을 받아 최상층으로 올리는 객체 --- 1

  return <GrandChild ref={nestedRef} />
});

const GrandChild = forwardRef(() => {
  const ref = useRef();
  useImperativeHandler(nestedRef, () => {
    ref,
  })    // 최하층에서 자신의 ref를 받아 중간층으로 올리는 객체 --- 2

  return <div ref={ref} />
})
```

- 하지만 코드의 의존성이 심하게 높아짐 (컴포넌트 계층간 연결성이 높아지면서 본인도 헷갈리기 시작)
- 컴포넌트 본인의 요소를 컨트롤하는 애니메이션 함수를 생성해서 함수자체를 넘겨주는 방식으로 구현하는것이 좋아보임 (직접 요소의 속성을 제어하지 않고 함수에게 제어권을 넘김)

- :pencil2: 부모 컴포넌트에서 이벤트 핸들링을 하더라도 Html 클릭시 부모로 이벤트 버블링이 되지 않아 이벤트 처리를 하지 못함
  - Canvas 내부에서 생성된 Html은 전체 DOM트리와 연결되어 있지 않아 발생하는 현상으로 보임
  - 부모 컴포넌트에서 이벤트 핸들러를 속성으로 전달하여 Html 내부에서 실행 하도록 별도 처리가 필요함
    - PostItem 클릭시 Html요소가 이벤트 객체를 가로채면서 Screen으로 넘어가는 동작을 수행하지 못하던 문제 해결

```C
const ThreeComponent = () => {
  const ClickHandler = (e) => {
    // 이벤트 핸들러
  };

  return (
    <group onClick={panelClickHandler}> // 부모 컴포넌트(3d요소)의 이벤트 핸들러 등록
      <mesh>
        <Html
          <Item panelClickHandler={panelClickHandler} />  // 자식 컴포넌트 (Html)에 이벤트 핸들러 전달
        </Html>
      </mesh>
    </group>
  );
}
```

#### 2023.03.11

- :pencil2: useRef로 생성한 ObjectRef 객체는 등록한 요소의 실시간 변경을 추적할 수 있다. 하지만 ref 객체의 current 값을 직접 전달한다면 현재 상태를 추적하는 기능은 없는 단순한 값을 전달하므로 새로운 값이 갱신된다는 보장이 없다.
  - 따라서 만약 useImperativeHandle로 자식의 여러 값을 부모의 forwardRef로 연결하고 싶을 때에는 반드시 자식에서 생성되는 ref 객체 자체를 넘겨주어야 한다.

```C
type ChildRef = {
  firstChildRef: RefObject<HTMLDivElement>;
  secondchildRef: RefObject<HTMLDivElement>;
}

const Child = () => forwardRef<ChildRef>((props, ref) => {
  useImperativeHandle(ref, () => ({
    // firstChildRef: firstChildRef.current,
    // secondChildRef: secondChildRef.current,
    // 이렇게 current값을 넘겨주면 childRef의 부모에서 받은 childRef의 값은 실시간으로 변경되는 값을 추적하지 못함
    // 리렌더링 시 값이 갱신되지 못한다는 의미

    firstChildRef,
    secondChildRef,
  }))

  return (
    <>
      <div ref={firstChildRef}> First </div>
      <div ref={secondChildRef}> Second </div>
    </>
  )
});

const Parent = () => {
  const childRefs = useRef<ChildRef>(null);

  useEffect(() => {
    // childRefs.current.firstChildRef 처럼 자식 컴포넌트의 요소에 등록된 ref에 접근할 수 있음
  }, [])


  return <Child ref={childRefs} />
}
```

#### 2023.03.09

- :pencil2: .d.ts 파일 내 declare module 'module-name' 키워드로 타입 모듈을 선언할 수 있다
- :pencil2: .d.ts 파일은 js로 컴파일 되지 않는 타입만 정의된 파일로 module 블럭 외부에 import 키워드 사용시 읽어오지 못함

- :wrench: Typescript의 .d.ts에 타입들을 별도로 모듈화 수행

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

:wrench: Typesciprt 도입 시도

- redux 모듈과 api쪽부터 마이그레이션
- type, interface중 interface로 타입 선언하자 (확장성 관련 문서 참조)
- Union 사용시 type guard, type assertion를 적절히 사용하자. (Union에 존재하는 모든 타입들이 이후 수행할 작업의 타입 검사를 통과해야하므로)
  - 각 타입별로 수행할 작업을 typeguard로 걸러내기
  - 해당 작업에 사용되는 변수의 타입을 type assertion로 확정해주기
- .d.ts파일로 프로젝트의 타입들을 별도 모듈로 분리하여 관리할 수 있음 (.d.ts 파일은 .ts파일과 달리 .js로 컴파일 하지 않음, .d.ts 관련 문서 참조)

- :pushpin: 글 에디터로 Quill을 사용중인데 markdown을 이해하지 못하는 것 같다. 찾아보니 markdown 확장 라이브러리가 있는것으로 보임

#### 2023.03.04

- :pencil2: forwardRef가 두 계층 이상을 통과하지 못하는 것으로 보임, 부모-자식 계층을 하나만 연결할 수 있음
- :pencil2: gsap timeline으로 순차 애니메이션 적용시 value로 넘겨주는 두번째 인자 뒤에 세번쨰 인자로 label을 넘겨 병렬로 처리할 수 있음

```C
// 1번 이후 (2, 3)번이 묶여 병렬로 수행
gsap.timeline()
.to(objectRef1, {value})
.to(objectRef2, { value }, 'label')
.to(objectRef3, { value}, 'label');
```

- ~~:pushpin: 로그인 박스 내 스토어와 three 전체의 스토어 두개에서 계정정보가 중복되어 저장되고 있어 동기화 작업이 필요함~~
  - ~~이후 하나의 스토어에서 관리할 수 있도록 수정 필요~~ 완료

#### 2023.03.03

- ~~:pushpin: 회원가입 구현: 가입 완료시 바로 로그인 되어 내부로 진입되도록 했으나 이후 수정하는 것이 필요~~ 완료
- :pushpin: 회원가입과 로그인시 인증중임을 사용자가 확인 할 수 있도록 loading ui를 구현하는 것이 필요

- :heavy_check_mark: auth store의 initialize reducer가 auth정보를 초기화 하지 못하는 문제 발견, 이 때문에 로그아웃을 하더라도 auth정보를 통해 다시 자동 로그인 되어 버리는 문제 발생.
  - 로그아웃시 root store랑 auth store 둘다 user를 비워주도록 적용해야함

#### 2023.03.02

- :pencil2: reducer의 action을 dispatch할때 payload로 정보를 담아 보낼때 여러값을 보내야 한다면 객체 타입으로 감싸야함

```C
// 이렇게 보내면 payload에는 data1만 담김
dispatch(action(data1, data2));

// 객체로 감싸서 보내자
dispatch(action({data1, data2}));
```

- :wrench: Screen 화면을 url을 활용한 Navigator 방식으로 전환하던 것에서 redux-store값에 따라 조건부 컴포넌트로 전환하는 방식으로 변경 완료

#### 2023.03.01

- :pencil2: LoginBox에서 로그인창과 회원가입 창 전환을 위한 Router, Screen에서 포스트 뷰어를 위한 Router 동시 사용시 하나만 작동함
  -> BrowserRouter는 하나만 사용이 가능하다, 중첩 라우터를 사용하거나 라우터 하나는 다른 방식으로 구현이 필요함

- :wrench: LoginBox에 threejs와 html이 한번에 들어가있던 구조를 분리하는 작업 진행
  -> LoginBox에서 AuthBox로 전환, 내부에서 LoginForm이 같이 구현되어있던 부분을 html 파일로 분리

#### 2023.02.27

- :wrench: 로그인한 계정 ID를 띄우는 텍스트와 로그아웃 버튼 & 로직 추가

- ~~:pushpin:localstorage에 계정 정보 있을 경우 자동 로그인 수행시 첫 화면 스킵~~ 완료
  -> '재성의 정보저장소' 텍스트 단계가 스킵되지 않도록 수정

  - 원인 : 자동 로그인 로직에서 화면 전환 명령이 포함되어 있음
  - 해결 : 자동 로그인은 수행하되 화면 전환 로직을 분리 (첫 텍스트 클릭시 로그인화면 or 키화면 전환을 로그인 여부에 따라 결정)

- ~~:pushpin: 로그아웃시 로그인 박스 화면으로 진입하면 기존 화면에 있던 버튼들이 바닥 패널 밑으로 내려가는게 늦음~~ 완료
  -> 컴포넌트들이 바닥 밑으로 바로 내려가도록 수
  정 필요함

#### 2023.02.25

- :wrench: eslint, prettier 적용 (적용했다고 생각했었는데 적용이 안되고 있었음)
  -> 컴파일시 스타일에 어긋나는 것도 마치 오류처럼 띄워줌
- :wrench: typescript 적용 시도

#### 2023.02.24

- :heavy_check_mark: 글쓰기 완료 후 스크린에서 나갔을 때 버튼 목록으로 바로 이동하지 못하고 글 목록으로 넘어가는 문제
  - 원인 : '포스트 등록' 버튼 클릭 시 currMode를 write에서 post로 바꾸는 로직 존재
  - 해결 : 포스트 등록 완료 후 작성 모드에서 뷰어 모드로 전환하는 것은 currMode 전환에서 담당하지 않고 포스트 등록 버튼의 navigate 동작으로 수행되므로 해당 로직 제거

#### 2023.02.23

- :heavy_check_mark: 글쓰기 완료 후 다시 글쓰기 창 진입시 이전 글작성 완료 창이 계속 나타나는 문제
  - 원인 : '포스트 등록' 버튼이 store의 post값을 참조하여 뷰어로 전환하는 로직이 존재하는데 첫 글쓰기 완료 후 다시 글쓰기로 재 진입시 이전 post 등록 완료 정보가 초기화 되지 않아 그대로 참조함
  - 해결 : 글쓰기 페이지 진입시 store.write 정보를 initialize 함

---

### react

- useRef와 forwardRef를 동시에 사용하고 싶을 때에는 useImperativeHandle를 사용하자
- useImperativeHandler가 생성하는 객체는 ref 객체가 생성될 때 실행되며 React 컴포넌트의 렌더링 사이클과는 별개로 작동
- 때문에 useImperatvieHandler가 직접 값을 수정하면 렌더링 사이클 (props,state 변경시 호출되는 초기 렌더링/ 부모컴포넌트의 리렌더링에 의한 본인 렌더링/ 강제 컴포넌트 언마운트 혹은 리렌더링시)이 감지하지 못하고 화면에 반영되지 않는 경우가 발생할 수 있음

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

### three.js

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
  - 이벤트 버블링에도 같은 이유로 부모 컴포넌트로 전달되지 않고 있는것으로 확인, 부모에서 실행할 이벤트 핸들러를 파라미터화 하며 Canvas내부의 Html로 전달해주어야 함
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
