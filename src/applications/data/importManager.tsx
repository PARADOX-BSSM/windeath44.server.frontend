import { Suspense, lazy } from 'react';
import { TaskType } from '@/modules/typeModule.tsx';
import Search from '@/applications/applicationList/search';
import MemorialMenu from '@/applications/applicationList/memorialMenu/index.tsx';
import Memorial from '@/applications/applicationList/memorial/index.tsx';
import Bow from '@/applications/applicationList/bow';
import { useAtom } from 'jotai';
import { isLogInedAtom } from '@/atoms/windowManager.ts';
import { useProcessManager } from '@/hooks/processManager.tsx';
import { getTaskCreators } from '@/services/windowManager/tasks.tsx';
import MemorialApply from '@/applications/applicationList/memorialApply/index.tsx';
import Alert from '@/applications/applicationList/alert/index.tsx';
import { getPixelFromPercent } from '@/lib/getPixelFromPercent.tsx';
import MemorialApproach from '@/applications/applicationList/settings/index.tsx';
import myComputer from '@/assets/appIcons/my_computer.svg';

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
const MemorialMerge = lazy(() => import('@/applications/applicationList/memorialMerge/index.tsx'));

import memorialApproach from '@/assets/appIcons/search.svg';
import trashBin from '@/assets/appIcons/empty_bin.svg';
import AnimationSelect from '@/applications/applicationList/animationSelect/index.tsx';
import MyComputer from '../applicationList/myComputer';
import Help from '@/applications/applicationList/help';
import PasswordChange from '../utility/passwordChange';

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

  const { logIn, signUp, emailChack, auth, passwordChange } = getTaskCreators(setIsLogIned, addTask, removeTask);

  const baseApps: TaskType[] = [
    logIn,
    signUp,
    emailChack,
    auth,
    passwordChange,
    {
      component: <Suspense fallback={null}><Terminal /></Suspense>,
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
      component: <Suspense fallback={null}><MemorialApproach /></Suspense>,
      type: 'App',
      id: 2221,
      name: '추모관',
      layer: undefined,
      appSetup: {
        Image: memorialApproach,
        minWidth: 45,
        minHeight: 40,
        setUpWidth: 950,
        setUpHeight: 500,
      },
      visible: true,
    },
    {
      component: <Suspense fallback={null}><Search /></Suspense>,
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
      component: <Suspense fallback={null}><MemorialMenu stack={[]} push={undefined} pop={undefined} top={undefined} /></Suspense>,
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
      component: <Suspense fallback={null}><Memorial stack={[]} push={undefined} pop={undefined} top={undefined} /></Suspense>,
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
      component: <Suspense fallback={null}><MemorailHistory stack={[]} push={undefined} pop={undefined} top={undefined} /></Suspense>,
      type: 'App',
      id: 2225,
      name: 'memorailHistory',
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
      component: <Suspense fallback={null}><MemorialCommit stack={[]} push={undefined} pop={undefined} top={undefined} /></Suspense>,
      type: 'App',
      id: 2226,
      name: 'MemorialCommit',
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
      component: <Suspense fallback={null}><MemorialApply stack={[]} push={undefined} pop={undefined} top={undefined} /></Suspense>,
      type: 'App',
      id: 2227,
      name: 'MemorialApply',
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
      component: <Suspense fallback={null}><MemorialMerge /></Suspense>,
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
      component: <Suspense fallback={null}><Bow /></Suspense>,
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
      component: <Suspense fallback={null}><Alert icon="" text={<></>} onClick={() => undefined} /></Suspense>,
      type: 'App',
      id: 2231,
      name: '경고',
      layer: undefined,
      appSetup: {
        Image: 'default',
        minWidth: 50,
        minHeight: 25,
        setUpWidth: 50 * 16,
        setUpHeight: 25 * 16,
      },
      visible: false,
    },
    {
      component: <Suspense fallback={null}><AnimationSelect /></Suspense>,
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
      component: <Suspense fallback={null}><Help /></Suspense>,
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
      component: <Suspense fallback={null}><MyComputer /></Suspense>,
      type: 'App',
      id: 2233,
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
      component: <Suspense fallback={null}><MemorialPreview /></Suspense>,
      type: 'App',
      id: 2228,
      name: '미리보기',
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
  ];

  return baseApps;
};

export default useApps;
