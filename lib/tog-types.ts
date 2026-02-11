/**
 * TypeScript type definitions for TOG Calculator
 */

// Clothing item with TOG value
export interface KledingItem {
  TOG: number
  naam: string
  info: string
}

// Blanket/deken item with TOG value
export interface DekenItem {
  TOG: number
  naam: string
  info: string
}

// Dictionary of clothing items
export type KledingWaarden = Record<string, KledingItem>

// Dictionary of blanket items
export type DekenWaarden = Record<string, DekenItem>

// TOG recommendation range
export interface TOGRange {
  min: number
  ideal: number
  max: number
}

// TOG recommendation by temperature
export interface TOGRecommendation {
  minTemp: number
  range: TOGRange
}

// Location coordinates
export interface LocationCoords {
  lat: number
  lon: number
  city: string
}

// Safety limits configuration
export interface SafetyLimits {
  MAX_SAFE_TOG: number
  HIGH_TOG_WARNING: number
  MIN_ROOM_TEMP: number
  MAX_ROOM_TEMP: number
  LOOSE_BLANKET_MIN_AGE: string
}

// Temperature slider configuration
export interface TempSliderConfig {
  min: number
  max: number
  default: number
}

// Season type
export type Seizoen = 'winter' | 'lente' | 'zomer' | 'herfst'

// Baby age category
export type BabyLeeftijd = '0-3' | '3-6' | '6-12' | '12+'

// Status color type
export type StatusKleur = 'green' | 'orange' | 'red'

// Calculator status
export interface CalculatorStatus {
  status: string
  kleur: StatusKleur
  titel: string
  tekst: string
}

// Warning type
export type WarningType = 'critical' | 'warning' | 'info'

// TOG warning
export interface TOGWarning {
  type: WarningType
  titel: string
  tekst: string
}

// TOG calculation result
export interface TOGCalculationResult {
  aanbevolenTOGRange: TOGRange
  kledingTOG: number
  dekenTOG: number
  totaleTOG: number
  status: CalculatorStatus
  warnings: TOGWarning[]
}

// Weather/location hook result
export interface WeatherLocationResult {
  buitenTemp: number
  setBuitenTemp: (temp: number) => void
  locationCity: string
  seizoen: Seizoen
  setSeizoen: (seizoen: Seizoen) => void
  isLoading: boolean
  error: string | null
}

// Props for TOGCalculator
export interface TOGCalculatorProps {
  titleTag?: 'h1' | 'h2'
}

// Props for RoomInfoCard
export interface RoomInfoCardProps {
  kamerTemp: number
  setKamerTemp: (temp: number) => void
  buitenTemp: number
  locationCity: string
  seizoen: Seizoen
  setSeizoen: (seizoen: Seizoen) => void
}

// Props for ClothingSelector
export interface ClothingSelectorProps {
  gekozenKleding: string[]
  setGekozenKleding: (kleding: string[]) => void
  gekozenDekens: string[]
  setGekozenDekens: (dekens: string[]) => void
  slaapzakTOG: number
  setSlaapzakTOG: (tog: number) => void
  gebruikDekens: boolean
  setGebruikDekens: (gebruik: boolean) => void
  babyLeeftijd: BabyLeeftijd
  onShowInfoModal: () => void
}

// Props for TOGResultsPanel
export interface TOGResultsPanelProps {
  totaleTOG: number
  aanbevolenTOGRange: TOGRange
  status: CalculatorStatus
  warnings: TOGWarning[]
  kamerTemp: number
  gekozenKleding: string[]
  gekozenDekens: string[]
  slaapzakTOG: number
  gebruikDekens: boolean
}

// Props for TOGInfoModal
export interface TOGInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

// Props for SelectionButton (internal component)
export interface SelectionButtonProps {
  item: string
  info: KledingItem | DekenItem
  isSelected: boolean
  onClick: () => void
  showTooltip?: boolean
  tooltipContent?: React.ReactNode
}
