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
      console.log('[taskTransform] fromTask:', fromTask, 'toTask:', toTask);
      // const from = Apps.find(app => app.name === fromTask);
      const from = taskSearch?.(fromTask);
      const to = taskSearch?.(toTask, props);
      console.log('[taskTransform] from:', from);
      console.log('[taskTransform] to:', to);

      if (to) {
        console.log('[taskTransform] Adding task:', to.name);
        addTask(to);
      }
      if (from) {
        console.log('[taskTransform] Removing task:', from.name);
        removeTask(from);
      }
    };

    setTaskTransformerAtom(() => taskTransform);
  }, [Apps]);
};
