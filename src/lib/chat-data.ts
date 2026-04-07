export type ChatMsg = {
  sender: "user" | "jarvis";
  text: string;
  delay?: number;
};

export const heroChat: ChatMsg[] = [
  { sender: "user", text: "Encontre um dermato no Itaim que aceite SulAmérica" },
  {
    sender: "jarvis",
    text: "Encontrei 3 opções:\n\n1. Dra. Marina Lopes ★4.9\n   R. Joaquim Floriano, 413\n\n2. Dr. Felipe Rocha ★4.8\n   R. Leopoldo Couto, 1050\n\n3. Dra. Ana Beatriz ★4.7\n   Av. Faria Lima, 2277",
    delay: 1200,
  },
  { sender: "user", text: "/faz agendar com a número 1", delay: 800 },
  {
    sender: "jarvis",
    text: "Acessando Doctoralia...\nVerificando horários...",
    delay: 1000,
  },
  {
    sender: "jarvis",
    text: "Agendado ✓\n\nDra. Marina Lopes\nSex, 11/04 às 10h\nR. Joaquim Floriano, 413\n\nUsei CPF e convênio do cofre.",
    delay: 1500,
  },
];

export const flowChat: ChatMsg[] = [
  { sender: "user", text: "Encontre um dermato no Itaim que aceite SulAmérica" },
  {
    sender: "jarvis",
    text: "Encontrei 3 opções com nota acima de 4.5:\n\n1. Dra. Marina Lopes ★4.9 — R. Joaquim Floriano, 413\n2. Dr. Felipe Rocha ★4.8 — R. Leopoldo Couto, 1050\n3. Dra. Ana Beatriz ★4.7 — Av. Faria Lima, 2277",
  },
  { sender: "user", text: "/faz agendar com a número 1" },
  { sender: "jarvis", text: "Acessando Doctoralia... Verificando horários..." },
  {
    sender: "jarvis",
    text: "Agendado ✓\n\nDra. Marina Lopes\nSexta, 11/04 às 10h\nR. Joaquim Floriano, 413 — Itaim Bibi\n\nUsei CPF e convênio SulAmérica do cofre.",
  },
];
