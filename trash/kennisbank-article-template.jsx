import Layout from '../../../components/Layout'
import Link from 'next/link'
import KennisbankSidebar from '../../../components/KennisbankSidebar'
import { /* Import relevant Lucide icons */ } from 'lucide-react'

export const metadata = {
  title: 'Article Title: Complete Nederlandse Gids 2025',
  description: 'Brief description of what this article covers, including key benefits and target audience.',
}

export default function ArticleNamePage() {
  // Sidebar configuration - 2-3 relevant images
  const sidebarImages = [
    {
      src: "/relevant-image-1.png",
      alt: "Descriptive alt text for accessibility",
      caption: "Helpful caption explaining the image"
    },
    {
      src: "/relevant-image-2.png", 
      alt: "Another descriptive alt text",
      caption: "Another helpful caption"
    },
    {
      src: "/relevant-image-3.png",
      alt: "Third descriptive alt text", 
      caption: "Third helpful caption"
    }
  ]

  // Ad targeting keywords
  const adTopics = ["Keyword 1", "Keyword 2", "Keyword 3"]

  // Example data arrays - customize as needed
  const exampleList = [
    "Item 1 with relevant information",
    "Item 2 with helpful details", 
    "Item 3 with important points"
  ]

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <div className="space-y-6">
            
            {/* Header - ALWAYS outside of card containers */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Category • Subcategory</div>
              <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
                <IconName className="w-6 h-6 mr-3 text-primary" />
                Article Title: Clear and Descriptive Heading
              </h1>
              <p className="text-gray-500 leading-relaxed">
                Brief introduction paragraph explaining what readers will learn. Keep lighter than body text.
              </p>
            </div>

            {/* Introduction Section - REQUIRED */}
            <section className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-primary mb-4">Inleiding</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Detailed introduction explaining the article's purpose, scope, and what parents will gain from reading.
                Use text-gray-600 for body text to maintain proper hierarchy.
              </p>
            </section>

            {/* Main Content Section 1 */}
            <section className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-primary mb-4">Main Section Title</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Section content with proper text hierarchy. Always use text-gray-600 for body paragraphs.
              </p>
              
              {/* Grid layout - NO card-within-card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-primary mb-3">Subsection Title:</h3>
                  <ul className="space-y-2">
                    {exampleList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-primary mb-3">Another Subsection:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Use icons for different list types</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Maintain consistent spacing and colors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section with Visual Separator - Alternative to card-within-card */}
            <section className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-primary mb-4">Section with Subsections</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Main section content goes here first.
              </p>
              
              {/* Use border-t separator instead of nested cards */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-primary mb-4">Subsection Title</h3>
                <p className="text-gray-600 mb-4">Subsection content with proper spacing.</p>
                
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">List item with proper bullet</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Warning/Alert Section - ONLY approved colored section */}
            <section className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Let op</h3>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Important warning or note that requires special attention. Only use amber colors for warnings.
                  </p>
                </div>
              </div>
            </section>

            {/* Table Example - if needed */}
            <section className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-primary mb-4">Reference Table</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-medium text-primary">Column 1</th>
                      <th className="text-left py-3 px-2 font-medium text-primary">Column 2</th>
                      <th className="text-left py-3 px-2 font-medium text-primary">Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 font-medium text-primary">Row Header</td>
                      <td className="py-3 px-2 text-gray-700">Data 1</td>
                      <td className="py-3 px-2 text-gray-700">Data 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ Section Example */}
            <section className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-primary mb-4">Veelgestelde Vragen</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Q: Commonly asked question?</h3>
                  <p className="text-gray-600 text-sm">A: Clear, helpful answer with proper text hierarchy.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Q: Another important question?</h3>
                  <p className="text-gray-600 text-sm">A: Another clear answer maintaining consistency.</p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 text-sm text-center">
                Brief concluding statement summarizing the key takeaways and encouraging parents.
              </p>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <div className="text-center">
                <Link 
                  href="/calculator"
                  className="inline-flex items-center px-6 py-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors"
                >
                  <div className="text-center">
                    <div className="font-medium text-primary">Relevant CTA Message →</div>
                    <div className="text-sm text-gray-600">Helpful description of what the CTA offers</div>
                  </div>
                </Link>
              </div>
            </section>

            {/* Related Articles - APPROVED card-within-card exception */}
            <section className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Gerelateerde artikelen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/kennisbank/related-article-1" className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors">
                  <div className="font-medium text-primary">Related Article 1 →</div>
                  <div className="text-sm text-gray-600">Brief description</div>
                </Link>
                <Link href="/kennisbank/related-article-2" className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors">
                  <div className="font-medium text-primary">Related Article 2 →</div>
                  <div className="text-sm text-gray-600">Brief description</div>
                </Link>
                <Link href="/kennisbank/related-article-3" className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors">
                  <div className="font-medium text-primary">Related Article 3 →</div>
                  <div className="text-sm text-gray-600">Brief description</div>
                </Link>
                <Link href="/kennisbank/related-article-4" className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors">
                  <div className="font-medium text-primary">Related Article 4 →</div>
                  <div className="text-sm text-gray-600">Brief description</div>
                </Link>
              </div>
            </section>

          </div>
        </div>
        
        <KennisbankSidebar images={sidebarImages} adTopics={adTopics} />
      </div>
    </Layout>
  )
}

/* 
TEMPLATE USAGE NOTES:

✅ REQUIRED ELEMENTS:
- Layout wrapper component
- Proper breadcrumb with text-gray-500
- H1 with icon and text-primary
- Intro text with text-gray-500 (lighter than body)
- KennisbankSidebar with proper configuration
- Related articles section with bg-gray-50 cards

✅ COLOR HIERARCHY:
- Breadcrumbs: text-gray-500
- H1 title: text-primary
- Intro paragraph: text-gray-500
- Body paragraphs: text-gray-600
- H2 headings: text-primary
- H3 headings: text-primary
- List text: text-gray-700
- Table headers: text-primary
- Table data: text-gray-700

✅ BULLET POINTS:
- Always use: <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
- Never use gray bullets or UTF-8 symbols

✅ LAYOUT PATTERNS:
- Use grid layouts instead of nested cards
- Use border-t separators for subsections
- Only exception: related articles with bg-gray-50

❌ FORBIDDEN:
- UTF-8 icons/emojis
- Red, green, or colored text/backgrounds (except amber for warnings)
- Card-within-card patterns (except related articles)
- Text larger than text-2xl for H1
- Missing breadcrumbs
- Gray bullet points

*/