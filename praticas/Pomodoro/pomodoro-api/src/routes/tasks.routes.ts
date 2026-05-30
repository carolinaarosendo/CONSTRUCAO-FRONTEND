import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const tasksRouter = Router();

// Função auxiliar para converter BigInt para Number ou String antes de enviar no JSON
function serializeTask(task: any) {
  return {
    ...task,
    startDate: task.startDate ? Number(task.startDate) : null,
    completeDate: task.completeDate ? Number(task.completeDate) : null,
    interruptDate: task.interruptDate ? Number(task.interruptDate) : null,
  };
}

tasksRouter.get('/', async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { startDate: 'desc' },
    });
    
    // Converte os BigInts de todas as tasks para evitar erro de serialização
    const serializedTasks = tasks.map(serializeTask);
    return res.json(serializedTasks);
  } catch (error) {
    console.error("Erro ao listar tasks:", error);
    return res.status(500).json({ error: "Erro interno ao buscar tarefas." });
  }
});

tasksRouter.post('/', async (req, res) => {
  try {
    const { id, name, duration, type, startDate } = req.body;

    // Validação preventiva dos campos obrigatórios
    if (!id || !name || duration === undefined || !type || !startDate) {
      return res.status(400).json({ 
        error: "Dados incompletos.", 
        message: "Os campos 'id', 'name', 'duration', 'type' e 'startDate' são obrigatórios." 
      });
    }

    const task = await prisma.task.create({
      data: { 
        id, 
        name, 
        duration: Number(duration), 
        type, 
        startDate: BigInt(startDate) 
      },
    });

    return res.status(201).json(serializeTask(task));
  } catch (error) {
    console.error("Erro ao criar task:", error);
    return res.status(500).json({ error: "Erro interno ao criar tarefa no banco." });
  }
});

tasksRouter.patch('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { completeDate } = req.body;

    if (!completeDate) {
      return res.status(400).json({ error: "O campo 'completeDate' é obrigatório." });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { completeDate: BigInt(completeDate) },
    });

    return res.json(serializeTask(task));
  } catch (error: any) {
    console.error("Erro ao concluir task:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }
    return res.status(500).json({ error: "Erro interno ao concluir tarefa." });
  }
});

tasksRouter.patch('/:id/interrupt', async (req, res) => {
  try {
    const { id } = req.params;
    const { interruptDate } = req.body;

    if (!interruptDate) {
      return res.status(400).json({ error: "O campo 'interruptDate' é obrigatório." });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { interruptDate: BigInt(interruptDate) },
    });

    return res.json(serializeTask(task));
  } catch (error: any) {
    console.error("Erro ao interromper task:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }
    return res.status(500).json({ error: "Erro interno ao interromper tarefa." });
  }
});

tasksRouter.delete('/', async (_req, res) => {
  try {
    await prisma.task.deleteMany();
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao limpar histórico:", error);
    return res.status(500).json({ error: "Erro interno ao limpar histórico." });
  }
});