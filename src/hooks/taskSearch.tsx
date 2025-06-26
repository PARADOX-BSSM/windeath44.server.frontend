import { useSetAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import useApps from '@/applications/data/importManager';
import { useEffect } from 'react';
import React from 'react';

export const useTaskSearchFunction = () => {
  const setTaskSearchAtom = useSetAtom(taskSearchAtom);

  const Apps = useApps();

  let foundTask = Apps[0];

  const taskSearch = (i_want_to_find_it: string, stack?: any, Push?: any, Pop?: any, Top?: any) => {
    foundTask = Apps.filter((app) => {
        return app.name === i_want_to_find_it;
    })[0];

    console.log(stack, Push, Pop, Top);

    if (stack && Push && Pop && Top) {
      const elementWithProps = React.cloneElement(
        foundTask.component,
        {
          stack,
          Push,
          Pop,
          Top,
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