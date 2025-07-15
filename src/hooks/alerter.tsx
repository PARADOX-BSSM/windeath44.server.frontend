import { useSetAtom } from 'jotai';
import useApps from '@/applications/data/importManager';
import { Suspense, useEffect } from 'react';
import React from 'react';
import { alerterAtom } from '@/atoms/alerter';
import { useProcessManager } from './processManager';
import { getPixelFromPercent } from '@/lib/getPixelFromPercent';

export const useAlerter = () => {
  const setAlerterAtom = useSetAtom(alerterAtom);

  const Apps = useApps();

  const [, addTask] = useProcessManager();

  let foundTask = Apps.filter((app) => {
    return app.name === '경고';
  })[0];

  const setAlert = (icon: string, text: string, onClick: () => void) => {
    if (icon && text) {
      const original = foundTask.component;
      const internal = original.props.children as React.ReactElement;
      const type = internal.type;

      foundTask.component = (
        <Suspense fallback={null}>{React.createElement(type, { icon, text, onClick })}</Suspense>
      );

      addTask(foundTask);
    }
  };

  useEffect(() => {
    setAlerterAtom(() => setAlert);
  }, []);
};
