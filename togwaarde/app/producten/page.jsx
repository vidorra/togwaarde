'use client'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { ShoppingBag, Star, Award, Shield, ExternalLink, Thermometer } from 'lucide-react'

// Nederlandse product database
const productDatabase = [
  {
    id: 1,
    merk: "HEMA",
    naam: "Basis Slaapzak",
    TOG: 0.5,
    prijs: 19.99,
    seizoen: "zomer",
    getest: true,
    material: "Katoen",
    rating: 4.5,
    reviews: 127,
    sizes: ["50-70", "70-90", "90-110"]
  },
  {
    id: 2,
    merk: "Jollein",
    naam: "4-Seizoenen Slaapzak",
    TOG: 1.0,
    prijs: 42.95,
    seizoen: "mild",
    getest: true,
    material: "Jersey",
    rating: 4.8,
    reviews: 243,
    sizes: ["50-70", "70-90", "90-110"]
  },
  {
    id: 3,
    merk: "Puckababy",
    naam: "The Bag Newborn",
    TOG: 1.5,
    prijs: 59.95,
    seizoen: "herfst",
    getest: true,
    material: "Bamboe/Tencel",
    rating: 4.9,
    reviews: 189,
    sizes: ["50-68", "68-86"]
  },
  {
    id: 4,
    merk: "HEMA",
    naam: "Winter Slaapzak",
    TOG: 2.5,
    prijs: 34.99,
    seizoen: "winter",
    getest: true,
    material: "Katoen gevoerd",
    rating: 4.6,
    reviews: 98,
    sizes: ["50-70", "70-90", "90-110"]
  },
  {
    id: 5,
    merk: "Lodger",
    naam: "Hopper Empire",
    TOG: 2.5,
    prijs: 54.95,
    seizoen: "winter",
    getest: false,
    material: "Fleece",
    rating: 4.4,
    reviews: 76,
    sizes: ["50-68", "68-86", "86-104"]
  },
  {
    id: 6,
    merk: "VanZus",
    naam: "Bamboe Slaapzak",
    TOG: 0.5,
    prijs: 39.95,
    seizoen: "zomer",
    getest: false,
    material: "Bamboe",
    rating: 4.7,
    reviews: 54,
    sizes: ["50-70", "70-90"]
  },
  {
    id: 7,
    merk: "Jollein",
    naam: "Winter Slaapzak",
    TOG: 3.5,
    prijs: 69.95,
    seizoen: "winter",
    getest: true,
    material: "Gewatteerd",
    rating: 4.8,
    reviews: 134,
    sizes: ["50-70", "70-90", "90-110"]
  },
  {
    id: 8,
    merk: "Prenatal",
    naam: "Basic Slaapzak",
    TOG: 1.5,
    prijs: 24.99,
    seizoen: "herfst",
    getest: false,
    material: "Katoen",
    rating: 4.3,
    reviews: 211,
    sizes: ["50-70", "70-90"]
  }
]

export default function ProductenPage() {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : i < rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Aanbevolen Slaapzakken
          </h1>
          <p className="text-lg text-gray-600">
            Ontdek de beste slaapzakken voor veilige babyslaap,
            geselecteerd op basis van TOG waarde en kwaliteit
          </p>
        </div>

        {/* Filter by TOG */}
        <div className="mb-8">
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Thermometer className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Filter op TOG Waarde</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Alle', '0.5', '1.0', '1.5', '2.5', '3.5'].map((tog) => (
                <button
                  key={tog}
                  className="px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  {tog === 'Alle' ? 'Alle TOG' : `TOG ${tog}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productDatabase.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
              >
                {/* Product Image Placeholder */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-primary/30" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{product.merk}</h3>
                      <p className="text-sm text-gray-600">{product.naam}</p>
                    </div>
                    {product.getest && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <Shield className="w-3 h-3" />
                        Getest
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500 ml-1">
                      {product.reviews} reviews
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">TOG Waarde:</span>
                      <span className="font-semibold text-primary">{product.TOG}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Materiaal:</span>
                      <span className="font-medium text-gray-900">{product.material}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Seizoen:</span>
                      <span className="font-medium text-gray-900 capitalize">{product.seizoen}</span>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Beschikbare maten:</p>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-primary">€{product.prijs}</div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors">
                      Bekijk
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Hoe Kiezen We Onze Producten?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Voldoen aan Europese veiligheidsnormen (CE-markering)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Betrouwbare TOG classificatie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Positieve reviews van Nederlandse ouders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Verkrijgbaar bij betrouwbare Nederlandse retailers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 text-white">Twijfel Over de Juiste TOG?</h3>
            <p className="text-lg mb-6 opacity-90">
              Gebruik onze calculator om de perfecte TOG waarde te bepalen
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              <Thermometer className="w-5 h-5 mr-2" />
              Bereken Jouw TOG Waarde
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
