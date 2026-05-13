import { Bounce, ToastContainer } from 'react-toastify';
import type { ReactNode } from 'react';

export function MessagesContainer({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={3000} // 3 segundos é o ideal para não irritar
        transition={Bounce}
        theme='light'
      />
    </>
  );
}