import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { RouterLink } from '../../components/RouterLink'; // 1. Importar o wrapper
import { MainTemplate } from '../../templates/MainTemplate';

export function AboutPomodoro() {
  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>A Técnica Pomodoro 🍅</Heading>

          <p>
            A Técnica Pomodoro é uma metodologia de produtividade criada por{' '}
            <strong>Francesco Cirillo</strong>, que consiste em dividir o
            trabalho em blocos de tempo intercalados com pausas.
          </p>

          <img
            src='https://placehold.co/1920x1080'
            alt='Exemplo'
          />

          <h2>Como funciona o Pomodoro tradicional?</h2>
          <ul>
            <li>
              <strong>1. Defina uma tarefa</strong> que você deseja realizar.
            </li>
            <li>
              <strong>2. Trabalhe nela por 25 minutos</strong> sem interrupções.
            </li>
            <li>
              <strong>3. Faça uma pausa curta de 5 minutos</strong>.
            </li>
            <li>
              <strong>4. A cada 4 ciclos, faça uma pausa longa</strong> (15 a 30
              minutos).
            </li>
          </ul>

          <h2>
            Mas no <strong>Chronos Pomodoro</strong> tem um diferencial 🚀
          </h2>
          <p>
            Nosso app segue o conceito original, mas com algumas melhorias e
            personalizações pra deixar o processo ainda mais eficiente.
          </p>

          {/* 2. Adicionando os links internos conforme a tarefa da aula */}
          <p>
            Você pode configurar o tempo de foco e pausas do seu jeito! 
            Basta acessar a <RouterLink href='/settings/'>página de configurações</RouterLink>.
          </p>

          <p>
            Todas as suas tarefas concluídas ficam salvas no{' '}
            <RouterLink href='/history/'>histórico</RouterLink>.
          </p>

          <p>
            <strong>Pronto pra focar?</strong> Bora lá{' '}
            <RouterLink href='/home'>voltar para a página inicial</RouterLink> e
            iniciar seus Pomodoros! 🍅🚀
          </p>

        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}