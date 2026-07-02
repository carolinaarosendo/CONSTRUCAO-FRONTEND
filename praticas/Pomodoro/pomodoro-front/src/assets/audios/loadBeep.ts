// Sobe as pastas necessárias para alcançar a sua pasta de áudios
import gravitationalBeepUrl from './gravitational_beep.mp3'; // Importa o áudio usando a URL resolvida pelo Vite

export function loadBeep() {
  // Passa a URL resolvida pelo compilador do Vite
  const audio = new Audio(gravitationalBeepUrl); 
  
  return () => {
    audio.play().catch(err => console.log("Erro ao reproduzir áudio:", err));
  };
}