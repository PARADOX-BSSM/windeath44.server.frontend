import { useSetAtom } from 'jotai';
import useApps from '@/applications/data/importManager';
import { Suspense, useEffect } from 'react';
import React from 'react';
import { alerterAtom } from '@/atoms/alerter';
import { useProcessManager } from './processManager';
import { getPixelFromPercent } from '@/services/kernel';

export const useAlerter = () => {
  const setAlerterAtom = useSetAtom(alerterAtom);

  const Apps = useApps();

  const [, addTask, ] = useProcessManager();

  let foundTask = Apps.filter((app) => {
        return app.name === "Alert";
    })[0];

  const setAlert = (icon: string, text: string, onClick: () => void) => {
    if (icon && text) {
      const original = foundTask.component;
      const internal = original.props.children as React.ReactElement;
      const type = internal.type;

      foundTask.component = (
        <Suspense fallback={null}>
          {React.createElement(type, { icon, text, onClick })}
        </Suspense>
      );

      foundTask.appSetup = {
        Image: "default",
        minWidth: getPixelFromPercent("width", 60),
        minHeight: getPixelFromPercent("height", 30),
        setUpWidth: getPixelFromPercent("width", 60),
        setUpHeight: getPixelFromPercent("height", 30),
      };

      addTask(foundTask);
    }
  };

  useEffect(() => {
    setAlerterAtom(() => setAlert);
  }, []);
};