import { Suspense } from 'react';
import LogIn from '@/applications/utility/login';
import SignUp from '@/applications/utility/signUp';
import EmailChack from '@/applications/utility/emailCheck';
import Auth from '@/applications/utility/auth';
import { TaskType } from '@/modules/typeModule.tsx';
import myComputer from '@/assets/appIcons/my_computer.svg';
import PasswordChange from '@/applications/utility/passwordChange';

type SetIsLogIned = React.Dispatch<React.SetStateAction<string>>;
type AddTask = (task: TaskType) => void;
type RemoveTask = (task: TaskType) => void;

export function getTaskCreators(
  setIsLogIned: SetIsLogIned,
  addTask: AddTask,
  removeTask: RemoveTask,
) {
  let logIn: TaskType,
    signUp: TaskType,
    emailChack: TaskType,
    auth: TaskType,
    passwordChange: TaskType;

  const changeToSignUp = () => {
    addTask(signUp);
    removeTask(logIn);
  };
  const changeToLogIn = () => {
    addTask(logIn);
    removeTask(signUp);
    removeTask(emailChack);
    removeTask(passwordChange);
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
  const changeToPassword = () => {
    addTask(passwordChange);
    removeTask(auth);
  };

  logIn = {
    component: (
      <Suspense fallback={null}>
        <LogIn
          changeToSignUp={changeToSignUp}
          changeToEmailCheck={changeToEmailCheck}
        />
      </Suspense>
    ),
    type: 'App',
    id: 1,
    name: '로그인',
    layer: undefined,
    appSetup: {
      Image: myComputer,
      minWidth: 51,
      minHeight: 33,
      setUpWidth: 800 / 16,
      setUpHeight: 508 / 16,
    },
    visible: false,
  };

  signUp = {
    component: (
      <Suspense fallback={null}>
        <SignUp changeToLogIn={changeToLogIn} />
      </Suspense>
    ),
    type: 'App',
    id: 2,
    name: '회원가입',
    layer: undefined,
    appSetup: {
      Image: 'default',
      minWidth: 51,
      minHeight: 45,
      setUpWidth: 800 / 16,
      setUpHeight: 600 / 16,
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
    name: '이메일 인증',
    layer: undefined,
    appSetup: {
      Image: 'default',
      minWidth: 51,
      minHeight: 33,
      setUpWidth: 800 / 16,
      setUpHeight: 508 / 16,
    },
    visible: false,
  };

  auth = {
    component: (
      <Suspense fallback={null}>
        <Auth
          changeToPassword={changeToPassword}
          changeToEmailCheck={changeToEmailCheck}
        />
      </Suspense>
    ),
    type: 'App',
    id: 4,
    name: '인증코드 입력',
    layer: undefined,
    appSetup: {
      Image: 'default',
      minWidth: 51,
      minHeight: 33,
      setUpWidth: 800 / 16,
      setUpHeight: 508 / 16,
    },
    visible: true,
  };

  passwordChange = {
    component: (
      <Suspense fallback={null}>
        <PasswordChange changeToLogIn={changeToLogIn} />
      </Suspense>
    ),
    type: 'App',
    id: 5,
    name: '비밀번호 재설정',
    layer: undefined,
    appSetup: {
      Image: 'default',
      minWidth: 748,
      minHeight: 464,
      setUpWidth: 748,
      setUpHeight: 464,
    },
    visible: true,
  };

  return { logIn, signUp, emailChack, auth, passwordChange };
}
