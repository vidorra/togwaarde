import Image from 'next/image'
import GoogleAdSlot from './GoogleAdSlot'

const KennisbankSidebar = ({ 
  images = [
    {
      src: "/mother_and_baby.webp",
      alt: "Flesvoeding informatie",
      caption: "Praktische flesvoeding tips"
    },
    {
      src: "/baby_feeding.png", 
      alt: "Baby voeding",
      caption: "Professionele voeding begeleiding"
    }
  ],
  adTopics = ["Flesvoeding Producten", "Baby Verzorging"]
}) => {
  
  // Create dynamic content array: image → ad → image → ad → remaining images
  const createDynamicContent = () => {
    const content = []
    const adTopicsToUse = [...adTopics]
    
    // Add first image if available
    if (images[0]) {
      content.push({ type: 'image', data: images[0], key: 'image-0' })
    }
    
    // Add first ad if available
    if (adTopicsToUse[0]) {
      content.push({ 
        type: 'ad', 
        data: { topic: adTopicsToUse[0], slot: '320x250' }, 
        key: 'ad-0' 
      })
    }
    
    // Add second image if available
    if (images[1]) {
      content.push({ type: 'image', data: images[1], key: 'image-1' })
    }
    
    // Add second ad if available
    if (adTopicsToUse[1]) {
      content.push({ 
        type: 'ad', 
        data: { topic: adTopicsToUse[1], slot: '320x250' }, 
        key: 'ad-1' 
      })
    }
    
    // Add remaining images if any (3rd, 4th, etc.)
    for (let i = 2; i < images.length; i++) {
      content.push({ type: 'image', data: images[i], key: `image-${i}` })
    }
    
    // Add additional ads if we have more ad topics than the first 2
    for (let i = 2; i < adTopicsToUse.length; i++) {
      content.push({ 
        type: 'ad', 
        data: { topic: adTopicsToUse[i], slot: '320x250' }, 
        key: `ad-${i}` 
      })
    }
    
    return content
  }

  const dynamicContent = createDynamicContent()

  return (
    <div className="col-span-12 lg:col-span-5 space-y-6">
      {/* Dynamic Content - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block space-y-6">
        {dynamicContent.map((item) => {
          if (item.type === 'image') {
            return (
              <div key={item.key} className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-4">
                <Image
                  src={item.data.src}
                  alt={item.data.alt}
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-xl"
                  priority={false}
                />
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {item.data.caption}
                </p>
              </div>
            )
          } else if (item.type === 'ad') {
            return (
              <GoogleAdSlot 
                key={item.key}
                slot={item.key === 'ad-0' ? '5691109362' : '5863882645'} // Use real ad slot IDs
                topic={item.data.topic}
              />
            )
          }
          return null
        })}
      </div>

      {/* Mobile Ads - Visible only on mobile */}
      <div className="lg:hidden space-y-6">
        <GoogleAdSlot 
          slot="5691109362" 
          topic={adTopics[0] || "Flesvoeding Producten"}
        />
        
        <GoogleAdSlot 
          slot="5863882645" 
          topic={adTopics[1] || "Baby Verzorging"}
        />
      </div>
    </div>
  )
}

export default KennisbankSidebar