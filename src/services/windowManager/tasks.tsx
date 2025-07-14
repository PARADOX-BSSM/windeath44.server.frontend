import { Suspense } from 'react';
import LogIn from '@/applications/utility/login';
import SignUp from '@/applications/utility/signUp';
import EmailChack from 'applications/utility/emailCheck';
import Auth from '@/applications/utility/auth';
import { TaskType } from '@/modules/typeModule.tsx';
import myComputer from '@/assets/appIcons/my_computer.svg';
import { getPixelFromPercent } from '@/lib/getPixelFromPercent';

type SetIsLogIned = React.Dispatch<React.SetStateAction<boolean>>;
type AddTask = (task: TaskType) => void;
type RemoveTask = (task: TaskType) => void;

export function getTaskCreators(
  setIsLogIned: SetIsLogIned,
  addTask: AddTask,
  removeTask: RemoveTask,
) {
  let logIn: TaskType, signUp: TaskType, emailChack: TaskType, auth: TaskType;

  const changeToSignUp = () => {
    addTask(signUp);
    removeTask(logIn);
  };
  const changeToLogIn = () => {
    addTask(logIn);
    removeTask(signUp);
    removeTask(emailChack);
    removeTask(auth);
  };
  const changeToEmailCheck = () => {
    addTask(emailChack);
    removeTask(logIn);
    removeTask(auth);
  };
  const changeToAuth = () => {
    addTask(auth);
    removeTask(emailChack);
  };

  logIn = {
    component: (
      <Suspense fallback={null}>
        <LogIn
          setIsLogIned={setIsLogIned}
          changeToSignUp={changeToSignUp}
          changeToEmailCheck={changeToEmailCheck}
        />
      </Suspense>
    ),
    type: 'App',
    id: 1,
    name: '내 컴퓨터',
    layer: undefined,
    appSetup: {
      Image: myComputer,
      minWidth: getPixelFromPercent('width', 60),
      minHeight: getPixelFromPercent('height', 50),
      setUpWidth: getPixelFromPercent('width', 60),
      setUpHeight: getPixelFromPercent('height', 50),
    },
    visible: true,
  };

  signUp = {
    component: (
      <Suspense fallback={null}>
        <SignUp changeToLogIn={changeToLogIn} />
      </Suspense>
    ),
    type: 'App',
    id: 2,
    name: 'SignUp',
    layer: undefined,
    appSetup: {
      Image: 'default',
      minWidth: getPixelFromPercent('width', 60),
      minHeight: getPixelFromPercent('height', 63),
      setUpWidth: getPixelFromPercent('width', 60),
      setUpHeight: getPixelFromPercent('height', 63),
    },
    visible: false,
  };

  emailChack = {
    component: (
      <Suspense fallback={null}>
        <EmailChack
          changeToLogIn={changeToLogIn}
          changeToAuth={changeToAuth}
        />
      </Suspense>
    ),
    type: 'App',
    id: 3,
    name: 'EmailChack',
    layer: undefined,
    appSetup: {
      Image: 'default',
      minWidth: getPixelFromPercent('width', 60),
      minHeight: getPixelFromPercent('height', 50),
      setUpWidth: getPixelFromPercent('width', 60),
      setUpHeight: getPixelFromPercent('height', 50),
    },
    visible: false,
  };

  auth = {
    component: (
      <Suspense fallback={null}>
        <Auth
          changeToLogIn={changeToLogIn}
          changeToEmailCheck={changeToEmailCheck}
        />
      </Suspense>
    ),
    type: 'App',
    id: 4,
    name: 'auth',
    layer: undefined,
    appSetup: {
      Image: 'default',
      minWidth: getPixelFromPercent('width', 60),
      minHeight: getPixelFromPercent('height', 50),
      setUpWidth: getPixelFromPercent('width', 60),
      setUpHeight: getPixelFromPercent('height', 50),
    },
    visible: false,
  };

  return { logIn, signUp, emailChack, auth };
}
