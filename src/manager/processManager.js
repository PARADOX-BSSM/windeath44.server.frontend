class Process{
  _processId = 0;
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}
class ProcessManager {
  _processId = 0;
  constructor() {
    this._taskList = [];
  }
  addTask(name){
    this._taskList.push(new Process(name, this._processId++));
  }
  getTaskList(){
    return this._taskList;
  }
  killTask(id){
    this._taskList.forEach((task) => {
      if(task.id === id)
        delete this._taskList[task.id];
    })
  }
}
export default ProcessManager;