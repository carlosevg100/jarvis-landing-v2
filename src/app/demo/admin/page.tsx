"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  TrendingUp,
  Share2,
  Globe,
  RefreshCw,
  Lock,
  ArrowRight,
} from "lucide-react";

const BACKEND = "https://jarvis-backend-six.vercel.app";

type Stats = {
  total_waitlist: number;
  total_all_users: number;
  queue_position_current: number;
  by_source: { fakedoor: number; fakedoor_en: number };
  by_day: Record<string, { total: number; fakedoor: number; fakedoor_en: number }>;
  referral_leaderboard: { referral_code: string; name: string; referrals: number }[];
  recent_signups: { name: string; source: string; referred_by: string | null; created_at: string }[];
};

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[rgba(65,62,62,0.04)] flex items-center justify-center">
          <Icon size={16} className="text-[#1A1714]/50" />
        </div>
        <span className="font-outfit text-[13px] text-[#1A1714]/50">{label}</span>
      </div>
      <p className={`font-jetbrains font-bold text-[32px] leading-none ${accent || "text-[#1A1714]"}`}>
        {value}
      </p>
      {sub && <p className="font-outfit text-[12px] text-[#1A1714]/40">{sub}</p>}
    </div>
  );
}

function DayChart({ byDay }: { byDay: Stats["by_day"] }) {
  const days = Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14); // last 14 days

  if (days.length === 0) return <p className="font-outfit text-sm text-[#1A1714]/40 text-center py-8">Nenhum dado ainda.</p>;

  const maxVal = Math.max(...days.map(([, v]) => v.total), 1);

  return (
    <div className="flex items-end gap-1.5 h-[160px] px-2">
      {days.map(([day, v]) => {
        const h = (v.total / maxVal) * 140;
        const ptH = (v.fakedoor / maxVal) * 140;
        const enH = ((v.fakedoor_en || 0) / maxVal) * 140;
        const dateLabel = day.slice(5); // MM-DD

        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <span className="font-jetbrains text-[10px] text-[#1A1714]/50 font-bold">{v.total}</span>
            <div className="w-full flex flex-col gap-0.5" style={{ height: h }}>
              {enH > 0 && (
                <div
                  className="w-full rounded-t-sm bg-[#3c3b6e]/60"
                  style={{ height: enH }}
                  title={`EN: ${v.fakedoor_en || 0}`}
                />
              )}
              <div
                className="w-full rounded-t-sm bg-[#4A8C6F]"
                style={{ height: ptH, flexShrink: 0 }}
                title={`PT: ${v.fakedoor}`}
              />
            </div>
            <span className="font-outfit text-[9px] text-[#1A1714]/30 truncate w-full text-center">{dateLabel}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDashboard() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchStats = useCallback(async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND}/api/users/waitlist-stats?secret=${encodeURIComponent(key)}`);
      if (res.status === 403) {
        setError("Chave invalida.");
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setStats(data);
        setAuthenticated(true);
        setLastRefresh(new Date());
      }
    } catch {
      setError("Erro de conexao.");
    }
    setLoading(false);
  }, []);

  // Auto-refresh every 60s
  useEffect(() => {
    if (!authenticated || !secret) return;
    const interval = setInterval(() => fetchStats(secret), 60000);
    return () => clearInterval(interval);
  }, [authenticated, secret, fetchStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret.trim()) fetchStats(secret.trim());
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-8 w-full max-w-[380px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(65,62,62,0.04)] flex items-center justify-center">
              <Lock size={20} className="text-[#1A1714]/50" />
            </div>
            <div>
              <h1 className="font-outfit font-medium text-lg text-[#1A1714]">Jarvis Admin</h1>
              <p className="font-outfit text-[12px] text-[#1A1714]/40">Waitlist Dashboard</p>
            </div>
          </div>

          <label className="font-outfit text-[11px] text-[#1A1714]/40 uppercase tracking-wider mb-1.5 block">
            Chave de acesso
          </label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="ADMIN_STATS_SECRET"
            className="w-full bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-3 font-jetbrains text-[14px] text-[#1A1714] placeholder:text-[rgba(0,0,0,0.15)] outline-none focus:border-[#D4A843]/40 transition-colors mb-4"
            autoFocus
          />

          {error && <p className="font-outfit text-[13px] text-red-600 mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1A1714] text-white font-outfit font-medium text-[14px] hover:bg-[#2A2724] transition-colors disabled:opacity-50"
          >
            {loading ? "Carregando..." : (<>Entrar <ArrowRight size={16} /></>)}
          </button>
        </form>
      </div>
    );
  }

  if (!stats) return null;

  const referredCount = stats.recent_signups.filter(s => s.referred_by).length;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-[60px] border-b border-[rgba(0,0,0,0.04)] sticky top-0 z-10">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-jetbrains font-bold text-lg tracking-[-0.04em] text-[#1A1714]">jarvis</span>
            <span className="font-outfit text-[11px] px-2 py-0.5 rounded-full bg-[rgba(212,168,67,0.1)] text-[#B89530] font-medium">admin</span>
          </div>
          <div className="flex items-center gap-4">
            {lastRefresh && (
              <span className="font-outfit text-[11px] text-[#1A1714]/30">
                Atualizado {lastRefresh.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              onClick={() => fetchStats(secret)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(0,0,0,0.06)] text-[12px] font-outfit text-[#1A1714]/60 hover:bg-[rgba(0,0,0,0.02)] transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users}
            label="Total Waitlist"
            value={stats.total_waitlist}
            sub={`${stats.total_all_users} usuarios totais`}
          />
          <StatCard
            icon={Globe}
            label="PT-BR"
            value={stats.by_source.fakedoor || 0}
            sub="jarvis-br.com/demo"
            accent="text-[#4A8C6F]"
          />
          <StatCard
            icon={Globe}
            label="EN (USA)"
            value={stats.by_source.fakedoor_en || 0}
            sub="jarvis-br.com/demo/en"
            accent="text-[#3c3b6e]"
          />
          <StatCard
            icon={Share2}
            label="Via Referral"
            value={referredCount}
            sub={`${stats.referral_leaderboard.length} referrers`}
            accent="text-[#D4A843]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-outfit font-medium text-[16px] text-[#1A1714]">Inscricoes por dia</h2>
                <p className="font-outfit text-[12px] text-[#1A1714]/40">Ultimos 14 dias</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#4A8C6F]" />
                  <span className="font-outfit text-[11px] text-[#1A1714]/40">PT-BR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#3c3b6e]/60" />
                  <span className="font-outfit text-[11px] text-[#1A1714]/40">EN</span>
                </div>
              </div>
            </div>
            <DayChart byDay={stats.by_day} />
          </div>

          {/* Referral Leaderboard */}
          <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[#D4A843]" />
              <h2 className="font-outfit font-medium text-[16px] text-[#1A1714]">Top Referrals</h2>
            </div>
            {stats.referral_leaderboard.length === 0 ? (
              <p className="font-outfit text-[13px] text-[#1A1714]/30 text-center py-6">Nenhum referral ainda.</p>
            ) : (
              <div className="space-y-2">
                {stats.referral_leaderboard.map((r, i) => (
                  <div key={r.referral_code} className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.03)] last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        i === 0 ? "bg-[#D4A843] text-white" : i === 1 ? "bg-[#C0C0C0] text-white" : i === 2 ? "bg-[#CD7F32] text-white" : "bg-[rgba(0,0,0,0.04)] text-[#1A1714]/40"
                      }`}>
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-outfit text-[13px] text-[#1A1714] font-medium">{r.name}</p>
                        <p className="font-jetbrains text-[10px] text-[#1A1714]/30">{r.referral_code}</p>
                      </div>
                    </div>
                    <span className="font-jetbrains font-bold text-[16px] text-[#4A8C6F]">{r.referrals}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Signups */}
        <div className="mt-6 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6">
          <h2 className="font-outfit font-medium text-[16px] text-[#1A1714] mb-4">Ultimas inscricoes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)]">
                  <th className="font-outfit text-[11px] text-[#1A1714]/40 uppercase tracking-wider pb-3 pr-4">Nome</th>
                  <th className="font-outfit text-[11px] text-[#1A1714]/40 uppercase tracking-wider pb-3 pr-4">Fonte</th>
                  <th className="font-outfit text-[11px] text-[#1A1714]/40 uppercase tracking-wider pb-3 pr-4">Referral</th>
                  <th className="font-outfit text-[11px] text-[#1A1714]/40 uppercase tracking-wider pb-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_signups.map((s, i) => (
                  <tr key={i} className="border-b border-[rgba(0,0,0,0.02)] last:border-0">
                    <td className="py-3 pr-4">
                      <span className="font-outfit text-[14px] text-[#1A1714]">{s.name}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-outfit font-medium ${
                        s.source === 'fakedoor_en' ? 'bg-[#3c3b6e]/10 text-[#3c3b6e]' : 'bg-[#4A8C6F]/10 text-[#4A8C6F]'
                      }`}>
                        {s.source === 'fakedoor_en' ? '🇺🇸 EN' : '🇧🇷 PT'}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {s.referred_by ? (
                        <span className="font-jetbrains text-[12px] text-[#D4A843]">{s.referred_by}</span>
                      ) : (
                        <span className="font-outfit text-[12px] text-[#1A1714]/20">direto</span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className="font-outfit text-[13px] text-[#1A1714]/50">
                        {new Date(s.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Queue info */}
        <div className="mt-6 text-center">
          <p className="font-outfit text-[12px] text-[#1A1714]/30">
            Posicao atual na fila: <span className="font-jetbrains font-bold">#{stats.queue_position_current}</span>
            {" "}· Auto-refresh a cada 60s
          </p>
        </div>
      </div>
    </div>
  );
}
