import { useState, useEffect, type ReactNode } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';

// 1. Definição da tipagem que estava faltando
type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  // O "Espião" para ajudar no seu debug
  useEffect(() => {
    console.log('ESTADO ATUALIZADO:', state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}