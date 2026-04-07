import Link from "next/link";

export const metadata = {
  title: "Termos de Uso — Jarvis",
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1714]">
      <div className="max-w-[720px] mx-auto px-6 py-10">
        <Link
          href="/"
          className="inline-block mb-6 font-outfit text-[13px] text-[var(--accent-highlight)] hover:underline"
        >
          &larr; Voltar ao Jarvis
        </Link>

        <h1 className="font-outfit font-medium text-[36px] mb-2">Termos de Uso</h1>
        <p className="font-outfit text-[12px] text-[rgba(26,23,20,0.4)] mb-8">
          Ultima atualizacao: 12 de marco de 2026
        </p>

        <div className="prose-jarvis">
          <h2>1. Aceitacao dos Termos</h2>
          <p>
            Ao utilizar o Jarvis (&quot;Servico&quot;), operado pela OLpi Technologies
            (&quot;nos&quot;), voce concorda com estes Termos de Uso. Se nao concordar, nao
            utilize o Servico.
          </p>

          <h2>2. Descricao do Servico</h2>
          <p>
            O Jarvis e um assistente pessoal via WhatsApp que organiza compromissos, tarefas e
            lembretes a partir de mensagens encaminhadas pelo usuario. O Servico inclui:
          </p>
          <ul>
            <li>Processamento de mensagens de texto, audio, imagem e PDF</li>
            <li>Extracao e organizacao de compromissos</li>
            <li>Envio de lembretes via WhatsApp</li>
            <li>Dashboard web para visualizacao</li>
          </ul>

          <h2>3. Cadastro e Conta</h2>
          <p>
            Para utilizar o Servico, voce deve fornecer seu nome e numero de WhatsApp. Voce e
            responsavel por manter a confidencialidade do acesso a sua conta e por todas as
            atividades realizadas.
          </p>

          <h2>4. Periodo Gratuito e Assinatura</h2>
          <p>
            O Jarvis oferece 7 dias de uso gratuito. Apos esse periodo, o acesso requer
            assinatura mensal de R$19,90. O pagamento e processado pela Stripe. Voce pode
            cancelar a qualquer momento, sem multa, e o acesso continua ate o fim do periodo
            pago.
          </p>

          <h2>5. Uso Aceitavel</h2>
          <p>Voce concorda em nao utilizar o Servico para:</p>
          <ul>
            <li>Atividades ilegais ou fraudulentas</li>
            <li>Envio de spam ou conteudo abusivo</li>
            <li>Tentativas de comprometer a seguranca do sistema</li>
            <li>Compartilhamento de sua conta com terceiros</li>
          </ul>

          <h2>6. Limitacao de Responsabilidade</h2>
          <p>
            O Jarvis e uma ferramenta auxiliar. Nao garantimos que todos os compromissos serao
            extraidos ou lembrados com 100% de precisao. O Servico e fornecido &quot;como
            esta&quot;. A OLpi Technologies nao se responsabiliza por compromissos perdidos,
            danos indiretos ou consequenciais.
          </p>

          <h2>7. Disponibilidade</h2>
          <p>
            Faremos nosso melhor para manter o Servico disponivel 24/7, mas nao garantimos
            disponibilidade ininterrupta. Manutencoes e atualizacoes podem causar
            indisponibilidade temporaria.
          </p>

          <h2>8. Modificacoes</h2>
          <p>
            Podemos alterar estes Termos a qualquer momento. Alteracoes significativas serao
            comunicadas via WhatsApp ou email. O uso continuado apos alteracoes constitui
            aceitacao dos novos termos.
          </p>

          <h2>9. Rescisao</h2>
          <p>
            Podemos suspender ou encerrar sua conta por violacao destes Termos. Voce pode
            encerrar sua conta a qualquer momento atraves do menu /suporte no WhatsApp.
          </p>

          <h2>10. Legislacao Aplicavel</h2>
          <p>
            Estes Termos sao regidos pelas leis da Republica Federativa do Brasil. Fica eleito o
            foro da Comarca de Sao Paulo/SP.
          </p>

          <h2>11. Contato</h2>
          <p>
            Duvidas sobre estes Termos:{" "}
            <a href="mailto:suporte@jarvis-br.com">suporte@jarvis-br.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
