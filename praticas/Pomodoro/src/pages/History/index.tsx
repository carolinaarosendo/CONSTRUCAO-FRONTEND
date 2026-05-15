import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'; // Mantendo seu hook correto
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions'; // Mantendo seu arquivo corrigido
import { showMessage } from '../../adapters/showMessage';
import { useState } from 'react';
import styles from './styles.module.css';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  // Estado local simplificado para controlar apenas os critérios da ordenação (campo e direção)
  const [sortConfig, setSortConfig] = useState<{
    field: NonNullable<SortTasksOptions['field']>;
    direction: NonNullable<SortTasksOptions['direction']>;
  }>({
    field: 'startDate',
    direction: 'desc',
  });

  // Calcula a lista ordenada de forma dinâmica a cada renderização (reage na hora ao dispatch de reset!)
  const sortedTasks = sortTasks({
    tasks: state.tasks,
    field: sortConfig.field,
    direction: sortConfig.direction,
  });

  // --- O useEffect PROVADOR DE ERROS FOI COMPLETAMENTE REMOVIDO DAQUI ---

  function handleSortTasks(clickedField: NonNullable<SortTasksOptions['field']>) {
    setSortConfig(prevConfig => {
      const isSameField = prevConfig.field === clickedField;
      const newDirection = isSameField && prevConfig.direction === 'desc' ? 'asc' : 'desc';
      return { field: clickedField, direction: newDirection };
    });
  }

  function handleResetHistory() {
    showMessage.dismiss(); 
    
    // Passamos a ação diretamente no callback do Toastify. Sem estados intermediários!
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

                  // Dicionário corrigido com seus tipos reais
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
          <p style={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            fontSize: '1.8rem', 
            color: 'var(--text-light)', 
            padding: '4rem 0'
          }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}