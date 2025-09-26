import { useSetAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import useApps from '@/applications/data/importManager';
import { Suspense, useEffect } from 'react';
import React from 'react';

export const useTaskSearchFunction = () => {
  const setTaskSearchAtom = useSetAtom(taskSearchAtom);

  const Apps = useApps();

  let foundTask = Apps[0];

  const taskSearch = (i_want_to_find_it: string, props?: any) => {
    if (!i_want_to_find_it) return null;

    foundTask = Apps.filter((app) => {
      return app.name === i_want_to_find_it;
    })[0];

    if (!foundTask) return null;

    // console.log('taskSearch found task:', i_want_to_find_it, foundTask.appSetup);

    const original = foundTask.component;
    const internal = original.props.children as React.ReactElement;
    const type = internal.type;

    // 기존 props를 유지하고 새로운 props를 병합
    const existingProps = internal.props || {};

    foundTask.component = (
      <Suspense fallback={null}>
        {React.createElement(type, {
          ...existingProps,
          ...(props ?? {}),
          __key: Math.random(),
        })}
      </Suspense>
    );

    return foundTask;
  };

  useEffect(() => {
    setTaskSearchAtom(() => taskSearch);
  }, []);
};
