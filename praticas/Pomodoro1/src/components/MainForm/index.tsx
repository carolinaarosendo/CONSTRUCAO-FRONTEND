import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import type { TaskModel } from '../../models/TaskModel';
import { showMessage } from '../../adapters/showMessage';

import { DefaultInput } from '../DefaultInput';
import { DefaultButton } from '../DefaultButton';

export function MainForm() {
  // Trocamos setState por dispatch
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss(); // Limpa notificações antigas

    const taskName = taskNameInput.current?.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa'); // Toast em vez de alert
      return;
    }

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

    // Agora enviamos uma "ordem" (action) para o Reducer
    dispatch({ 
      type: TaskActionTypes.CREATE_NEW_TASK, 
      payload: newTask 
    });

    showMessage.success('Tarefa iniciada!');
    
    if (taskNameInput.current) {
      taskNameInput.current.value = '';
    }
  }

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida!');
    
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
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