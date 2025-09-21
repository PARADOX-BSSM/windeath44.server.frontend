import React from 'react';

type TaskType = {
  component: JSX.Element;
  type: string;
  id: number | undefined;
  layer: number | undefined;
  name: string;
  appSetup:
    | {
        Image: string | undefined;
        minWidth: number | undefined;
        minHeight: number | undefined;
        setUpWidth: number | undefined;
        setUpHeight: number | undefined;
      }
    | undefined;
  visible: boolean | undefined;
};

const toNumber = (to: string | any) => to as any as number;
export interface stackProps {
  stack: string[];
  push: (value: string) => void;
  pop: () => void;
  top: string;
}

export interface contentProps {
  characterId: string;
  content: string;
}

export interface inputProps {
  stackProps: stackProps;
  name: string;
  deathReason: string;
  date: string;
  lifeCycle: number;
  anime: string;
  animeId: number;
  age: number;
  profileImage: string;
}
export type { TaskType };
export { toNumber };
