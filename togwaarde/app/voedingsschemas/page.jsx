'use client'
import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Calendar, Clock, Target, ArrowRight, Download, Calculator, Baby, Moon, Utensils, Milk, ChevronDown } from 'lucide-react'
import jsPDF from 'jspdf'

export default function VoedingsschemasPage() {
  const [selectedAge, setSelectedAge] = useState('0-3m')
  const [feedingFrequency, setFeedingFrequency] = useState('default')

  const ageGroups = [
    { id: '0-3m', name: '0-3 maanden', icon: Baby },
    { id: '3-6m', name: '3-6 maanden', icon: Moon },
    { id: '6-12m', name: '6-12 maanden', icon: Utensils },
    { id: '12m+', name: '12+ maanden', icon: Milk }
  ]

  const feedingOptions = [
    { id: 'default', name: 'Standaard schema' },
    { id: '4-feeds', name: '4 voedingen per dag' },
    { id: '5-feeds', name: '5 voedingen per dag' },
    { id: '6-feeds', name: '6 voedingen per dag' },
    { id: '7-feeds', name: '7 voedingen per dag' },
    { id: '8-feeds', name: '8 voedingen per dag' }
  ]

  const schemas = {
    '0-3m': {
      default: {
        feeds: '6-8 voedingen',
        amount: '60-120 ml per voeding',
        interval: 'Om de 2-4 uur',
        examples: ['06:00 - 90ml', '09:00 - 90ml', '12:00 - 90ml', '15:00 - 90ml', '18:00 - 90ml', '21:00 - 90ml'],
      },
      '4-feeds': {
        feeds: '4 voedingen',
        amount: '120-150 ml per voeding',
        interval: 'Om de 6 uur',
        examples: ['06:00 - 135ml', '12:00 - 135ml', '18:00 - 135ml', '00:00 - 135ml'],
      },
      '5-feeds': {
        feeds: '5 voedingen',
        amount: '100-120 ml per voeding',
        interval: 'Om de 4-5 uur',
        examples: ['06:00 - 110ml', '10:00 - 110ml', '14:00 - 110ml', '18:00 - 110ml', '22:00 - 110ml'],
      },
      '6-feeds': {
        feeds: '6 voedingen',
        amount: '80-100 ml per voeding',
        interval: 'Om de 4 uur',
        examples: ['06:00 - 90ml', '10:00 - 90ml', '14:00 - 90ml', '18:00 - 90ml', '22:00 - 90ml', '02:00 - 90ml'],
      },
      '7-feeds': {
        feeds: '7 voedingen',
        amount: '70-90 ml per voeding',
        interval: 'Om de 3-4 uur',
        examples: ['06:00 - 80ml', '09:00 - 80ml', '12:00 - 80ml', '15:00 - 80ml', '18:00 - 80ml', '21:00 - 80ml', '00:00 - 80ml'],
      },
      '8-feeds': {
        feeds: '8 voedingen',
        amount: '60-80 ml per voeding',
        interval: 'Om de 3 uur',
        examples: ['06:00 - 70ml', '09:00 - 70ml', '12:00 - 70ml', '15:00 - 70ml', '18:00 - 70ml', '21:00 - 70ml', '00:00 - 70ml', '03:00 - 70ml'],
      },
      milestones: ['Gewichtstoename', 'Regelmatig voedingspatroon', 'Meer alertheid'],
      nextPhase: 'Rond 3-4 maanden kan het aantal voedingen afnemen maar de hoeveelheid per voeding toenemen.'
    },
    '3-6m': {
      default: {
        feeds: '5-6 voedingen',
        amount: '120-180 ml per voeding',
        interval: 'Om de 3-4 uur',
        examples: ['07:00 - 150ml', '11:00 - 150ml', '15:00 - 150ml', '19:00 - 150ml', '23:00 - 150ml'],
      },
      '4-feeds': {
        feeds: '4 voedingen',
        amount: '180-220 ml per voeding',
        interval: 'Om de 6 uur',
        examples: ['07:00 - 200ml', '13:00 - 200ml', '19:00 - 200ml', '01:00 - 200ml'],
      },
      '5-feeds': {
        feeds: '5 voedingen',
        amount: '150-180 ml per voeding',
        interval: 'Om de 4-5 uur',
        examples: ['07:00 - 165ml', '11:00 - 165ml', '15:00 - 165ml', '19:00 - 165ml', '23:00 - 165ml'],
      },
      '6-feeds': {
        feeds: '6 voedingen',
        amount: '120-150 ml per voeding',
        interval: 'Om de 4 uur',
        examples: ['07:00 - 135ml', '11:00 - 135ml', '15:00 - 135ml', '19:00 - 135ml', '23:00 - 135ml', '03:00 - 135ml'],
      },
      '7-feeds': {
        feeds: '7 voedingen',
        amount: '110-130 ml per voeding',
        interval: 'Om de 3-4 uur',
        examples: ['07:00 - 120ml', '10:00 - 120ml', '13:00 - 120ml', '16:00 - 120ml', '19:00 - 120ml', '22:00 - 120ml', '01:00 - 120ml'],
      },
      '8-feeds': {
        feeds: '8 voedingen',
        amount: '100-120 ml per voeding',
        interval: 'Om de 3 uur',
        examples: ['07:00 - 110ml', '10:00 - 110ml', '13:00 - 110ml', '16:00 - 110ml', '19:00 - 110ml', '22:00 - 110ml', '01:00 - 110ml', '04:00 - 110ml'],
      },
      milestones: ['Interesse in vast voedsel', 'Kunnen zelf fles vasthouden', 'Nachts langer slapen'],
      nextPhase: 'Vanaf 6 maanden wordt vast voedsel geïntroduceerd naast flesvoeding.'
    },
    '6-12m': {
      default: {
        feeds: '3-4 voedingen',
        amount: '180-240 ml per voeding',
        interval: 'Om de 4-6 uur',
        examples: ['07:00 - 200ml', '12:00 - 200ml', '18:00 - 200ml', '22:00 - 200ml'],
      },
      '4-feeds': {
        feeds: '4 voedingen',
        amount: '180-220 ml per voeding',
        interval: 'Om de 6 uur',
        examples: ['07:00 - 200ml', '13:00 - 200ml', '19:00 - 200ml', '01:00 - 200ml'],
      },
      '5-feeds': {
        feeds: '5 voedingen',
        amount: '150-180 ml per voeding',
        interval: 'Om de 4-5 uur',
        examples: ['07:00 - 165ml', '11:00 - 165ml', '15:00 - 165ml', '19:00 - 165ml', '23:00 - 165ml'],
      },
      '6-feeds': {
        feeds: '6 voedingen',
        amount: '130-160 ml per voeding',
        interval: 'Om de 4 uur',
        examples: ['07:00 - 145ml', '11:00 - 145ml', '15:00 - 145ml', '19:00 - 145ml', '23:00 - 145ml', '03:00 - 145ml'],
      },
      '7-feeds': {
        feeds: '7 voedingen',
        amount: '110-140 ml per voeding',
        interval: 'Om de 3-4 uur',
        examples: ['07:00 - 125ml', '10:00 - 125ml', '13:00 - 125ml', '16:00 - 125ml', '19:00 - 125ml', '22:00 - 125ml', '01:00 - 125ml'],
      },
      '8-feeds': {
        feeds: '8 voedingen',
        amount: '100-120 ml per voeding',
        interval: 'Om de 3 uur',
        examples: ['07:00 - 110ml', '10:00 - 110ml', '13:00 - 110ml', '16:00 - 110ml', '19:00 - 110ml', '22:00 - 110ml', '01:00 - 110ml', '04:00 - 110ml'],
      },
      milestones: ['Vast voedsel als hoofdmaaltijd', 'Eigen lepel proberen', 'Variatie in smaak'],
      nextPhase: 'Overgang naar gewone melk en zelfstandig eten.'
    },
    '12m+': {
      default: {
        feeds: '2-3 voedingen',
        amount: '200-250 ml per voeding',
        interval: 'Bij hoofdmaaltijden',
        examples: ['07:00 - 220ml', '12:00 - 220ml', '19:00 - 220ml'],
      },
      '4-feeds': {
        feeds: '4 voedingen',
        amount: '180-220 ml per voeding',
        interval: 'Om de 6 uur',
        examples: ['07:00 - 200ml', '13:00 - 200ml', '19:00 - 200ml', '01:00 - 200ml'],
      },
      '5-feeds': {
        feeds: '5 voedingen',
        amount: '150-180 ml per voeding',
        interval: 'Om de 4-5 uur',
        examples: ['07:00 - 165ml', '11:00 - 165ml', '15:00 - 165ml', '19:00 - 165ml', '23:00 - 165ml'],
      },
      '6-feeds': {
        feeds: '6 voedingen',
        amount: '130-160 ml per voeding',
        interval: 'Om de 4 uur',
        examples: ['07:00 - 145ml', '11:00 - 145ml', '15:00 - 145ml', '19:00 - 145ml', '23:00 - 145ml', '03:00 - 145ml'],
      },
      '7-feeds': {
        feeds: '7 voedingen',
        amount: '110-140 ml per voeding',
        interval: 'Om de 3-4 uur',
        examples: ['07:00 - 125ml', '10:00 - 125ml', '13:00 - 125ml', '16:00 - 125ml', '19:00 - 125ml', '22:00 - 125ml', '01:00 - 125ml'],
      },
      '8-feeds': {
        feeds: '8 voedingen',
        amount: '100-120 ml per voeding',
        interval: 'Om de 3 uur',
        examples: ['07:00 - 110ml', '10:00 - 110ml', '13:00 - 110ml', '16:00 - 110ml', '19:00 - 110ml', '22:00 - 110ml', '01:00 - 110ml', '04:00 - 110ml'],
      },
      milestones: ['Zelfstandig eten', 'Gevarieerd dieet', 'Gewone melk mogelijk'],
      nextPhase: 'Volledige overgang naar gevarieerd dieet en gewone melk.'
    }
  }

  const currentAgeSchema = schemas[selectedAge]
  const currentSchema = currentAgeSchema[feedingFrequency] || currentAgeSchema.default

  const downloadPDF = () => {
    const doc = new jsPDF()
    const ageGroupName = ageGroups.find(g => g.id === selectedAge)?.name
    const primaryColor = [16, 148, 174] // Website primary color
    const lightGray = [107, 114, 128] // gray-500
    const darkGray = [55, 65, 81] // gray-700
    
    let yPosition = 20
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const contentWidth = pageWidth - (margin * 2)
    
    // Header with gradient background effect
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.rect(0, 0, pageWidth, 40, 'F')
    
    // Title
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('FLESVOEDING SCHEMA', pageWidth/2, 15, { align: 'center' })
    
    // Subtitle with age group
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text(ageGroupName, pageWidth/2, 25, { align: 'center' })
    
    // Website logo/name
    doc.setFontSize(10)
    doc.text('FlesvoedingCalculator.nl', pageWidth/2, 35, { align: 'center' })
    
    yPosition = 55
    
    // Schema Overview Section
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Schema Overzicht', margin, yPosition)
    yPosition += 15
    
    // Add light background for info boxes
    doc.setFillColor(248, 250, 252) // bg-gray-50
    doc.rect(margin, yPosition - 5, contentWidth, 30, 'F')
    
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Aantal voedingen:', margin + 5, yPosition + 5)
    doc.setFont('helvetica', 'normal')
    doc.text(currentSchema.feeds, margin + 60, yPosition + 5)
    
    doc.setFont('helvetica', 'bold')
    doc.text('Hoeveelheid:', margin + 5, yPosition + 15)
    doc.setFont('helvetica', 'normal')
    doc.text(currentSchema.amount, margin + 60, yPosition + 15)
    
    doc.setFont('helvetica', 'bold')
    doc.text('Interval:', margin + 5, yPosition + 25)
    doc.setFont('helvetica', 'normal')
    doc.text(currentSchema.interval, margin + 60, yPosition + 25)
    
    yPosition += 45
    
    // Feeding Schedule Section
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Voedingsschema', margin, yPosition)
    yPosition += 8
    
    // Schedule table
    currentSchema.examples.forEach((example, index) => {
      const [time, amount] = example.split(' - ')
      
      // Alternating row colors
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252) // Light gray for even rows
        doc.rect(margin, yPosition - 3, contentWidth, 10, 'F')
      }
      
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text(time, margin + 5, yPosition + 3)
      doc.setFont('helvetica', 'bold')
      doc.text(amount, margin + 40, yPosition + 3)
      
      yPosition += 10
    })
    
    yPosition += 8
    
    // Development Milestones Section
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Ontwikkelingsmijlpalen', margin, yPosition)
    yPosition += 10
    
    currentAgeSchema.milestones.forEach((milestone) => {
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      
      // Add bullet point
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.circle(margin + 3, yPosition - 1, 1, 'F')
      
      // Wrap text if too long
      const splitText = doc.splitTextToSize(milestone, contentWidth - 15)
      doc.text(splitText, margin + 8, yPosition)
      yPosition += splitText.length * 5 + 3
    })
    
    yPosition += 8
    
    // Next Phase Section
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Volgende Fase', margin, yPosition)
    yPosition += 10
    
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    const splitNextPhase = doc.splitTextToSize(currentAgeSchema.nextPhase, contentWidth)
    doc.text(splitNextPhase, margin, yPosition)
    yPosition += splitNextPhase.length * 5 + 10
    
    // Footer
    const footerY = doc.internal.pageSize.height - 20
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.rect(0, footerY - 5, pageWidth, 25, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('FlesvoedingCalculator.nl - Betrouwbare informatie voor flesvoeding', pageWidth/2, footerY + 5, { align: 'center' })
    doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, pageWidth/2, footerY + 12, { align: 'center' })
    
    // Save the PDF
    doc.save(`voedingsschema-${selectedAge}-${feedingFrequency}.pdf`)
  }

  const addToCalendar = () => {
    const ageGroupName = ageGroups.find(g => g.id === selectedAge)?.name
    
    // Create individual calendar events for each feeding time
    currentSchema.examples.forEach((example, index) => {
      const [time, amount] = example.split(' - ')
      const title = `Flesvoeding - ${amount}`
      const description = `Voedingsschema: ${ageGroupName}\\n\\nHoeveelheid: ${amount}\\nTotaal aantal voedingen: ${currentSchema.feeds}\\nInterval: ${currentSchema.interval}\\n\\nBron: FlesvoedingCalculator.nl`
      
      // Create a date for today with the feeding time
      const now = new Date()
      const [hours, minutes] = time.split(':').map(Number)
      const feedingDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
      
      // Format for Google Calendar (YYYYMMDDTHHMMSSZ)
      const startTime = feedingDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      const endTime = new Date(feedingDate.getTime() + 30 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      
      // Create calendar URL with daily recurrence for each feeding time
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}&recur=RRULE:FREQ=DAILY;INTERVAL=1`
      
      // Small delay between opening multiple calendar tabs
      setTimeout(() => {
        window.open(calendarUrl, '_blank')
      }, index * 500) // 500ms delay between each
    })
    
    // Show user notification
    alert(`${currentSchema.examples.length} voedingsmomenten worden toegevoegd aan je agenda. Elk voedingsmoment wordt dagelijks herhaald.`)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-primary" />
            Voedingsschema&apos;s
          </h1>
          <p className="text-gray-600">
            Ontdek de juiste voedingsschema&apos;s per leeftijdsgroep. Inclusief hoeveelheden, tijden en ontwikkelingsmijlpalen.
          </p>
        </div>

        {/* Age Tabs */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {ageGroups.map((group) => {
              const Icon = group.icon
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedAge(group.id)}
                  className={`p-3 rounded-xl transition-all text-center ${
                    selectedAge === group.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-default'
                  }`}
                >
                  <div className="mb-2">
                    <Icon className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-sm font-medium">{group.name}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Feeding Frequency Dropdown */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aantal voedingen per dag
          </label>
          <div className="relative max-w-[370px]">
            <select
              value={feedingFrequency}
              onChange={(e) => setFeedingFrequency(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all outline-none appearance-none bg-white text-gray-800"
            >
              {feedingOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
          </div>
        </div>

        {/* Schema Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schema Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="font-medium text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Schema Overzicht
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-default rounded-xl p-4">
                  <div className="font-medium text-primary">Aantal voedingen</div>
                  <div className="text-gray-700">{currentSchema.feeds}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-medium text-gray-800">Hoeveelheid</div>
                  <div className="text-gray-700">{currentSchema.amount}</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="font-medium text-gray-800">Interval</div>
                  <div className="text-gray-700">{currentSchema.interval}</div>
                </div>
              </div>

              <h3 className="font-medium text-gray-800 mb-3">Voorbeeldtijden</h3>
              <div className="space-y-2">
                {currentSchema.examples.map((example, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{example.split(' - ')[0]}</span>
                    <span className="font-medium text-gray-800">{example.split(' - ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Milestones */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="font-medium text-gray-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Ontwikkelingsmijlpalen
              </h2>
              <div className="space-y-2">
                {currentAgeSchema.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Phase */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <ArrowRight className="w-5 h-5 mr-2 text-primary" />
                Volgende Fase
              </h3>
              <p className="text-sm text-gray-600">{currentAgeSchema.nextPhase}</p>
            </div>

            {/* Download Options */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <Download className="w-5 h-5 mr-2 text-primary" />
                Downloads
              </h3>
              <button
                onClick={downloadPDF}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Quick Calculator */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-primary" />
                Snelle Berekening
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Wil je een persoonlijk schema? Gebruik de calculator!
              </p>
              <Link 
                href="/"
                className="block w-full bg-default hover:bg-gray-200 text-primary font-medium py-2 px-4 rounded-lg transition-colors text-center"
              >
                Naar Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}