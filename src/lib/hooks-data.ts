export const rotatingHooks = [
  // /faz — execution
  {
    faz: "/faz marcar dermato.",
    context: "Agendado em 47 segundos.",
  },
  // assistant — memory
  {
    faz: "Qual o CPF da minha esposa?",
    context: "Já tá no cofre. Enviado.",
    isFaz: false,
  },
  // /faz — execution
  {
    faz: "/faz buscar voo SP-Miami.",
    context: "Milhas + dinheiro. 12 opções em 30s.",
  },
  // assistant — financial
  {
    faz: "Quanto gastei esse mês?",
    context: "R$4.230. Resumo por categoria enviado.",
    isFaz: false,
  },
  // /faz — execution
  {
    faz: "/faz ligar pro Ricardo.",
    context: "Ligou, conversou, te retornou.",
  },
  // assistant — nearby
  {
    faz: "Farmácia aberta perto de mim?",
    context: "3 opções. Link no Waze.",
    isFaz: false,
  },
  // /faz — execution
  {
    faz: "/faz cancelar Claro.",
    context: "Ligou pro SAC, navegou a URA, cancelou.",
  },
  // assistant — memory
  {
    faz: "Quando é a próxima consulta da Aurora?",
    context: "Pediatra. Terça, 14h. Dra. Fernanda.",
    isFaz: false,
  },
];
