import { Suspense } from 'react';
import LogIn from '@/applications/utility/login';
import SignUp from '@/applications/utility/signUp';
import EmailChack from 'applications/utility/emailCheck';
import Auth from '@/applications/utility/auth';
import { TaskType } from '../../modules/typeModule.tsx';

type SetIsLogIned = React.Dispatch<React.SetStateAction<string>>;
type AddTask = (task: TaskType) => void;
type RemoveTask = (task: TaskType) => void;

export function getTaskCreators(
  setIsLogIned: SetIsLogIned,
  addTask: AddTask,
  removeTask: RemoveTask
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
    component: <Suspense fallback={null}><LogIn setIsLogIned={setIsLogIned} changeToSignUp={changeToSignUp} changeToEmailCheck={changeToEmailCheck} /></Suspense>,
    type: "App",
    id: 1,
    name: "LogIn",
    layer: undefined,
    appSetup: {
      Image: "default",
      minWidth: 748,
      minHeight: 464,
      setUpWidth: 748,
      setUpHeight: 464
    }
  };

  signUp = {
    component: <Suspense fallback={null}><SignUp changeToLogIn={changeToLogIn} /></Suspense>,
    type: "App",
    id: 2,
    name: "SignUp",
    layer: undefined,
    appSetup: {
      Image: "default",
      minWidth: 748,
      minHeight: 550,
      setUpWidth: 748,
      setUpHeight: 550
    }
  };

  emailChack = {
    component: <Suspense fallback={null}><EmailChack changeToLogIn={changeToLogIn} changeToAuth={changeToAuth} /></Suspense>,
    type: "App",
    id: 3,
    name: "EmailChack",
    layer: undefined,
    appSetup: {
      Image: "default",
      minWidth: 748,
      minHeight: 464,
      setUpWidth: 748,
      setUpHeight: 464
    }
  };

  auth = {
    component: <Suspense fallback={null}><Auth changeToLogIn={changeToLogIn} changeToEmailCheck={changeToEmailCheck} /></Suspense>,
    type: "App",
    id: 4,
    name: "auth",
    layer: undefined,
    appSetup: {
      Image: "default",
      minWidth: 748,
      minHeight: 464,
      setUpWidth: 748,
      setUpHeight: 464
    }
  };

  return { logIn, signUp, emailChack, auth };
}