import { useSetAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import useApps from '@/applications/data/importManager';
import { Suspense, useEffect } from 'react';
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
      const original = foundTask.component;
      const internal = original.props.children as React.ReactElement;
      const type = internal.type;

      console.log(type);

      foundTask.component = (
        <Suspense fallback={null}>
          {React.createElement(type, { stack, push, pop, top })}
        </Suspense>
      );
    }

    return foundTask;
  };

  useEffect(() => {
    setTaskSearchAtom(() => taskSearch);
  }, []);
};