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
  ChevronLeft,
  ChevronRight,
  Shirt,
  Layers,
  Bed
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

type StepKey = 'temp' | 'sleep' | 'clothing'

const STEPS: { key: StepKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'temp', label: 'Temperatuur', icon: Thermometer },
  { key: 'sleep', label: 'Slaapzak', icon: Bed },
  { key: 'clothing', label: 'Kleding', icon: Shirt }
]

function SeasonIcon({ seizoen }: { seizoen: Seizoen }) {
  switch (seizoen) {
    case 'winter': return <Snowflake className="w-4 h-4" />
    case 'zomer': return <Sun className="w-4 h-4" />
    case 'herfst': return <Leaf className="w-4 h-4" />
    case 'lente': return <Flower className="w-4 h-4" />
  }
}

export default function TOGCalculatorV3({ titleTag = 'h2' }: { titleTag?: 'h1' | 'h2' }) {
  const TitleComponent = titleTag === 'h1' ? 'h1' : 'h2'
  const { buitenTemp, locationCity, seizoen, setSeizoen } = useWeatherLocation()

  const [step, setStep] = useState<StepKey>('temp')
  const [kamerTemp, setKamerTemp] = useState<number>(TEMP_SLIDER_CONFIG.default)
  const [slaapzakTOG, setSlaapzakTOG] = useState<number>(1.0)
  const [gekozenKleding, setGekozenKleding] = useState<string[]>(['luier', 'lange_romper'])
  const [gekozenDekens, setGekozenDekens] = useState<string[]>([])
  const [babyLeeftijd, setBabyLeeftijd] = useState<BabyLeeftijd>('12+')
  const [gebruikDekens, setGebruikDekens] = useState<boolean>(false)

  const { aanbevolenTOGRange, totaleTOG, status, warnings } = useTOGCalculation({
    kamerTemp,
    slaapzakTOG,
    gekozenKleding,
    gekozenDekens,
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
  const handleModeSwitch = (useDekens: boolean) => {
    setGebruikDekens(useDekens)
    if (useDekens) {
      setSlaapzakTOG(0)
    } else {
      setGekozenDekens([])
      setSlaapzakTOG(1.0)
    }
  }

  const isBabyUnder12Months = babyLeeftijd !== '12+'
  const beschikbareDekens = isBabyUnder12Months
    ? Object.entries(DEKEN_WAARDEN).filter(([key]) => !key.includes('los'))
    : Object.entries(DEKEN_WAARDEN)

  const stepIndex = STEPS.findIndex(s => s.key === step)
  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1].key)
  }
  const goPrev = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1].key)
  }

  // Bottom sticky result helpers
  const statusBg = status.kleur === 'green'
    ? 'bg-green-50 border-green-200'
    : status.kleur === 'orange'
      ? 'bg-amber-50 border-amber-200'
      : 'bg-red-50 border-red-200'
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

  const showLoosenBlanketHint = babyLeeftijd === '12+' && gebruikDekens

  return (
    <div className="relative pb-40 sm:pb-32">
      {/* Header */}
      <div className="text-center mb-6">
        <TitleComponent className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          TOG Calculator
        </TitleComponent>
        <p className="text-sm text-text-secondary">
          Beantwoord 3 vragen voor het juiste advies
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-6 px-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const isActive = s.key === step
          const isComplete = i < stepIndex
          return (
            <React.Fragment key={s.key}>
              <button
                onClick={() => setStep(s.key)}
                className="flex flex-col items-center gap-1 group"
                aria-label={`Ga naar stap ${i + 1}: ${s.label}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all border-2 ${
                    isActive
                      ? 'bg-primary border-primary text-white scale-110 shadow-md'
                      : isComplete
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-[11px] font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 -mt-5 ${i < stepIndex ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl border border-border shadow-sm p-5 sm:p-7 max-w-xl mx-auto animate-in">
        {step === 'temp' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Hoe warm is de kamer?</h3>
              <p className="text-sm text-text-secondary">Meet de slaapkamertemperatuur met een thermometer.</p>
            </div>

            {/* Big temperature display */}
            <div className="text-center mb-6">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-6xl sm:text-7xl font-bold text-primary leading-none">{kamerTemp}</span>
                <span className="text-2xl text-primary font-semibold">°C</span>
              </div>
              <div className="mt-2 text-xs text-text-secondary">
                {kamerTemp < 16 ? 'Onder NHS-aanbeveling' :
                  kamerTemp <= 20 ? 'Ideale slaaptemperatuur' :
                    kamerTemp <= 24 ? 'Aan de warme kant' : 'Te warm — risico oververhitting'}
              </div>
            </div>

            {/* Slider */}
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
                <span className="flex items-center gap-1">{TEMP_SLIDER_CONFIG.max}° <Sun className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Quick presets */}
            <div className="grid grid-cols-4 gap-2 mt-6">
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

            {/* Outdoor context */}
            <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-background">
              <Moon className="w-5 h-5 text-secondary-dark flex-shrink-0" />
              <div className="flex-1 text-sm">
                <span className="text-text-secondary">Vannacht{locationCity ? ` in ${locationCity}` : ''}: </span>
                <span className="font-semibold text-text-primary">{buitenTemp}°C</span>
              </div>
              <div className="relative">
                <select
                  value={seizoen}
                  onChange={(e) => setSeizoen(e.target.value as Seizoen)}
                  className="appearance-none bg-white border border-border rounded-lg pl-7 pr-7 py-1.5 text-sm font-medium capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                <ChevronRight className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary pointer-events-none rotate-90" />
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
          </div>
        )}

        {step === 'sleep' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Slaapzak of dekens?</h3>
              <p className="text-sm text-text-secondary">Slaapzakken zijn de veiligste keuze.</p>
            </div>

            {/* Segmented mode switch */}
            <div className="bg-background rounded-2xl p-1 grid grid-cols-2 gap-1 mb-6">
              <button
                onClick={() => handleModeSwitch(false)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  !gebruikDekens ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'
                }`}
                aria-pressed={!gebruikDekens}
              >
                <Bed className="w-4 h-4" /> Slaapzak
              </button>
              <button
                onClick={() => handleModeSwitch(true)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  gebruikDekens ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'
                }`}
                aria-pressed={gebruikDekens}
              >
                <Layers className="w-4 h-4" /> Dekens
              </button>
            </div>

            {!gebruikDekens ? (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Officiële TOG-waarde van de slaapzak
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {SLAAPZAK_TOG_OPTIES.map(tog => (
                    <button
                      key={tog}
                      onClick={() => setSlaapzakTOG(tog)}
                      className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${
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
                <p className="mt-4 text-xs text-text-secondary flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  Staat op het label van de slaapzak (zoekt naar &quot;TOG&quot; of &quot;togwaarde&quot;).
                </p>
              </div>
            ) : (
              <div>
                {/* Age picker — only relevant in dekens mode for the loose-blanket rule */}
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
          </div>
        )}

        {step === 'clothing' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Wat draagt je baby?</h3>
              <p className="text-sm text-text-secondary">
                Tik alles aan wat je baby {gebruikDekens ? 'onder de dekens' : 'in de slaapzak'} draagt.
              </p>
            </div>

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
          </div>
        )}

        {/* Wizard navigation */}
        <div className="flex items-center justify-between mt-7 pt-5 border-t border-border">
          <button
            onClick={goPrev}
            disabled={stepIndex === 0}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary disabled:opacity-30 px-3 py-2 rounded-lg hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Vorige
          </button>
          <div className="text-xs text-text-secondary">
            Stap {stepIndex + 1} van {STEPS.length}
          </div>
          {stepIndex < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover px-4 py-2 rounded-lg transition-colors"
            >
              Volgende <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary px-3 py-2">
              <Check className="w-4 h-4" /> Klaar
            </span>
          )}
        </div>
      </div>

      {/* Warnings list — only show critical/warning on results bar's tap-up */}
      {warnings.length > 0 && (
        <div className="max-w-xl mx-auto mt-4 space-y-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border-l-4 flex items-start gap-2 ${
                w.type === 'critical' ? 'bg-red-50 border-red-500' :
                  w.type === 'warning' ? 'bg-amber-50 border-amber-500' :
                    'bg-blue-50 border-blue-500'
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

      {/* Sticky bottom result bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-4 pb-3 sm:pb-4 pointer-events-none">
        <div className={`max-w-xl mx-auto pointer-events-auto rounded-2xl border shadow-lg backdrop-blur-md bg-white/95 ${statusBg}`}>
          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full ${statusDot} animate-pulse flex-shrink-0`} />
                <div className="min-w-0">
                  <div className={`text-sm font-semibold truncate ${statusText}`}>{status.titel}</div>
                  <div className="text-xs text-text-secondary truncate">{status.tekst}</div>
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
        <p className="text-center text-[10px] text-text-secondary mt-1.5">
          Op basis van NHS / Lullaby Trust / VeiligheidNL
        </p>
      </div>
    </div>
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
