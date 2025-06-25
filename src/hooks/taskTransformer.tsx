import { useSetAtom } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useEffect } from 'react';
import { useProcessManager } from './processManager';
import useApps from '@/applications/data/importManager';

export const useLoginFunction = (fromTask: string, toTask: string) => {
  const setTaskTransformerAtom = useSetAtom(taskTransformerAtom);
  const [, addTask, removeTask] = useProcessManager();

  const Apps = useApps();

  const from = Apps.filter((app) => {
    return app.name === fromTask;
  })[0];
  const to = Apps.filter((app) => {
    return app.name === toTask;
  })[0];

  const changeToSignUp = () => {
    addTask(to);
    removeTask(from);
  };

  useEffect(() => {
    setTaskTransformerAtom(() => changeToSignUp);
  }, []);
};