import { useSetAtom } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useEffect } from 'react';
import { useProcessManager } from './processManager';
import useApps from '@/applications/data/importManager';

export const useTaskTransformFunction = () => {
  const setTaskTransformerAtom = useSetAtom(taskTransformerAtom);
  const [, addTask, removeTask] = useProcessManager();

  const Apps = useApps();

  const taskTransform = (fromTask: string, toTask: string) => {
    const from = Apps.filter((app) => {
        return app.name === fromTask;
    })[0];
    console.log(from);
    const to = Apps.filter((app) => {
        return app.name === toTask;
    })[0];

    console.log(to);
    
    if (to) {
        addTask(to);
    }
    if (from) {
        removeTask(from);
    }
  };

  useEffect(() => {
    setTaskTransformerAtom(() => taskTransform);
  }, []);
};