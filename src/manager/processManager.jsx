import {useState} from 'react';

//프로세스 관리 훅
//기본 제공 기능
//- 프로세스 추가
//- 프로세스 삭제
const useProcessManager = () => {
  const [taskList, setTaskList] = useState([]);
  const addTask = (component) => {
    setTaskList(Task => (!Task.includes(component))?
      [...Task, component]:[...Task])
  };
  const removeTask = (component) => {
    setTaskList(Task => (Task.some(item => item.name === component.name)) ?
      Task.filter(item => item.name !== component.name) : [...Task])
  };
  return [taskList, addTask, removeTask];
}

export {useProcessManager};