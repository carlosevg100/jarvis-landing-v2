import {
  Zap,
  Clock,
  BrainCircuit,
  Smartphone,
  MessageSquare,
  Image,
  Shield,
  Database,
  FileText,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const valueProps: Feature[] = [
  {
    icon: Zap,
    title: "Executa por Você",
    description:
      "Marcar dermato, reservar mesa, confirmar reunião. Você manda. Jarvis resolve. Você recebe a confirmação.",
  },
  {
    icon: Clock,
    title: "Devolve seu Tempo",
    description:
      "São 2-3 horas por semana em tarefas que uma mensagem resolve. Semanas viram dias. Dias viram horas.",
  },
  {
    icon: BrainCircuit,
    title: "Antecipa o que Esquece",
    description:
      "Seu exame vence em 12 dias. A reunião mudou de sala. O boleto vence amanhã. Jarvis sabe antes de você.",
  },
];

export const experienceFeatures: Feature[] = [
  {
    icon: Smartphone,
    title: "Sem App",
    description: "Funciona no WhatsApp que já tá no seu bolso. Zero downloads.",
  },
  {
    icon: MessageSquare,
    title: "Entende Tudo",
    description: "Texto, áudio, foto, PDF, encaminhamento. Manda como quiser.",
  },
  {
    icon: Image,
    title: "Multimodal",
    description: "Lê documentos, interpreta imagens, transcreve áudio. Tudo junto.",
  },
  {
    icon: Shield,
    title: "Seguro",
    description: "Cofre criptografado. Row Level Security. Seus dados são só seus.",
  },
];

export const intelligenceFeatures: Feature[] = [
  {
    icon: Database,
    title: "Memória",
    description:
      "Sabe que você prefere consulta de manhã. Que gosta de japonês no Itaim. Que Helena confirma melhor por ligação.",
  },
  {
    icon: FileText,
    title: "Documentos",
    description:
      "Guarda CPF, RG, convênio, passaporte. Usa automaticamente quando precisa preencher formulário.",
  },
  {
    icon: Lightbulb,
    title: "Contexto",
    description:
      "Sabe que quinta tem reunião às 14h. Não sugere consulta às 14h30. Parece óbvio. Nenhum outro faz.",
  },
];

export const executionCards = [
  { title: "Agendar Consulta", description: "Busca no Doctoralia, filtra por convênio e região, preenche seus dados do cofre e agenda" },
  { title: "Buscar Voos", description: "Milhas + dinheiro em paralelo. Google Flights + seats.aero. Mostra como emitir cada opção" },
  { title: "Ligar por Você", description: "Liga pra SAC, cliente, consultório. Navega URA, conversa, retorna o resultado" },
  { title: "Achar por Perto", description: "Restaurante, farmácia, médico. Filtra por convênio, VR/VA, horário. Link no Waze" },
  { title: "Reservar Mesa", description: "Encontra restaurante, verifica disponibilidade, confirma a reserva" },
  { title: "Cancelar Serviço", description: "Liga pro SAC da operadora, navega a URA e resolve o cancelamento" },
];
