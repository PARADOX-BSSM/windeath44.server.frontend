import { useSetAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import useApps from '@/applications/data/importManager';
import { useEffect } from 'react';

export const useTaskSearchFunction = () => {
  const setTaskSearchAtom = useSetAtom(taskSearchAtom);

  const Apps = useApps();

  const taskSearch = (i_want_to_find_it: string) => {
    const foundTask = Apps.filter((app) => {
        return app.name === i_want_to_find_it;
    })[0];

    return foundTask;
  };

  useEffect(() => {
    setTaskSearchAtom(() => taskSearch);
  }, []);
};