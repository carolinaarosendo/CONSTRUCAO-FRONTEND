import gravitationalBeep from '../assets/audios/gravitational_beep.mp3';

/**
 * Prepara o áudio e retorna a função de tocar (play).
 * O load() e o play() inicial ajudam a destravar o Safari.
 */
export function loadBeep() {
  const audio = new Audio(gravitationalBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch(error => console.log('Erro ao tocar áudio', error));
  };
}