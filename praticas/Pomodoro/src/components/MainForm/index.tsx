import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import type { TaskModel } from '../../models/TaskModel';

import { DefaultInput } from '../DefaultInput';
import { DefaultButton } from '../DefaultButton';

// A palavra 'export' aqui é obrigatória para matar o erro do console!
export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current?.value.trim()) {
      alert('Digite o nome da tarefa');
      return;
    }

    const taskName = taskNameInput.current.value;
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    // 1. Atualiza o estado
    setState((prevState) => ({
      ...prevState,
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining: newTask.duration * 60,
      tasks: [...prevState.tasks, newTask],
    }));

    // 2. Lógica do Worker (Singleton)
    const timerWorkerManager = TimerWorkerManager.getInstance();

    timerWorkerManager.onmessage((event) => {
      console.log('PRINCIPAL (Singleton) recebeu:', event.data);
    });

    timerWorkerManager.postMessage('FAVOR');
    timerWorkerManager.postMessage('FALA_OI');
    timerWorkerManager.postMessage('FECHAR');

    taskNameInput.current.value = '';
  }

  function handleInterruptTask() {
    setState((prevState) => ({
      ...prevState,
      activeTask: null,
      secondsRemaining: 0,
      tasks: prevState.tasks.map((task) =>
        task.id === prevState.activeTask?.id
          ? { ...task, interruptDate: Date.now() }
          : task
      ),
    }));
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form">
      <div className="formRow">
        <DefaultInput
          labelText="Tarefa"
          id="task"
          placeholder="No que você vai focar agora?"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
          />
        ) : (
          <DefaultButton
            title="Interromper tarefa atual"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}