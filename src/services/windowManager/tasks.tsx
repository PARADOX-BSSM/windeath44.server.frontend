import { Suspense } from 'react';
import LogIn from '@/applications/utility/login';
import SignUp from '@/applications/utility/signUp';
import EmailChack from 'applications/utility/emailCheck';
import Auth from '@/applications/utility/auth';
import { TaskType } from '../../modules/typeModule.tsx';

export const createLogInTask = (setIsLogIned: any, changeToSignUp: any, changeToEmailCheck: any): TaskType => ({
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
});

export const createSignUpTask = (changeToLogIn: any): TaskType => ({
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
});

export const createEmailChackTask = (changeToLogIn: any, changeToAuth: any): TaskType => ({
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
});

export const createAuthTask = (changeToLogIn: any, changeToEmailCheck: any): TaskType => ({
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
});