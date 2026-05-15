import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'; // Hook ajustado para seu projeto
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useState } from 'react';
import styles from './styles.module.css';

export function History() {
  const { state } = useTaskContext();
  
  // Guardamos apenas os critérios de ordenação no estado local
  const [sortConfig, setSortConfig] = useState<{
    field: NonNullable<SortTasksOptions['field']>;
    direction: NonNullable<SortTasksOptions['direction']>;
  }>({
    field: 'startDate',
    direction: 'desc',
  });

  // Toda vez que o componente renderizar, ele calcula a lista ordenada com base nas tasks reais do contexto
  const sortedTasks = sortTasks({
    tasks: state.tasks,
    field: sortConfig.field,
    direction: sortConfig.direction,
  });

  function handleSortTasks(clickedField: NonNullable<SortTasksOptions['field']>) {
    setSortConfig(prevConfig => {
      // Se clicou na mesma coluna, inverte a direção. Se clicou em outra, começa com 'desc'.
      const isSameField = prevConfig.field === clickedField;
      const newDirection = isSameField && prevConfig.direction === 'desc' ? 'asc' : 'desc';
      
      return {
        field: clickedField,
        direction: newDirection,
      };
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTasks('name')}
                  className={styles.thSort}
                >
                  Tarefa {sortConfig.field === 'name' ? (sortConfig.direction === 'desc' ? '▼' : '▲') : '↕'}
                </th>
                <th
                  onClick={() => handleSortTasks('duration')}
                  className={styles.thSort}
                >
                  Duração {sortConfig.field === 'duration' ? (sortConfig.direction === 'desc' ? '▼' : '▲') : '↕'}
                </th>
                <th
                  onClick={() => handleSortTasks('startDate')}
                  className={styles.thSort}
                >
                  Data {sortConfig.field === 'startDate' ? (sortConfig.direction === 'desc' ? '▼' : '▲') : '↕'}
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortedTasks.map(task => {
                const statusText = getTaskStatus(task, state.activeTask);

                // Mantendo o seu dicionário perfeitamente alinhado com o seu tipo de modelo real
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
      </Container>
    </MainTemplate>
  );
}