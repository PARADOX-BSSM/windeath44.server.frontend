import { Suspense, lazy } from 'react';
import { TaskType } from '@/modules/typeModule.tsx';
import { useAtom } from 'jotai';
import { isLogInedAtom } from '@/atoms/windowManager.ts';
import { useProcessManager } from '@/hooks/processManager.tsx';
import { getTaskCreators } from '@/services/windowManager/tasks.tsx';

// 어플리케이션 아이콘 이미지 에셋
import myComputer from '@/assets/appIcons/my_computer.svg';
import setting from '@/assets/appIcons/setting.svg';
import search from '@/assets/appIcons/search.svg';
import trashBin from '@/assets/appIcons/empty_bin.svg';
import chatbot from '@/assets/appIcons/ChatBot.svg';
import game from '@/assets/appIcons/game.svg';
import Sulkkagi from '../applicationList/sulkkagi';
import SulkkagiApproach from '../applicationList/sulkkagiApproach';
import SulkkagiMenu from '../applicationList/sulkkagiMenu';

// lazy를 이용한 어플리케이션 컴포넌트 로드
const Terminal = lazy(() => import('@/applications/applicationList/terminal/index.tsx'));

const MemorailHistory = lazy(
  () => import('@/applications/applicationList/memorialHistory/index.tsx'),
);
const MemorialCommit = lazy(
  () => import('@/applications/applicationList/memorialCommit/index.tsx'),
);
const MemorialPreview = lazy(
  () => import('@/applications/applicationList/memorialPreview/index.tsx'),
);

const AnimationSelect = lazy(
  () => import('@/applications/applicationList/animationSelect/index.tsx'),
);

const MemorialApproach = lazy(
  () => import('@/applications/applicationList/memorialApproach/index.tsx'),
);

const Bow = lazy(() => import('@/applications/applicationList/bow/index.tsx'));

const MemorialMenu = lazy(() => import('@/applications/applicationList/memorialMenu/index.tsx'));

const Memorial = lazy(() => import('@/applications/applicationList/memorial/index.tsx'));

const Search = lazy(() => import('@/applications/applicationList/search/index.tsx'));

const MemorialApply = lazy(() => import('@/applications/applicationList/memorialApply/index.tsx'));

const MyComputer = lazy(() => import('@/applications/applicationList/myComputer/index.tsx'));

const MemorialMerge = lazy(() => import('@/applications/applicationList/memorialMerge/index.tsx'));

const Help = lazy(() => import('@/applications/applicationList/help/index.tsx'));

const Alert = lazy(() => import('@/applications/applicationList/alert/index.tsx'));

const TeachingChatBot = lazy(
  () => import('@/applications/applicationList/teachingChatBot/index.tsx'),
);
const ChatbotSelect = lazy(() => import('@/applications/applicationList/chatbotSelect/index.tsx'));

const ChatBot = lazy(() => import('@/applications/applicationList/chatBot/index.tsx'));

const AdminApp = lazy(() => import('@/applications/applicationList/adminApp/index.tsx'));

const GameApp = lazy(() => import('@/applications/applicationList/game/index.tsx'));

//Application Import 형식 예시
/*
{
        "component": <Suspense fallback={null}>{App 컴포넌트}</Suspense>,
        "type": "App",
        "id": {App 고유 id},
        "name": {App 이름},
        "appSetup":{
          "Image" : {대표 이미지},
          "minWidth" : {최소 넓이},
          "minHeight" : {최소 높이},
          "setUpWidth" : {넓이 초기값},
          "setUpHeight" : {높이 초기값},
        },
        "visible": {바탕화면에 보일지 안보일지 여부}
}
 */

const useApps = (): TaskType[] => {
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const [taskList, addTask, removeTask] = useProcessManager();

  const { logIn, signUp, emailChack, auth, passwordChange } = getTaskCreators(
    setIsLogIned,
    addTask,
    removeTask,
  );

  const baseApps: TaskType[] = [
    logIn,
    signUp,
    emailChack,
    auth,
    passwordChange,
    {
      component: (
        <Suspense fallback={null}>
          <Terminal />
        </Suspense>
      ),
      type: 'App',
      id: 2210,
      name: '휴지통',
      layer: undefined,
      appSetup: {
        Image: trashBin,
        minWidth: 200,
        minHeight: 150,
        setUpWidth: 300,
        setUpHeight: 400,
      },
      visible: true,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MemorialApproach />
        </Suspense>
      ),
      type: 'App',
      id: 2221,
      name: '추모관',
      layer: undefined,
      appSetup: {
        Image: search,
        minWidth: 45,
        minHeight: 40,
        setUpWidth: 950,
        setUpHeight: 500,
      },
      visible: true,
    },
    {
      component: (
        <Suspense fallback={null}>
          <Search />
        </Suspense>
      ),
      type: 'App',
      id: 2222,
      name: 'Search',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 55,
        minHeight: 35,
        setUpWidth: 800,
        setUpHeight: 360,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MemorialMenu
            stack={[]}
            push={undefined}
            pop={undefined}
            top={undefined}
          />
        </Suspense>
      ),
      type: 'App',
      id: 2223,
      name: 'memorialMenu',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 55,
        minHeight: 35,
        setUpWidth: 55 * 16,
        setUpHeight: 35 * 16,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <Memorial
            stack={[]}
            push={undefined}
            pop={undefined}
            top={undefined}
          />
        </Suspense>
      ),
      type: 'App',
      id: 2224,
      name: 'memorial',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 70,
        minHeight: 55,
        setUpWidth: 890,
        setUpHeight: 577,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MemorailHistory
            stack={[]}
            push={undefined}
            pop={undefined}
            top={undefined}
          />
        </Suspense>
      ),
      type: 'App',
      id: 2225,
      name: 'memorialHistory',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 580,
        minHeight: 420,
        setUpWidth: 890,
        setUpHeight: 577,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MemorialCommit
            stack={[]}
            push={undefined}
            pop={undefined}
            top={undefined}
          />
        </Suspense>
      ),
      type: 'App',
      id: 2226,
      name: 'MemorialCommit',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 580,
        minHeight: 420,
        setUpWidth: 890,
        setUpHeight: 577,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MemorialApply
            stack={[]}
            push={undefined}
            pop={undefined}
            top={undefined}
          />
        </Suspense>
      ),
      type: 'App',
      id: 2227,
      name: 'MemorialApply',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 580,
        minHeight: 420,
        setUpWidth: 890,
        setUpHeight: 577,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MemorialMerge />
        </Suspense>
      ),
      type: 'App',
      id: 2229,
      name: 'MemorialMerge',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 580,
        minHeight: 420,
        setUpWidth: 850,
        setUpHeight: 500,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <Bow />
        </Suspense>
      ),
      type: 'App',
      id: 2230,
      name: 'Bow',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 580,
        minHeight: 420,
        setUpWidth: 850,
        setUpHeight: 500,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <Alert
            icon=""
            text={<></>}
            onClick={() => undefined}
          />
        </Suspense>
      ),
      type: 'App',
      id: 2231,
      name: '경고',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 50,
        minHeight: 25,
        setUpWidth: 690,
        setUpHeight: 250,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <AnimationSelect />
        </Suspense>
      ),
      type: 'App',
      id: 2232,
      name: '애니메이션 선택',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 60,
        minHeight: 55,
        setUpWidth: 60 * 16,
        setUpHeight: 55 * 16,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <Help />
        </Suspense>
      ),
      type: 'App',
      id: 2233,
      name: '도움말',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 60,
        minHeight: 55,
        setUpWidth: 60 * 16,
        setUpHeight: 55 * 16,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MyComputer />
        </Suspense>
      ),
      type: 'App',
      id: 2234,
      name: '내 컴퓨터',
      layer: undefined,
      appSetup: {
        Image: myComputer,
        minWidth: 60,
        minHeight: 55,
        setUpWidth: 800,
        setUpHeight: 562,
      },
      visible: true,
    },
    {
      component: (
        <Suspense fallback={null}>
          <MemorialPreview />
        </Suspense>
      ),
      type: 'App',
      id: 2228,
      name: '미리보기',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 580,
        minHeight: 420,
        setUpWidth: 890,
        setUpHeight: 577,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <TeachingChatBot />
        </Suspense>
      ),
      type: 'App',
      id: 2235,
      name: '챗봇 학습',
      layer: undefined,
      appSetup: {
        Image: setting,
        minWidth: 340,
        minHeight: 500,
        setUpWidth: 800,
        setUpHeight: 562,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <ChatbotSelect />
        </Suspense>
      ),
      type: 'App',
      id: 2236,
      name: '분신사바',
      layer: undefined,
      appSetup: {
        Image: chatbot,
        minWidth: 340,
        minHeight: 500,
        setUpWidth: 800,
        setUpHeight: 562,
      },
      visible: true,
    },
    {
      component: (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      ),
      type: 'App',
      id: 2237,
      name: '분신사바 메인',
      layer: undefined,
      appSetup: {
        Image: setting,
        minWidth: 340,
        minHeight: 500,
        setUpWidth: 800,
        setUpHeight: 600,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <AdminApp />
        </Suspense>
      ),
      type: 'App',
      id: 0,
      name: '어드민',
      layer: undefined,
      appSetup: {
        Image: setting,
        minWidth: 340,
        minHeight: 500,
        setUpWidth: 800,
        setUpHeight: 562,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <GameApp />
        </Suspense>
      ),
      type: 'App',
      id: 2238,
      name: '아케이드',
      layer: undefined,
      appSetup: {
        Image: game,
        minWidth: 340,
        minHeight: 500,
        setUpWidth: 800,
        setUpHeight: 562,
      },
      visible: true,
    },
    {
      component: (
        <Suspense fallback={null}>
          <SulkkagiApproach />
        </Suspense>
      ),
      type: 'App',
      id: 2239,
      name: '설까기',
      layer: undefined,
      appSetup: {
        Image: game,
        minWidth: 750,
        minHeight: 750,
        setUpWidth: 800,
        setUpHeight: 800,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <SulkkagiMenu />
        </Suspense>
      ),
      type: 'App',
      id: 2240,
      name: 'sulkkagiMenu',
      layer: undefined,
      appSetup: {
        Image: game,
        minWidth: 300,
        minHeight: 300,
        setUpWidth: 400,
        setUpHeight: 400,
      },
      visible: false,
    },
    {
      component: (
        <Suspense fallback={null}>
          <Sulkkagi />
        </Suspense>
      ),
      type: 'App',
      id: 2241,
      name: 'sulkkagiMain',
      layer: undefined,
      appSetup: {
        Image: game,
        minWidth: 750,
        minHeight: 750,
        setUpWidth: 800,
        setUpHeight: 800,
      },
      visible: false,
    },
  ];

  return baseApps;
};

export default useApps;
