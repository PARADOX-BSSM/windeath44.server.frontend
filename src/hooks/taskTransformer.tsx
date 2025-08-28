import { useAtomValue, useSetAtom } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { useEffect } from 'react';
import { useProcessManager } from './processManager';
import useApps from '@/applications/data/importManager';

export const useTaskTransformFunction = () => {
  const setTaskTransformerAtom = useSetAtom(taskTransformerAtom);
  const [, addTask, removeTask] = useProcessManager();

  const taskSearch = useAtomValue(taskSearchAtom);

  const Apps = useApps();

  useEffect(() => {
    const ready = Apps.every(
      (app) => app.appSetup && app.appSetup.setUpWidth! > 0 && app.appSetup.setUpHeight! > 0,
    );

    if (!ready) return;

    const taskTransform = (fromTask: string, toTask: string, props?: any) => {
      // const from = Apps.find(app => app.name === fromTask);
      const from = taskSearch?.(fromTask);
      const to = taskSearch?.(toTask, props);

      if (to) addTask(to);
      if (from) removeTask(from);
    };

    setTaskTransformerAtom(() => taskTransform);
  }, [Apps]);
};
