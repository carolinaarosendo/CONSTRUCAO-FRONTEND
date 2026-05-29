import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const showMessage = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  warning: (msg: string) => toast.warning(msg),
  info: (msg: string) => toast.info(msg),
  dismiss: () => toast.dismiss(),
  
  // Novo método para abrir o modal customizado de confirmação
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data,
      onClose: confirmation => {
        // Se a razão de fechamento for true (clicou em sim), executa o callback como true
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
      autoClose: false,      // Não fecha sozinho por tempo
      closeOnClick: false,   // Não fecha clicando fora/no corpo do toast
      closeButton: false,    // Remove o botãozinho "X" padrão do toast
      draggable: false,      // Impede arrastar para fechar
    }),
};