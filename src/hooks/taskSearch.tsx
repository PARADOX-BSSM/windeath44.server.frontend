import { useSetAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import useApps from '@/applications/data/importManager';
import { Suspense, useEffect } from 'react';
import React from 'react';
import { StackSnapshot } from '@/modules/typeModule';

const sanitizePropsForStorage = (props: any) => {
  const visited = new WeakSet();

  const walk = (value: any): any => {
    if (value === null) return null;
    const valueType = typeof value;

    if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
      return value;
    }

    if (value instanceof Date) return value.toISOString();

    if (Array.isArray(value)) {
      const next = value
        .map((item) => walk(item))
        .filter((item) => item !== undefined);
      return next.length > 0 ? next : [];
    }

    if (valueType === 'object') {
      if (visited.has(value)) return undefined;
      visited.add(value);

      const next: Record<string, any> = {};
      Object.entries(value).forEach(([key, val]) => {
        if (key === 'stack' || key === 'push' || key === 'pop' || key === 'top') return;

        const sanitized = walk(val);
        if (sanitized !== undefined) next[key] = sanitized;
      });

      return Object.keys(next).length > 0 ? next : undefined;
    }

    return undefined;
  };

  return walk(props);
};

export const useTaskSearchFunction = () => {
  const setTaskSearchAtom = useSetAtom(taskSearchAtom);

  const Apps = useApps();

  const taskSearch = (i_want_to_find_it: string, props?: any) => {
    if (!i_want_to_find_it) return null;

    const foundTask = Apps.find((app) => app.name === i_want_to_find_it);

    if (!foundTask) return null;

    const original = foundTask.component;
    const internal = original.props.children as React.ReactElement;
    const type = internal.type;

    // 기존 props를 유지하고 새로운 props를 병합
    const existingProps = internal.props || {};

    const newTask = {
      ...foundTask,
      stackSnapshot: {
        name: foundTask.name,
        id: foundTask.id,
        type: foundTask.type,
        props: sanitizePropsForStorage(props),
      } as StackSnapshot,
      instanceId: `${foundTask.name}-${Date.now()}-${Math.random()}`,
      component: (
        <Suspense fallback={null}>
          {React.createElement(type, {
            ...existingProps,
            ...(props ?? {}),
            __key: Math.random(),
          })}
        </Suspense>
      ),
    };

    return newTask;
  };

  useEffect(() => {
    setTaskSearchAtom(() => taskSearch);
  }, []);
};
