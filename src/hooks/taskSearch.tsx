import { useSetAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import useApps from '@/applications/data/importManager';
import { useEffect } from 'react';
import React from 'react';

export const useTaskSearchFunction = () => {
  const setTaskSearchAtom = useSetAtom(taskSearchAtom);

  const Apps = useApps();

  let foundTask = Apps[0];

  const taskSearch = (i_want_to_find_it: string, stack?: any, push?: any, pop?: any, top?: any) => {
    foundTask = Apps.filter((app) => {
        return app.name === i_want_to_find_it;
    })[0];

    console.log(i_want_to_find_it);
    console.log(stack, push, pop, top);

    if (stack && push && pop && top) {
      const elementWithProps = React.cloneElement(
        foundTask.component,
        {
          stack,
          push,
          pop,
          top,
        }
      );
      
      foundTask.component = elementWithProps;
    }

    return foundTask;
  };

  useEffect(() => {
    setTaskSearchAtom(() => taskSearch);
  }, []);
};