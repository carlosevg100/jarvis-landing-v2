import Link from "next/link";

export const metadata = {
  title: "Politica de Privacidade — Jarvis",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1714]">
      <div className="max-w-[720px] mx-auto px-6 py-10">
        <Link
          href="/"
          className="inline-block mb-6 font-outfit text-[13px] text-[var(--accent-highlight)] hover:underline"
        >
          &larr; Voltar ao Jarvis
        </Link>

        <h1 className="font-outfit font-medium text-[36px] mb-2">
          Politica de Privacidade
        </h1>
        <p className="font-outfit text-[12px] text-[rgba(26,23,20,0.4)] mb-8">
          Ultima atualizacao: 12 de marco de 2026
        </p>

        <div className="prose-jarvis">
          <p>
            A OLpi Technologies (&quot;nos&quot;) respeita sua privacidade e esta comprometida
            com a protecao dos seus dados pessoais, em conformidade com a Lei Geral de Protecao
            de Dados (LGPD — Lei n. 13.709/2018).
          </p>

          <h2>1. Dados que Coletamos</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Dado</th>
                  <th>Finalidade</th>
                  <th>Base Legal (LGPD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nome</td>
                  <td>Personalizacao do servico</td>
                  <td>Consentimento</td>
                </tr>
                <tr>
                  <td>Numero de WhatsApp</td>
                  <td>Comunicacao e envio de lembretes</td>
                  <td>Execucao de contrato</td>
                </tr>
                <tr>
                  <td>Mensagens encaminhadas</td>
                  <td>Extracao de compromissos e tarefas</td>
                  <td>Execucao de contrato</td>
                </tr>
                <tr>
                  <td>Audios transcritos</td>
                  <td>Extracao de compromissos via voz</td>
                  <td>Execucao de contrato</td>
                </tr>
                <tr>
                  <td>Imagens e PDFs</td>
                  <td>Extracao de datas e informacoes</td>
                  <td>Execucao de contrato</td>
                </tr>
                <tr>
                  <td>Dados de pagamento</td>
                  <td>Processamento de assinatura</td>
                  <td>Execucao de contrato</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>2. Como Usamos seus Dados</h2>
          <ul>
            <li>
              <strong>Processamento de mensagens:</strong> Suas mensagens sao enviadas a
              provedores de IA (OpenAI, Anthropic) exclusivamente para extracao de compromissos.
              Nao treinamos modelos com seus dados.
            </li>
            <li>
              <strong>Lembretes:</strong> Enviados via WhatsApp no horario configurado.
            </li>
            <li>
              <strong>Dashboard:</strong> Seus compromissos sao exibidos em painel web acessivel
              apenas por voce.
            </li>
            <li>
              <strong>Pagamentos:</strong> Processados pela Stripe, que possui sua propria
              politica de privacidade.
            </li>
          </ul>

          <h2>3. Compartilhamento de Dados</h2>
          <p>Seus dados sao compartilhados apenas com:</p>
          <ul>
            <li>
              <strong>OpenAI / Anthropic:</strong> Para processamento de linguagem natural
              (extracao de compromissos)
            </li>
            <li>
              <strong>Z-API:</strong> Para envio e recebimento de mensagens via WhatsApp
            </li>
            <li>
              <strong>Stripe:</strong> Para processamento de pagamentos
            </li>
            <li>
              <strong>Supabase:</strong> Para armazenamento seguro de dados
            </li>
          </ul>
          <p>
            Nao vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins
            de marketing.
          </p>

          <h2>4. Armazenamento e Seguranca</h2>
          <p>
            Seus dados sao armazenados em servidores seguros (Supabase/AWS) com criptografia em
            transito (TLS) e em repouso. O acesso e restrito a sistemas automatizados
            necessarios para o funcionamento do Servico.
          </p>

          <h2>5. Seus Direitos (LGPD)</h2>
          <p>Voce tem direito a:</p>
          <ul>
            <li>
              <strong>Acesso:</strong> Solicitar copia dos seus dados pessoais
            </li>
            <li>
              <strong>Correcao:</strong> Solicitar correcao de dados incompletos ou inexatos
            </li>
            <li>
              <strong>Exclusao:</strong> Solicitar eliminacao dos seus dados pessoais
            </li>
            <li>
              <strong>Portabilidade:</strong> Solicitar transferencia dos seus dados
            </li>
            <li>
              <strong>Revogacao:</strong> Revogar seu consentimento a qualquer momento
            </li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato:{" "}
            <a href="mailto:suporte@jarvis-br.com">suporte@jarvis-br.com</a>
          </p>

          <h2>6. Retencao de Dados</h2>
          <p>
            Seus dados sao mantidos enquanto sua conta estiver ativa. Apos cancelamento, os
            dados sao excluidos em ate 30 dias, exceto quando a retencao for necessaria por
            obrigacao legal.
          </p>

          <h2>7. Cookies e Analytics</h2>
          <p>
            Utilizamos ferramentas de analytics (PostHog) para melhorar o Servico. Dados
            coletados sao anonimos e agregados. Nao utilizamos cookies de rastreamento de
            terceiros.
          </p>

          <h2>8. Menores de Idade</h2>
          <p>
            O Servico e destinado a maiores de 18 anos. Nao coletamos intencionalmente dados de
            menores.
          </p>

          <h2>9. Alteracoes</h2>
          <p>
            Podemos atualizar esta Politica. Alteracoes significativas serao comunicadas via
            WhatsApp.
          </p>

          <h2>10. Encarregado de Dados (DPO)</h2>
          <p>
            Encarregado: OLpi Technologies
            <br />
            Email: <a href="mailto:suporte@jarvis-br.com">suporte@jarvis-br.com</a>
          </p>

          <h2>11. Contato</h2>
          <p>
            Duvidas sobre privacidade:{" "}
            <a href="mailto:suporte@jarvis-br.com">suporte@jarvis-br.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
