export type StackSnapshot = {
  name: string;
  id?: number;
  type?: string;
  props?: any;
};

type TaskType = {
  component: JSX.Element;
  type: string;
  id: number | undefined;
  instanceId?: string;
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
  stackSnapshot?: StackSnapshot;
};

export type PositionType = {
  x: number;
  y: number;
};
export type SizeType = {
  width: number;
  height: number;
};

export interface ApplicationProps {
  children?: React.ReactNode;
  taskConfig: TaskConfig;
  name?: string;
}

export interface StyleContainerProps {
  windowType?: 'framed' | 'frameless';
}

export interface Task {
  pid: string;
  name: string;
  component: React.FC;
  taskConfig: TaskConfig;
}

export interface TaskConfig {
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  windowType?: 'framed' | 'frameless';
  isFull: 'width' | 'height' | 'all' | 'none';
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (pid: string) => void;
}

const toNumber = (to: string | any) => to as any as number;

export type { TaskType };
export { toNumber };
