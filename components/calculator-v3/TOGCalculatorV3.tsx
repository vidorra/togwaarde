'use client'
import React, { useState, useEffect } from 'react'
import {
  Thermometer,
  Sun,
  Snowflake,
  Moon,
  Leaf,
  Flower,
  Check,
  AlertTriangle,
  Info,
  Shirt,
  Layers,
  Bed,
  Minus
} from 'lucide-react'

import { useTOGCalculation } from '../../hooks/useTOGCalculation'
import { useWeatherLocation } from '../../hooks/useWeatherLocation'
import {
  TEMP_SLIDER_CONFIG,
  SAFETY_LIMITS,
  KLEDING_WAARDEN,
  DEKEN_WAARDEN,
  SLAAPZAK_TOG_OPTIES
} from '../../lib/tog-constants'
import type { Seizoen, BabyLeeftijd } from '../../lib/tog-types'

type SleepMode = 'slaapzak' | 'dekens' | 'geen'

function SeasonIcon({ seizoen }: { seizoen: Seizoen }) {
  switch (seizoen) {
    case 'winter': return <Snowflake className="w-4 h-4" />
    case 'zomer': return <Sun className="w-4 h-4" />
    case 'herfst': return <Leaf className="w-4 h-4" />
    case 'lente': return <Flower className="w-4 h-4" />
  }
}

// Renders the status message with the "voor een kamertemperatuur van X°C!"
// clause in bold. Falls back to plain text if the clause isn't present.
function renderStatusTekst(tekst: string) {
  const marker = 'voor een kamertemperatuur van'
  const i = tekst.indexOf(marker)
  if (i === -1) return tekst
  return (
    <>
      {tekst.slice(0, i)}
      <strong className="font-semibold">{tekst.slice(i)}</strong>
    </>
  )
}

export default function TOGCalculatorV3({ titleTag = 'h2' }: { titleTag?: 'h1' | 'h2' }) {
  const TitleComponent = titleTag === 'h1' ? 'h1' : 'h2'
  const { buitenTemp, locationCity, seizoen, setSeizoen } = useWeatherLocation()

  const [kamerTemp, setKamerTemp] = useState<number>(TEMP_SLIDER_CONFIG.default)
  const [sleepMode, setSleepMode] = useState<SleepMode>('slaapzak')
  const [slaapzakTOG, setSlaapzakTOG] = useState<number>(1.0)
  const [gekozenKleding, setGekozenKleding] = useState<string[]>(['luier', 'lange_romper'])
  const [gekozenDekens, setGekozenDekens] = useState<string[]>([])
  const [babyLeeftijd, setBabyLeeftijd] = useState<BabyLeeftijd>('12+')

  // Map sleepMode → flags used by the existing hook
  const gebruikDekens = sleepMode !== 'slaapzak'
  const effectiveSlaapzakTOG = sleepMode === 'slaapzak' ? slaapzakTOG : 0

  const { aanbevolenTOGRange, totaleTOG, status, warnings } = useTOGCalculation({
    kamerTemp,
    slaapzakTOG: effectiveSlaapzakTOG,
    gekozenKleding,
    gekozenDekens: sleepMode === 'dekens' ? gekozenDekens : [],
    gebruikDekens
  })

  useEffect(() => {
    if (babyLeeftijd !== '12+' && gekozenDekens.includes('los_deken')) {
      setGekozenDekens(gekozenDekens.filter(d => d !== 'los_deken'))
    }
  }, [babyLeeftijd, gekozenDekens])

  const toggleKleding = (item: string) => {
    setGekozenKleding(gekozenKleding.includes(item)
      ? gekozenKleding.filter(k => k !== item)
      : [...gekozenKleding, item])
  }
  const toggleDeken = (item: string) => {
    setGekozenDekens(gekozenDekens.includes(item)
      ? gekozenDekens.filter(d => d !== item)
      : [...gekozenDekens, item])
  }

  const isBabyUnder12Months = babyLeeftijd !== '12+'
  const beschikbareDekens = isBabyUnder12Months
    ? Object.entries(DEKEN_WAARDEN).filter(([key]) => !key.includes('los'))
    : Object.entries(DEKEN_WAARDEN)

  const statusText = status.kleur === 'green'
    ? 'text-green-700'
    : status.kleur === 'orange'
      ? 'text-amber-700'
      : 'text-red-700'
  const statusDot = status.kleur === 'green'
    ? 'bg-green-500'
    : status.kleur === 'orange'
      ? 'bg-amber-500'
      : 'bg-red-500'
  const statusAccent = status.kleur === 'green'
    ? 'border-green-400'
    : status.kleur === 'orange'
      ? 'border-amber-400'
      : 'border-red-400'

  return (
    <div className="relative pb-40 lg:pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <TitleComponent className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            TOG Calculator
          </TitleComponent>
          <p className="text-sm text-text-secondary">
            Vul in wat van toepassing is — alle delen zijn optioneel.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6 lg:items-start">
          <div className="space-y-4">
        {/* === Card 1: Temperatuur === */}
        <Section
          icon={<Thermometer className="w-5 h-5" />}
          title="Kamertemperatuur"
          subtitle="Meet de slaapkamer met een thermometer"
          value={kamerTemp >= TEMP_SLIDER_CONFIG.max ? `${kamerTemp}°C+` : `${kamerTemp}°C`}
        >
          <div className="px-1">
            <input
              type="range"
              min={TEMP_SLIDER_CONFIG.min}
              max={TEMP_SLIDER_CONFIG.max}
              value={kamerTemp}
              onChange={(e) => setKamerTemp(Number(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-300 via-green-300 to-red-300"
              aria-label="Kamertemperatuur in graden Celsius"
              aria-valuenow={kamerTemp}
            />
            <div className="flex justify-between mt-2 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><Snowflake className="w-3 h-3" /> {TEMP_SLIDER_CONFIG.min}°</span>
              <span className="font-medium text-primary">Ideaal 16–20°</span>
              <span className="flex items-center gap-1">{TEMP_SLIDER_CONFIG.max}°+ <Sun className="w-3 h-3" /></span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {[16, 18, 20, 22].map(t => (
              <button
                key={t}
                onClick={() => setKamerTemp(t)}
                className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                  kamerTemp === t
                    ? 'bg-primary text-white border-primary'
                    : 'bg-background border-transparent hover:border-primary/30'
                }`}
              >
                {t}°
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-background">
            <Moon className="w-5 h-5 text-secondary-dark flex-shrink-0" />
            <div className="flex-1 text-sm">
              <span className="text-text-secondary">Vannacht{locationCity ? ` in ${locationCity}` : ''}: </span>
              <span className="font-semibold text-text-primary">{buitenTemp}°C</span>
            </div>
            <div className="relative">
              <select
                value={seizoen}
                onChange={(e) => setSeizoen(e.target.value as Seizoen)}
                className="appearance-none bg-white border border-border rounded-lg pl-7 pr-3 py-1.5 text-sm font-medium capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Seizoen"
              >
                <option value="winter">winter</option>
                <option value="lente">lente</option>
                <option value="zomer">zomer</option>
                <option value="herfst">herfst</option>
              </select>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                <SeasonIcon seizoen={seizoen} />
              </div>
            </div>
          </div>

          {kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP && (
            <InlineAlert tone="info" icon={<Snowflake className="w-4 h-4" />}>
              Onder 16°C: verhoog kamertemperatuur of gebruik 3.5 TOG slaapzak met warme kleding.
            </InlineAlert>
          )}
          {kamerTemp > SAFETY_LIMITS.MAX_ROOM_TEMP && (
            <InlineAlert tone="warn" icon={<AlertTriangle className="w-4 h-4" />}>
              Boven 24°C: risico op oververhitting — gebruik maximaal 0.5 TOG.
            </InlineAlert>
          )}
        </Section>

        {/* === Card 2: Wat ligt op de baby === */}
        <Section
          icon={<Bed className="w-5 h-5" />}
          title="Slaapzak of dekens?"
          subtitle="Kies wat van toepassing is, of niets"
        >
          <div className="bg-background rounded-2xl p-1 grid grid-cols-3 gap-1">
            <ModeTab active={sleepMode === 'slaapzak'} onClick={() => setSleepMode('slaapzak')} icon={<Bed className="w-4 h-4" />} label="Slaapzak" />
            <ModeTab active={sleepMode === 'dekens'} onClick={() => setSleepMode('dekens')} icon={<Layers className="w-4 h-4" />} label="Dekens" />
            <ModeTab active={sleepMode === 'geen'} onClick={() => setSleepMode('geen')} icon={<Minus className="w-4 h-4" />} label="Geen" />
          </div>

          {sleepMode === 'slaapzak' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-text-primary mb-3">
                TOG-waarde van de slaapzak <span className="text-text-secondary font-normal">(staat op het label)</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {SLAAPZAK_TOG_OPTIES.map(tog => (
                  <button
                    key={tog}
                    onClick={() => setSlaapzakTOG(tog)}
                    className={`flex flex-col items-center justify-center py-3.5 rounded-xl border-2 transition-all ${
                      slaapzakTOG === tog
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-background border-transparent hover:border-primary/30'
                    }`}
                    aria-pressed={slaapzakTOG === tog}
                    aria-label={`Slaapzak ${tog} TOG`}
                  >
                    <span className="text-lg font-bold leading-none">{tog}</span>
                    <span className="text-[10px] mt-1 opacity-80">TOG</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {sleepMode === 'dekens' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Hoe oud is je baby?
              </label>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {(['0-3', '3-6', '6-12', '12+'] as BabyLeeftijd[]).map(age => (
                  <button
                    key={age}
                    onClick={() => setBabyLeeftijd(age)}
                    className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      babyLeeftijd === age
                        ? 'bg-primary text-white border-primary'
                        : 'bg-background border-transparent hover:border-primary/30'
                    }`}
                  >
                    {age}{age === '12+' ? '' : ' mnd'}
                  </button>
                ))}
              </div>

              <label className="block text-sm font-medium text-text-primary mb-3">
                Selecteer dekens
              </label>
              <div className="space-y-2">
                {beschikbareDekens.map(([item, info]) => {
                  const selected = gekozenDekens.includes(item)
                  return (
                    <button
                      key={item}
                      onClick={() => toggleDeken(item)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                        selected ? 'bg-primary/5 border-primary' : 'bg-background border-transparent hover:border-primary/30'
                      }`}
                      aria-pressed={selected}
                    >
                      <div>
                        <div className="font-medium text-sm text-text-primary">{info.naam}</div>
                        <div className="text-xs text-text-secondary">±{info.TOG} TOG · {info.info}</div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-3 ${
                        selected ? 'bg-primary text-white' : 'bg-white border border-border'
                      }`}>
                        {selected && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {gekozenDekens.length > 0 && (
                <InlineAlert tone="warn" icon={<AlertTriangle className="w-4 h-4" />}>
                  Vouw dekens NOOIT dubbel — dit verdubbelt de TOG en verhoogt het risico op oververhitting.
                </InlineAlert>
              )}
              {isBabyUnder12Months && (
                <InlineAlert tone="info" icon={<Info className="w-4 h-4" />}>
                  Losse dekens zijn niet veilig onder 12 maanden — alleen ingestopte dekens worden getoond.
                </InlineAlert>
              )}
            </div>
          )}

          {sleepMode === 'geen' && (
            <div className="mt-4 p-4 rounded-xl bg-background text-sm text-text-secondary">
              Geen slaapzak en geen dekens. We rekenen alleen met de kleding hieronder.
            </div>
          )}
        </Section>

        {/* === Card 3: Kleding === */}
        <Section
          icon={<Shirt className="w-5 h-5" />}
          title="Wat draagt je baby?"
          subtitle="Tik alles aan wat van toepassing is — laat leeg als je baby bloot slaapt"
        >
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(KLEDING_WAARDEN).map(([item, info]) => {
              const selected = gekozenKleding.includes(item)
              return (
                <button
                  key={item}
                  onClick={() => toggleKleding(item)}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                    selected ? 'bg-primary/5 border-primary' : 'bg-background border-transparent hover:border-primary/30'
                  }`}
                  aria-pressed={selected}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-text-primary">{info.naam}</div>
                      <div className="text-xs text-text-secondary mt-0.5">±{info.TOG} TOG</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selected ? 'bg-primary text-white' : 'bg-white border border-border'
                    }`}>
                      {selected && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-xs text-text-secondary flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            TOG-waarden voor losse kleding zijn schattingen — alleen slaapzakken hebben een officiële rating.
          </p>
        </Section>

        {/* Warnings list */}
        {warnings.length > 0 && (
          <div className="space-y-2">
            {warnings.map((w, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl flex items-start gap-2 ${
                  w.type === 'critical' ? 'bg-red-50' :
                    w.type === 'warning' ? 'bg-amber-50' :
                      'bg-blue-50'
                }`}
              >
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  w.type === 'critical' ? 'text-red-600' :
                    w.type === 'warning' ? 'text-amber-600' :
                      'text-blue-600'
                }`} />
                <div>
                  <p className={`text-sm font-semibold ${
                    w.type === 'critical' ? 'text-red-800' :
                      w.type === 'warning' ? 'text-amber-800' :
                        'text-blue-800'
                  }`}>{w.titel}</p>
                  <p className={`text-xs mt-0.5 ${
                    w.type === 'critical' ? 'text-red-700' :
                      w.type === 'warning' ? 'text-amber-700' :
                        'text-blue-700'
                  }`}>{w.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        )}
          </div>

          {/* Right column: sticky result panel (desktop) — styled like the mobile bar */}
          <div className="hidden lg:block">
            <div className={`lg:sticky lg:top-6 rounded-2xl border-2 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.10)] p-5 ${statusAccent}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${statusDot} flex-shrink-0`} />
                <div className={`text-sm font-semibold ${statusText}`}>{status.titel}</div>
              </div>
              <p className="text-xs text-text-secondary mb-5">{renderStatusTekst(status.tekst)}</p>
              <div className="flex items-stretch gap-4">
                <div className="flex-1 text-center">
                  <div className="text-[10px] uppercase tracking-wide text-text-secondary mb-1">Jouw TOG</div>
                  <div className="text-3xl font-bold text-text-primary leading-none">{totaleTOG.toFixed(1)}</div>
                </div>
                <div className="w-px bg-border" />
                <div className="flex-1 text-center">
                  <div className="text-[10px] uppercase tracking-wide text-text-secondary mb-1">Advies</div>
                  <div className="text-3xl font-bold text-primary leading-none">
                    {aanbevolenTOGRange.min === aanbevolenTOGRange.max
                      ? aanbevolenTOGRange.ideal.toFixed(1)
                      : `${aanbevolenTOGRange.min.toFixed(1)}–${aanbevolenTOGRange.max.toFixed(1)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attribution — static, in normal flow (not the fixed bar) */}
        <p className="text-center text-[11px] text-text-secondary mt-6">
          Op basis van NHS / Lullaby Trust / VeiligheidNL
        </p>
      </div>

      {/* Mobile fixed result bar — solid, high-contrast (below lg only) */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 p-3 pointer-events-none">
        <div className={`max-w-xl mx-auto pointer-events-auto rounded-2xl border-2 bg-white shadow-[0_-6px_28px_rgba(0,0,0,0.16)] ${statusAccent}`}>
          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full ${statusDot} animate-pulse flex-shrink-0`} />
                <div className="min-w-0">
                  <div className={`text-sm font-semibold truncate ${statusText}`}>{status.titel}</div>
                  <div className="text-xs text-text-secondary truncate">{renderStatusTekst(status.tekst)}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wide text-text-secondary">Jouw</div>
                  <div className="text-xl font-bold text-text-primary leading-none">{totaleTOG.toFixed(1)}</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wide text-text-secondary">Advies</div>
                  <div className="text-xl font-bold text-primary leading-none">
                    {aanbevolenTOGRange.min === aanbevolenTOGRange.max
                      ? aanbevolenTOGRange.ideal.toFixed(1)
                      : `${aanbevolenTOGRange.min.toFixed(1)}–${aanbevolenTOGRange.max.toFixed(1)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  icon,
  title,
  subtitle,
  value,
  children
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  value?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-3xl border border-border shadow-sm p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-text-primary leading-snug">{title}</h3>
            {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {value && (
          <span className="text-xl font-bold text-primary flex-shrink-0">{value}</span>
        )}
      </div>
      {children}
    </div>
  )
}

function ModeTab({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
        active ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'
      }`}
      aria-pressed={active}
    >
      {icon} {label}
    </button>
  )
}

function InlineAlert({
  tone,
  icon,
  children
}: {
  tone: 'info' | 'warn'
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const cls = tone === 'warn'
    ? 'bg-amber-50 border-amber-400 text-amber-800'
    : 'bg-blue-50 border-blue-400 text-blue-800'
  return (
    <div className={`mt-4 p-3 rounded-xl border-l-4 flex items-start gap-2 text-sm ${cls}`}>
      <span className="mt-0.5 flex-shrink-0">{icon}</span>
      <span>{children}</span>
    </div>
  )
}
