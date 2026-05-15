import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { showMessage } from '../../adapters/showMessage';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  const [sortConfig, setSortConfig] = useState<{
    field: NonNullable<SortTasksOptions['field']>;
    direction: NonNullable<SortTasksOptions['direction']>;
  }>({
    field: 'startDate',
    direction: 'desc',
  });

  const sortedTasks = sortTasks({
    tasks: state.tasks,
    field: sortConfig.field,
    direction: sortConfig.direction,
  });

  // Efeito para setar o título dinâmico da aba
  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  // Efeito de cleanup para sumir com o toast ao mudar de rota
  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks(clickedField: NonNullable<SortTasksOptions['field']>) {
    setSortConfig(prevConfig => {
      const isSameField = prevConfig.field === clickedField;
      const newDirection = isSameField && prevConfig.direction === 'desc' ? 'asc' : 'desc';
      return { field: clickedField, direction: newDirection };
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('Deseja apagar todo o histórico de tarefas?', confirmation => {
      if (confirmation) {
        dispatch({ type: TaskActionTypes.RESET_STATE });
      }
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTasks('name')} className={styles.thSort}>
                    Tarefa {sortConfig.field === 'name' ? (sortConfig.direction === 'desc' ? '▼' : '▲') : '↕'}
                  </th>
                  <th onClick={() => handleSortTasks('duration')} className={styles.thSort}>
                    Duração {sortConfig.field === 'duration' ? (sortConfig.direction === 'desc' ? '▼' : '▲') : '↕'}
                  </th>
                  <th onClick={() => handleSortTasks('startDate')} className={styles.thSort}>
                    Data {sortConfig.field === 'startDate' ? (sortConfig.direction === 'desc' ? '▼' : '▲') : '↕'}
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map(task => {
                  const statusText = getTaskStatus(task, state.activeTask);
                  const taskTypeDictionary = {
                    focus: 'Foco',
                    shortBreak: 'Descanso curto',
                    longBreak: 'Descanso longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td className={statusText === 'Completa' ? styles.statusComplete : ''}>
                        {statusText}
                      </td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.8rem', color: 'var(--text-light)', padding: '4rem 0' }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}