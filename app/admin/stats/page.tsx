'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Row = Record<string, string | number>
type Stats = {
  totals: Row[]
  byAge: Row[]
  daily: Row[]
  byWeight: Row[]
  combi: Row[]
  byRoomTemp: Row[]
}

const SITE_LABELS: Record<string, string> = {
  flesvoedingcalculator: 'Flesvoeding',
  togwaarde: 'Togwaarde'
}

const AGE_LABELS: Record<string, string> = {
  // Flesvoeding-calculator categories
  '0-1': '0-1 maand',
  '1': '1-3 maanden',
  '3': '3-6 maanden',
  '6': '6+ maanden',
  premature: 'Prematuur',
  // Togwaarde categories
  '0-3': '0-3 maanden',
  '3-6': '3-6 maanden',
  '6-12': '6-12 maanden',
  '12+': '12+ maanden',
  onbekend: 'Onbekend'
}

function label(map: Record<string, string>, key: string) {
  return map[key] ?? key
}

function Bar({ label: l, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{l}</span>
        <span className="text-gray-500">{count} ({pct}%)</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  )
}

export default function StatsPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [site, setSite] = useState<'all' | string>('all')

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) {
      router.replace('/admin')
      return
    }
    fetch('/api/admin/calculator-stats', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.status === 401 ? (router.replace('/admin'), null) : r.json()))
      .then((data) => {
        if (data && data.success) setStats(data)
        else if (data) setError(data.error || 'Kon statistieken niet laden')
      })
      .catch(() => setError('Kon statistieken niet laden'))
  }, [router])

  const sites = stats ? Array.from(new Set(stats.totals.map((t) => String(t.website)))) : []

  const filt = (rows: Row[]) => (site === 'all' ? rows : rows.filter((r) => r.website === site))

  // Aggregate age rows across the current selection into label -> count.
  const ageAgg: Record<string, number> = {}
  if (stats) filt(stats.byAge).forEach((r) => {
    const k = String(r.age_category)
    ageAgg[k] = (ageAgg[k] || 0) + Number(r.count)
  })
  const ageEntries = Object.entries(ageAgg).sort((a, b) => b[1] - a[1])
  const ageTotal = ageEntries.reduce((s, [, c]) => s + c, 0)

  const totalAll = stats ? filt(stats.totals).reduce((s, t) => s + Number(t.total), 0) : 0
  const total30 = stats ? filt(stats.totals).reduce((s, t) => s + Number(t.last30), 0) : 0
  const total7 = stats ? filt(stats.totals).reduce((s, t) => s + Number(t.last7 ?? 0), 0) : 0

  const showFlesBreakdown = site === 'all' || site === 'flesvoedingcalculator'
  const showTogBreakdown = site === 'all' || site === 'togwaarde'
  const weightTotal = stats ? stats.byWeight.reduce((s, r) => s + Number(r.count), 0) : 0
  const combiTotal = stats ? stats.combi.reduce((s, r) => s + Number(r.count), 0) : 0
  const combiYes = stats ? Number(stats.combi.find((r) => r.is_combi === 'true')?.count ?? 0) : 0
  const roomTempTotal = stats ? (stats.byRoomTemp ?? []).reduce((s, r) => s + Number(r.count), 0) : 0

  // Daily trend (max 30 buckets) for the current selection.
  const dailyAgg: Record<string, number> = {}
  if (stats) filt(stats.daily).forEach((r) => {
    const d = String(r.day)
    dailyAgg[d] = (dailyAgg[d] || 0) + Number(r.count)
  })
  const dailyEntries = Object.entries(dailyAgg).sort((a, b) => a[0].localeCompare(b[0]))
  const dailyMax = dailyEntries.reduce((m, [, c]) => Math.max(m, c), 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calculator-statistieken</h1>
            <p className="text-sm text-gray-500">Anonieme, geaggregeerde berekeningen (geen persoonsgegevens)</p>
          </div>
          <a href="/admin/dashboard" className="text-sm text-teal-600 hover:underline">Terug naar dashboard</a>
        </div>

        {error && <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 mb-6">{error}</div>}
        {!stats && !error && <div className="text-gray-500">Laden...</div>}

        {stats && (
          <>
            {/* Site filter */}
            <div className="flex gap-2 mb-6">
              <button onClick={() => setSite('all')} className={`px-3 py-1.5 rounded-full text-sm border ${site === 'all' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-200'}`}>Beide apps</button>
              {sites.map((s) => (
                <button key={s} onClick={() => setSite(s)} className={`px-3 py-1.5 rounded-full text-sm border ${site === s ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-200'}`}>{label(SITE_LABELS, s)}</button>
              ))}
            </div>

            {/* Totals */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <div className="text-2xl font-bold text-gray-900">{totalAll.toLocaleString('nl-NL')}</div>
                <div className="text-sm text-gray-500">Totaal berekeningen</div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <div className="text-2xl font-bold text-gray-900">{total30.toLocaleString('nl-NL')}</div>
                <div className="text-sm text-gray-500">Laatste 30 dagen</div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <div className="text-2xl font-bold text-gray-900">{total7.toLocaleString('nl-NL')}</div>
                <div className="text-sm text-gray-500">Laatste 7 dagen</div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Age distribution */}
              <Card title="Leeftijd van de baby">
                {ageEntries.length === 0 && <p className="text-sm text-gray-500">Nog geen data.</p>}
                {ageEntries.map(([k, c]) => (
                  <Bar key={k} label={label(AGE_LABELS, k)} count={c} total={ageTotal} />
                ))}
              </Card>

              {/* Daily trend */}
              <Card title="Berekeningen per dag (laatste 30 dagen)">
                {dailyEntries.length === 0 ? (
                  <p className="text-sm text-gray-500">Nog geen data.</p>
                ) : (
                  <div className="flex items-end gap-1 h-32">
                    {dailyEntries.map(([d, c]) => (
                      <div key={d} className="flex-1 bg-teal-500/80 rounded-t" style={{ height: `${dailyMax > 0 ? Math.max(4, (c / dailyMax) * 100) : 0}%` }} title={`${d}: ${c}`} />
                    ))}
                  </div>
                )}
              </Card>

              {/* Fles-specific breakdowns */}
              {showFlesBreakdown && weightTotal > 0 && (
                <Card title="Gewicht van de baby (Flesvoeding)">
                  {stats.byWeight.map((r) => (
                    <Bar key={String(r.weight_bucket)} label={String(r.weight_bucket)} count={Number(r.count)} total={weightTotal} />
                  ))}
                </Card>
              )}

              {showFlesBreakdown && combiTotal > 0 && (
                <Card title="Combivoeding (Flesvoeding)">
                  <Bar label="Combivoeding (ook borstvoeding)" count={combiYes} total={combiTotal} />
                  <Bar label="Alleen flesvoeding" count={combiTotal - combiYes} total={combiTotal} />
                </Card>
              )}

              {showTogBreakdown && roomTempTotal > 0 && (
                <Card title="Kamertemperatuur (Togwaarde)">
                  {stats.byRoomTemp.map((r) => (
                    <Bar key={String(r.room_temp)} label={String(r.room_temp)} count={Number(r.count)} total={roomTempTotal} />
                  ))}
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
