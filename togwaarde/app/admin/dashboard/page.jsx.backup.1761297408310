'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../../components/Layout'
import { Settings, Link, Plus, Eye, X, Edit, Trash2, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react'

export default function SimpleAdminDashboard() {
  const [snippets, setSnippets] = useState([])
  const [pages, setPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(null)
  const [pageSnippets, setPageSnippets] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' or 'assignment'
  const [loadError, setLoadError] = useState(null)
  const [debugInfo, setDebugInfo] = useState('Not started')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSnippet, setNewSnippet] = useState({
    platform: 'bol',
    name: '',
    url: '',
    code: '',
    tag: '',
    price: null,
    originalPrice: null,
    currency: 'EUR'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isSyncingSnippet, setIsSyncingSnippet] = useState(false)
  const [syncProgress, setSyncProgress] = useState('')
  const [syncAlert, setSyncAlert] = useState(null) // { type: 'success' | 'error', message: '', details: [] }
  const [editingSnippet, setEditingSnippet] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [showOnlyPrice, setShowOnlyPrice] = useState(false) // Control visibility of elements
  const [isExtractingImage, setIsExtractingImage] = useState(false) // For Bol.com image extraction
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated')
    const session = localStorage.getItem('admin_session')
    
    if (!isAuth || !session) {
      router.push('/admin')
      return
    }
    
    // Check if session is expired (24 hours)
    const sessionTime = parseInt(session)
    const now = Date.now()
    const twentyFourHours = 24 * 60 * 60 * 1000
    
    if (now - sessionTime > twentyFourHours) {
      localStorage.removeItem('admin_authenticated')
      localStorage.removeItem('admin_session')
      router.push('/admin')
      return
    }
    
    setIsAuthenticated(true)
    // Add a small delay to ensure the API routes are ready
    setTimeout(() => {
      loadData()
    }, 500)
  }, [router])

  const loadData = async (manualRetry = false) => {
    if (manualRetry) {
      setLoading(true)
      setLoadError(null)
    }
    
    try {
      console.log('Loading data from admin APIs')
      setDebugInfo('Starting API calls...')
      setLoadError(null)
      
      // Load snippets
      console.log('Loading snippets from /api/admin-snippets/')
      try {
        const snippetsResponse = await fetch(`/api/admin-snippets/?t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache'
        })
        console.log('Snippets response status:', snippetsResponse.status)
        console.log('Snippets response headers:', [...snippetsResponse.headers.entries()])
        
        if (snippetsResponse.ok) {
          const snippetsData = await snippetsResponse.json()
          console.log('Snippets data received:', snippetsData)
          console.log('Number of snippets:', snippetsData.snippets?.length || 0)
          setSnippets(snippetsData.snippets || [])
          setDebugInfo(`✅ Loaded ${snippetsData.snippets?.length || 0} snippets`)
          console.log('✅ Snippets state updated successfully')
        } else {
          const errorText = await snippetsResponse.text()
          console.error('❌ Failed to load snippets. Status:', snippetsResponse.status, 'Error:', errorText)
          setLoadError(`Failed to load snippets: ${snippetsResponse.status}`)
        }
      } catch (snippetsError) {
        console.error('❌ Error fetching snippets:', snippetsError)
        setLoadError(`Network error loading snippets: ${snippetsError.message}`)
        setSnippets([])
      }

      // Load pages
      console.log('Loading pages from /api/admin-pages/')
      try {
        const pagesResponse = await fetch(`/api/admin-pages/?t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache'
        })
        console.log('Pages response status:', pagesResponse.status)
        
        if (pagesResponse.ok) {
          const pagesData = await pagesResponse.json()
          console.log('Pages data:', pagesData)
          setPages(pagesData.pages || [])
        } else {
          const errorText = await pagesResponse.text()
          console.error('Failed to load pages. Status:', pagesResponse.status, 'Error:', errorText)
          setLoadError(`Failed to load pages: ${pagesResponse.status}`)
        }
      } catch (pagesError) {
        console.error('Error fetching pages:', pagesError)
        setLoadError(`Network error loading pages: ${pagesError.message}`)
        setPages([])
      }

    } catch (error) {
      console.error('Failed to load data:', error)
      setLoadError(`General error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_session')
    router.push('/admin')
  }

  const loadPageSnippets = async (pageId) => {
    try {
      console.log('Loading admin assignments for page:', pageId)
      const response = await fetch(`/api/admin-page-snippets/?pageId=${pageId}`)
      if (response.ok) {
        const data = await response.json()
        console.log('Admin page snippets data:', data)
        setPageSnippets(data.assignments || [])
      } else {
        console.log('No snippet assignments found for page:', pageId)
        setPageSnippets([])
      }
    } catch (error) {
      console.error('Failed to load page snippet assignments:', error)
      setPageSnippets([])
    }
  }

  const handlePageSelect = (page) => {
    setSelectedPage(page)
    loadPageSnippets(page.id)
  }

  const generateSnippet = async () => {
    if (!newSnippet.url) {
      alert(`Please enter a ${newSnippet.platform === 'amazon' ? 'Amazon' : 'Bol.com'} URL`)
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/admin/generate-snippet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: newSnippet.url,
          type: newSnippet.platform
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Generated snippet data:', data)
        setNewSnippet(prev => ({
          ...prev,
          name: data.productName || prev.name,
          url: data.productUrl || data.affiliateUrl || prev.url,
          shortUrl: newSnippet.platform === 'amazon' ? newSnippet.url : prev.shortUrl,
          imageUrl: data.imageUrl || prev.imageUrl,
          code: data.html,
          price: data.price,
          originalPrice: data.originalPrice,
          currency: data.currency
        }))
      } else {
        const errorData = await response.json()
        alert(`Failed to generate ${newSnippet.platform} snippet: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error generating snippet:', error)
      alert('Error generating snippet: ' + error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  // Function to extract Bol.com image from snippet
  const extractBolImage = async (snippet) => {
    if (!snippet) return

    setIsExtractingImage(true)
    try {
      const response = await fetch('/api/admin/extract-bol-image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ snippet })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Extracted Bol.com image data:', data)
        
        // Update the newSnippet with extracted data
        setNewSnippet(prev => ({
          ...prev,
          name: data.title || prev.name,
          url: data.productUrl || prev.url,
          imageUrl: data.imageUrl || prev.imageUrl,
          imageHtml: data.imageHtml // Store the generated image HTML
        }))
        
        setSyncAlert({
          type: 'success',
          message: `✅ Image extracted successfully for: ${data.title}`,
          details: []
        })
      } else {
        const errorData = await response.json()
        setSyncAlert({
          type: 'error',
          message: `Failed to extract image: ${errorData.message}`,
          details: []
        })
      }
    } catch (error) {
      console.error('Error extracting Bol.com image:', error)
      setSyncAlert({
        type: 'error',
        message: `Error extracting image: ${error.message}`,
        details: []
      })
    } finally {
      setIsExtractingImage(false)
      // Auto-dismiss alert after 5 seconds for success
      setTimeout(() => {
        setSyncAlert(prev => prev?.type === 'success' ? null : prev)
      }, 5000)
    }
  }

  // Function to extract Bol.com image from snippet for edit form
  const extractBolImageForEdit = async (snippet) => {
    if (!snippet) return

    setIsExtractingImage(true)
    try {
      const response = await fetch('/api/admin/extract-bol-image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ snippet })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Extracted Bol.com image data for edit:', data)
        
        // Update the editFormData with extracted data
        setEditFormData(prev => ({
          ...prev,
          name: data.title || prev.name,
          url: data.productUrl || prev.url,
          imageUrl: data.imageUrl || prev.imageUrl,
          generatedHtml: data.imageHtml || prev.generatedHtml // Update the image HTML
        }))
        
        setSyncAlert({
          type: 'success',
          message: `✅ Image extracted successfully for: ${data.title}`,
          details: []
        })
      } else {
        const errorData = await response.json()
        setSyncAlert({
          type: 'error',
          message: `Failed to extract image: ${errorData.message}`,
          details: []
        })
      }
    } catch (error) {
      console.error('Error extracting Bol.com image:', error)
      setSyncAlert({
        type: 'error',
        message: `Error extracting image: ${error.message}`,
        details: []
      })
    } finally {
      setIsExtractingImage(false)
      // Auto-dismiss alert after 5 seconds for success
      setTimeout(() => {
        setSyncAlert(prev => prev?.type === 'success' ? null : prev)
      }, 5000)
    }
  }

  const saveNewSnippet = async () => {
    try {
      // Ensure imageUrl is extracted from imageHtml if not explicitly set
      let imageUrl = newSnippet.imageUrl;
      if (!imageUrl && newSnippet.imageHtml) {
        const imageMatch = newSnippet.imageHtml.match(/src=["'](.*?)["']/i);
        imageUrl = imageMatch ? imageMatch[1] : null;
      }

      const snippetData = {
        id: `${newSnippet.platform}-${Date.now()}`,
        name: newSnippet.name,
        type: newSnippet.platform,
        url: newSnippet.url,
        shortUrl: newSnippet.shortUrl || '',
        imageUrl: imageUrl || null, // Save extracted imageUrl
        tag: newSnippet.tag || null,
        generatedHtml: newSnippet.imageHtml || null, // Only use imageHtml (not Bol.com code)
        codeSnippet: newSnippet.platform === 'bol' ? newSnippet.code : null, // Store Bol.com snippet separately
        price: newSnippet.price,
        originalPrice: newSnippet.originalPrice,
        currency: newSnippet.currency || 'EUR',
        active: true
      }

      const response = await fetch('/api/admin-snippets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippetData)
      })

      if (response.ok) {
        // Refresh the snippets list
        loadData(true)
        // Reset form
        setNewSnippet({
          platform: 'bol',
          name: '',
          url: '',
          code: '',
          tag: '',
          price: null,
          originalPrice: null,
          currency: 'EUR'
        })
        setShowAddForm(false)
        alert('Snippet saved successfully!')
      } else {
        alert('Failed to save snippet')
      }
    } catch (error) {
      console.error('Error saving snippet:', error)
      alert('Error saving snippet: ' + error.message)
    }
  }

  const assignSnippetToPage = async (pageId, snippetId) => {
    try {
      const response = await fetch('/api/admin-page-snippets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageId, snippetId })
      })

      if (response.ok) {
        // Refresh page snippets
        loadPageSnippets(pageId)
        alert('Snippet assigned successfully!')
      } else {
        const errorData = await response.json()
        alert(`Failed to assign snippet: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error assigning snippet:', error)
      alert('Error assigning snippet: ' + error.message)
    }
  }

  const unassignSnippetFromPage = async (pageId, snippetId) => {
    try {
      const response = await fetch('/api/admin-page-snippets/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageId, snippetId })
      })

      if (response.ok) {
        // Refresh page snippets
        loadPageSnippets(pageId)
        alert('Snippet unassigned successfully!')
      } else {
        const errorData = await response.json()
        alert(`Failed to unassign snippet: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error unassigning snippet:', error)
      alert('Error unassigning snippet: ' + error.message)
    }
  }

  const toggleSnippetActive = async (snippetId, currentActive) => {
    try {
      const response = await fetch('/api/admin-snippets/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: snippetId, 
          active: !currentActive 
        })
      })

      if (response.ok) {
        // Refresh snippets
        loadData(true)
        alert(`Snippet ${!currentActive ? 'activated' : 'deactivated'} successfully!`)
      } else {
        const errorData = await response.json()
        alert(`Failed to update snippet: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error toggling snippet:', error)
      alert('Error toggling snippet: ' + error.message)
    }
  }

  const startEditSnippet = (snippet) => {
    setEditingSnippet(snippet.id)
    setEditFormData({
      name: snippet.name,
      url: snippet.url,
      shortUrl: snippet.shortUrl || '',
      imageUrl: snippet.imageUrl || '',
      tag: snippet.tag || '',
      generatedHtml: snippet.generatedHtml || '',
      codeSnippet: snippet.codeSnippet || '',
      price: snippet.price || '',
      originalPrice: snippet.originalPrice || ''
    })
  }

  const cancelEdit = () => {
    setEditingSnippet(null)
    setEditFormData({})
  }

  const saveEditSnippet = async (snippetId) => {
    try {
      const response = await fetch('/api/admin-snippets/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: snippetId,
          ...editFormData
        })
      })

      if (response.ok) {
        // Refresh snippets
        loadData(true)
        setEditingSnippet(null)
        setEditFormData({})
        alert('Snippet updated successfully!')
      } else {
        const errorData = await response.json()
        alert(`Failed to update snippet: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error updating snippet:', error)
      alert('Error updating snippet: ' + error.message)
    }
  }

  const deleteSnippet = async (snippetId, snippetName) => {
    if (!confirm(`Are you sure you want to delete "${snippetName}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch('/api/admin-snippets/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: snippetId })
      })

      if (response.ok) {
        // Refresh snippets
        loadData(true)
        setSyncAlert({
          type: 'success',
          message: 'Snippet deleted successfully!',
          details: []
        })
      } else {
        const errorData = await response.json()
        setSyncAlert({
          type: 'error',
          message: `Failed to delete snippet: ${errorData.message}`,
          details: []
        })
      }
    } catch (error) {
      console.error('Error deleting snippet:', error)
      setSyncAlert({
        type: 'error',
        message: `Error deleting snippet: ${error.message}`,
        details: []
      })
    }
  }

  const syncAllPrices = async () => {
    if (!confirm('This will update prices for all active snippets. This may take several minutes. Continue?')) {
      return
    }

    setIsSyncing(true)
    setSyncProgress('Starting price sync...')
    setSyncAlert(null) // Clear any previous alerts

    try {
      const response = await fetch('/api/admin-snippets/sync-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const result = await response.json()
        setSyncProgress(`Sync completed: ${result.stats.successful} successful, ${result.stats.errors} errors`)
        
        // Refresh the snippets list to show updated prices
        loadData(true)
        
        // Show detailed results in custom alert
        if (result.stats.errors > 0) {
          setSyncAlert({
            type: 'warning',
            message: `Price sync completed with some issues: ${result.stats.successful} successful, ${result.stats.errors} failed`,
            details: result.stats.errorDetails || []
          })
        } else {
          setSyncAlert({
            type: 'success',
            message: `🎉 Price sync completed successfully! ${result.stats.successful} snippets updated with current prices`,
            details: []
          })
        }
      } else {
        const errorData = await response.json()
        setSyncProgress('Sync failed')
        setSyncAlert({
          type: 'error',
          message: `Failed to sync prices: ${errorData.message}`,
          details: []
        })
      }
    } catch (error) {
      console.error('Error syncing prices:', error)
      setSyncProgress('Sync failed')
      setSyncAlert({
        type: 'error',
        message: `Error syncing prices: ${error.message}`,
        details: []
      })
    } finally {
      setIsSyncing(false)
      // Clear progress message after a delay
      setTimeout(() => setSyncProgress(''), 3000)
      // Auto-dismiss alert after 10 seconds for success, keep error alerts
      setTimeout(() => {
        setSyncAlert(prev => prev?.type === 'success' ? null : prev)
      }, 10000)
    }
  }

  // Sync individual snippet data and price
  const syncSnippetData = async (snippetId) => {
    const snippet = snippets.find(s => s.id === snippetId)
    if (!snippet || snippet.type !== 'amazon') {
      setSyncAlert({
        type: 'error',
        message: 'Can only sync Amazon snippets',
        details: []
      })
      return
    }

    const shortUrl = editFormData.shortUrl || snippet.shortUrl
    if (!shortUrl) {
      setSyncAlert({
        type: 'error',
        message: 'Short URL is required for syncing',
        details: []
      })
      return
    }

    setIsSyncingSnippet(true)
    setSyncAlert(null)

    try {
      // Use generate-snippet API to refetch data and price
      const response = await fetch('/api/admin/generate-snippet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: shortUrl,
          type: 'amazon'
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Synced snippet data:', data)
        
        // Update the edit form with new data
        setEditFormData(prev => ({
          ...prev,
          name: data.productName || prev.name,
          url: data.affiliateUrl || prev.url,
          imageUrl: data.imageUrl || prev.imageUrl,
          generatedHtml: data.html || prev.generatedHtml,
          price: data.price || prev.price,
          originalPrice: data.originalPrice || prev.originalPrice
        }))

        setSyncAlert({
          type: 'success',
          message: 'Snippet data and price synced successfully!',
          details: []
        })
      } else {
        const errorData = await response.json()
        setSyncAlert({
          type: 'error',
          message: `Failed to sync snippet: ${errorData.message}`,
          details: []
        })
      }
    } catch (error) {
      console.error('Error syncing snippet:', error)
      setSyncAlert({
        type: 'error',
        message: `Error syncing snippet: ${error.message}`,
        details: []
      })
    } finally {
      setIsSyncingSnippet(false)
      // Auto-dismiss alert after 5 seconds for success
      setTimeout(() => {
        setSyncAlert(prev => prev?.type === 'success' ? null : prev)
      }, 5000)
    }
  }

  if (!isAuthenticated || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">{loading ? 'Loading...' : 'Redirecting...'}</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-primary" />
              Affiliate Management System
            </h1>
            <p className="text-gray-600 mt-2">
              Manage affiliate links and page assignments
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Error Banner */}
        {loadError && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Failed to load data</h3>
                  <div className="mt-1 text-sm text-red-700">
                    {loadError}
                  </div>
                </div>
              </div>
              <button
                onClick={() => loadData(true)}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
                disabled={loading}
              >
                {loading ? 'Retrying...' : 'Retry'}
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview & Snippets
            </button>
            <button
              onClick={() => setActiveTab('assignment')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assignment'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Page Assignment
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* View Controls */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">View Options</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showOnlyPrice}
                      onChange={(e) => setShowOnlyPrice(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600">Show only price info</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <Link className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{snippets.length}</h3>
                    <p className="text-gray-600">Total Snippets</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <Eye className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{snippets.filter(s => s.active).length}</h3>
                    <p className="text-gray-600">Active Snippets</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <Settings className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{pages.length}</h3>
                    <p className="text-gray-600">Available Pages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sync Alert */}
            {syncAlert && (
              <div className={`mb-6 rounded-lg p-4 border ${
                syncAlert.type === 'success' ? 'bg-green-50 border-green-200' :
                syncAlert.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {syncAlert.type === 'success' && (
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {syncAlert.type === 'warning' && (
                        <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {syncAlert.type === 'error' && (
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className={`text-sm font-medium ${
                        syncAlert.type === 'success' ? 'text-green-800' :
                        syncAlert.type === 'warning' ? 'text-amber-800' :
                        'text-red-800'
                      }`}>
                        {syncAlert.type === 'success' ? 'Success' :
                         syncAlert.type === 'warning' ? 'Partial Success' :
                         'Error'}
                      </h3>
                      <div className={`mt-1 text-sm ${
                        syncAlert.type === 'success' ? 'text-green-700' :
                        syncAlert.type === 'warning' ? 'text-amber-700' :
                        'text-red-700'
                      }`}>
                        {syncAlert.message}
                      </div>
                      {syncAlert.details && syncAlert.details.length > 0 && (
                        <details className="mt-2">
                          <summary className={`cursor-pointer text-sm font-medium ${
                            syncAlert.type === 'success' ? 'text-green-800' :
                            syncAlert.type === 'warning' ? 'text-amber-800' :
                            'text-red-800'
                          }`}>
                            Show Details ({syncAlert.details.length} items)
                          </summary>
                          <div className="mt-2 space-y-1">
                            {syncAlert.details.slice(0, 10).map((detail, index) => (
                              <div key={index} className={`text-xs p-2 rounded border-l-2 ${
                                syncAlert.type === 'success' ? 'bg-green-100 border-green-300 text-green-700' :
                                syncAlert.type === 'warning' ? 'bg-amber-100 border-amber-300 text-amber-700' :
                                'bg-red-100 border-red-300 text-red-700'
                              }`}>
                                {detail}
                              </div>
                            ))}
                            {syncAlert.details.length > 10 && (
                              <div className={`text-xs p-2 rounded ${
                                syncAlert.type === 'success' ? 'text-green-600' :
                                syncAlert.type === 'warning' ? 'text-amber-600' :
                                'text-red-600'
                              }`}>
                                ... and {syncAlert.details.length - 10} more
                              </div>
                            )}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSyncAlert(null)}
                    className={`flex-shrink-0 ml-4 p-1 rounded-md hover:bg-opacity-20 ${
                      syncAlert.type === 'success' ? 'text-green-500 hover:bg-green-600' :
                      syncAlert.type === 'warning' ? 'text-amber-500 hover:bg-amber-600' :
                      'text-red-500 hover:bg-red-600'
                    }`}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Snippets List */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Affiliate Snippets</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={syncAllPrices}
                    disabled={isSyncing || loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Prices'}</span>
                  </button>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Link</span>
                  </button>
                </div>
              </div>
              
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Debug:</strong> {debugInfo} | Snippets: {snippets.length} | Loading: {loading ? 'Yes' : 'No'}
                  {syncProgress && (
                    <span className="ml-4">
                      <strong>Price Sync:</strong> {syncProgress}
                    </span>
                  )}
                </p>
              </div>

              {/* Add New Snippet Form */}
              {showAddForm && (
                <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Add New Affiliate Link</h3>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Platform Radio Buttons */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="bol"
                          checked={newSnippet.platform === 'bol'}
                          onChange={(e) => setNewSnippet(prev => ({ ...prev, platform: e.target.value }))}
                          className="mr-2"
                        />
                        <span>Bol.com</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="amazon"
                          checked={newSnippet.platform === 'amazon'}
                          onChange={(e) => setNewSnippet(prev => ({ ...prev, platform: e.target.value }))}
                          className="mr-2"
                        />
                        <span>Amazon</span>
                      </label>
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      value={newSnippet.name}
                      onChange={(e) => setNewSnippet(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Conditional Fields Based on Platform */}
                  {newSnippet.platform === 'bol' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bol.com Code Snippet</label>
                      <div className="flex gap-2">
                        <textarea
                          value={newSnippet.code}
                          onChange={(e) => {
                            const value = e.target.value
                            setNewSnippet(prev => ({ ...prev, code: value }))
                            
                            // Auto-extract image if the snippet contains productId
                            if (value && value.includes('productId') && value.includes('bol_sitebar')) {
                              extractBolImage(value)
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                          placeholder="Paste your Bol.com affiliate code snippet here..."
                        />
                        <button
                          type="button"
                          onClick={() => extractBolImage(newSnippet.code)}
                          disabled={isExtractingImage || !newSnippet.code}
                          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 self-start"
                          title="Extract image from Bol.com snippet"
                        >
                          {isExtractingImage ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Extracting...
                            </>
                          ) : (
                            <>
                              📷 Extract Image
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {newSnippet.platform === 'amazon' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amazon Short Link</label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newSnippet.url}
                            onChange={(e) => setNewSnippet(prev => ({ ...prev, url: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="https://amzn.to/3Krcb8W"
                          />
                          <button
                            onClick={generateSnippet}
                            disabled={isGenerating || !newSnippet.url}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isGenerating ? 'Generating...' : 'Generate'}
                          </button>
                        </div>
                      </div>
                      
                      {newSnippet.code && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Generated HTML</label>
                          <textarea
                            value={newSnippet.code}
                            onChange={(e) => setNewSnippet(prev => ({ ...prev, code: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                            placeholder="Generated HTML will appear here..."
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Image HTML (auto-generated for Bol.com) */}
                  {newSnippet.platform === 'bol' && newSnippet.imageHtml && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Generated Image HTML</label>
                      <textarea
                        value={newSnippet.imageHtml}
                        onChange={(e) => setNewSnippet(prev => ({ ...prev, imageHtml: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
                        placeholder="Auto-generated image HTML will appear here..."
                      />
                    </div>
                  )}

                  {/* Tag (Optional) */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tag (Optional)</label>
                    <input
                      type="text"
                      value={newSnippet.tag}
                      onChange={(e) => setNewSnippet(prev => ({ ...prev, tag: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Aanbevolen, Budget, Beste prijs/kwaliteit"
                    />
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={saveNewSnippet}
                      disabled={!newSnippet.name || !newSnippet.code}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Snippet
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium mb-2">Loading affiliate snippets...</h3>
                  <p>Please wait while we fetch your data.</p>
                </div>
              ) : snippets.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Link className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No affiliate snippets yet</h3>
                  <p className="mb-4">Add your first one!</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add New Link
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {snippets.map((snippet) => (
                    <div key={snippet.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      {editingSnippet === snippet.id ? (
                        // Edit mode
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                              type="text"
                              value={editFormData.name}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                            <input
                              type="url"
                              value={editFormData.url}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, url: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          {(snippet.type === 'amazon' || snippet.type === 'amazon_image') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Short URL</label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={editFormData.shortUrl}
                                  onChange={(e) => setEditFormData(prev => ({ ...prev, shortUrl: e.target.value }))}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                  placeholder="https://amzn.to/..."
                                />
                                <button
                                  onClick={() => syncSnippetData(snippet.id)}
                                  disabled={isSyncingSnippet || !editFormData.shortUrl}
                                  className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                  title="Sync data and price"
                                >
                                  <RefreshCw className={`w-4 h-4 ${isSyncingSnippet ? 'animate-spin' : ''}`} />
                                  Sync
                                </button>
                              </div>
                            </div>
                          )}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tag (Optional)</label>
                            <input
                              type="text"
                              value={editFormData.tag}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, tag: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="e.g., Aanbevolen, Budget, Beste prijs/kwaliteit"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image HTML
                            </label>
                            <textarea
                              value={editFormData.generatedHtml}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, generatedHtml: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                              placeholder="Static HTML with image and link..."
                            />
                          </div>
                          {snippet.type !== 'amazon' && snippet.type !== 'amazon_image' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bol.com Code Snippet
                              </label>
                              <div className="flex gap-2">
                                <textarea
                                  value={editFormData.codeSnippet}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    setEditFormData(prev => ({ ...prev, codeSnippet: value }))
                                    
                                    // Auto-extract image if the snippet contains productId
                                    if (value && value.includes('productId') && value.includes('bol_sitebar')) {
                                      extractBolImageForEdit(value)
                                    }
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                                  placeholder="Paste your Bol.com JavaScript snippet here..."
                                />
                                <button
                                  type="button"
                                  onClick={() => extractBolImageForEdit(editFormData.codeSnippet)}
                                  disabled={isExtractingImage || !editFormData.codeSnippet}
                                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 self-start"
                                  title="Extract image from Bol.com snippet"
                                >
                                  {isExtractingImage ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                      Extracting...
                                    </>
                                  ) : (
                                    <>
                                      📷 Extract Image
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Current Price</label>
                              <input
                                type="text"
                                value={editFormData.price || ''}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, price: e.target.value || null }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="e.g., €24.99"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (if discounted)</label>
                              <input
                                type="text"
                                value={editFormData.originalPrice || ''}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, originalPrice: e.target.value || null }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="e.g., €29.99"
                              />
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => saveEditSnippet(snippet.id)}
                              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View mode
                        <div className="flex items-start justify-between">
                          <div className="flex flex-1">
                            {/* Product Image from imageUrl or extracted from HTML */}
                            {(() => {
                              // First try to use imageUrl if available
                              let imageUrl = snippet.imageUrl;

                              // If no imageUrl, try to extract from generatedHtml
                              if (!imageUrl && snippet.generatedHtml) {
                                const imageMatch = snippet.generatedHtml.match(/src=["'](.*?)["']/i);
                                imageUrl = imageMatch ? imageMatch[1] : null;
                              }

                              return imageUrl ? (
                                <div className="flex-shrink-0 mr-4">
                                  <img
                                    src={imageUrl}
                                    alt={snippet.name}
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                    style={{ display: 'block !important' }}
                                    onError={(e) => {
                                      // Show fallback instead of hiding completely
                                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0OEg4OFY4MEg0MFY0OFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTU2IDY0TDY0IDcyTDgwIDU2IiBzdHJva2U9IiM2QjczODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                                      e.target.style.display = 'block';
                                    }}
                                  />
                                </div>
                              ) : null;
                            })()}
                            
                            {/* Content section - takes remaining flex space */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-medium text-gray-900">{snippet.name}</h3>
                                {!showOnlyPrice && snippet.tag && (
                                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                                    {snippet.tag}
                                  </span>
                                )}
                                {!showOnlyPrice && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    snippet.type === 'amazon' 
                                      ? 'bg-orange-100 text-orange-700' 
                                      : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {snippet.type === 'amazon' ? 'Amazon' : 'Bol.com'}
                                  </span>
                                )}
                                {(snippet.price || snippet.originalPrice) && (
                                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                                    {snippet.originalPrice && snippet.price !== snippet.originalPrice 
                                      ? `${snippet.price} (was ${snippet.originalPrice})`
                                      : snippet.price || snippet.originalPrice
                                    }
                                  </span>
                                )}
                                {!showOnlyPrice && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    snippet.active 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {snippet.active ? 'Active' : 'Inactive'}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                {!showOnlyPrice && (
                                  <div>
                                    <strong>URL:</strong> {snippet.url}
                                  </div>
                                )}
                                {(snippet.price || snippet.originalPrice) && (
                                  <div>
                                    <strong>Price:</strong>{' '}
                                    {snippet.price && (
                                      <span className="text-green-600 font-medium">{snippet.price}</span>
                                    )}
                                    {snippet.originalPrice && snippet.originalPrice !== snippet.price && (
                                      <span className="text-gray-400 line-through ml-2">{snippet.originalPrice}</span>
                                    )}
                                    {!showOnlyPrice && snippet.priceLastUpdated && (
                                      <span className="text-xs text-gray-400 ml-2">
                                        (Updated: {new Date(snippet.priceLastUpdated).toLocaleDateString()})
                                      </span>
                                    )}
                                  </div>
                                )}
                                {!showOnlyPrice && (
                                  <div>
                                    <strong>Created:</strong> {new Date(snippet.createdAt).toLocaleDateString()}
                                  </div>
                                )}
                                {/* Snippet Preview */}
                                {snippet.generatedHtml && (
                                  <div className="mt-3">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Snippet Preview:</h4>
                                    <div className="p-3 bg-gray-50 rounded border">
                                      <div dangerouslySetInnerHTML={{ __html: snippet.generatedHtml }} />
                                    </div>
                                  </div>
                                )}
                                
                                {/* Code View - only show when not hiding details */}
                                {!showOnlyPrice && (snippet.generatedHtml || snippet.codeSnippet) && (
                                  <details className="mt-2">
                                    <summary className="cursor-pointer text-primary hover:text-primary/80">
                                      {snippet.type === 'bol' && snippet.codeSnippet ? 'View Bol.com Code Snippet' : 'View HTML code snippet'}
                                    </summary>
                                    <div className="mt-2 p-3 bg-gray-50 rounded border">
                                      <code className="text-xs text-gray-600 break-all">
                                        {snippet.type === 'bol' && snippet.codeSnippet ? snippet.codeSnippet : snippet.generatedHtml}
                                      </code>
                                    </div>
                                  </details>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {/* Toggle Active/Inactive */}
                            <button
                              onClick={() => toggleSnippetActive(snippet.id, snippet.active)}
                              className={`p-2 rounded-md transition-colors ${
                                snippet.active 
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}
                              title={snippet.active ? 'Deactivate' : 'Activate'}
                            >
                              {snippet.active ? (
                                <ToggleRight className="w-5 h-5" />
                              ) : (
                                <ToggleLeft className="w-5 h-5" />
                              )}
                            </button>
                            
                            {/* Edit Button */}
                            <button
                              onClick={() => startEditSnippet(snippet)}
                              className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                              title="Edit snippet"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            
                            {/* Delete Button */}
                            <button
                              onClick={() => deleteSnippet(snippet.id, snippet.name)}
                              className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                              title="Delete snippet"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'assignment' && (
          <div className="grid grid-cols-12 gap-6">
            {/* Left Panel - Pages */}
            <div className="col-span-4">
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Kennisbank Pages ({pages.length})
                </h2>
                {pages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No pages found.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {pages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => handlePageSelect(page)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedPage?.id === page.id
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <h3 className="font-medium text-sm">{page.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{page.path}</p>
                        <div className="text-xs text-gray-400 mt-1">
                          Snippets: {page.snippetCount}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Snippet Configuration */}
            <div className="col-span-8">
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
                {!selectedPage ? (
                  <div className="text-center py-12 text-gray-500">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Select a Page</h3>
                    <p>Choose a page from the left panel to manage its affiliate snippets</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{selectedPage.title}</h2>
                        <p className="text-sm text-gray-600">{selectedPage.path}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {pageSnippets.length} snippets assigned
                      </div>
                    </div>

                    {/* Current Page Snippets */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-3">Current Affiliate Snippets</h3>
                      {pageSnippets.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                          <Link className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No affiliate snippets assigned to this page</p>
                          <p className="text-sm">Add snippets from the available list below</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {pageSnippets.map((snippet, index) => (
                            <div key={snippet.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{snippet.snippet?.name || snippet.name}</h4>
                                  <p className="text-sm text-gray-600">{(snippet.snippet?.type || snippet.type) === 'amazon' || (snippet.snippet?.type || snippet.type) === 'amazon_image' ? 'Amazon' : 'Bol.com'} • {snippet.snippet?.tag || snippet.tag}</p>
                                  {((snippet.snippet?.price || snippet.price) || (snippet.snippet?.originalPrice || snippet.originalPrice)) && (
                                    <p className="text-xs text-gray-500">
                                      Price: {snippet.snippet?.price || snippet.price}
                                      {((snippet.snippet?.originalPrice || snippet.originalPrice) && (snippet.snippet?.originalPrice || snippet.originalPrice) !== (snippet.snippet?.price || snippet.price)) && (
                                        <span className="line-through ml-1">{snippet.snippet?.originalPrice || snippet.originalPrice}</span>
                                      )}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  (snippet.snippet?.active ?? snippet.active)
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {(snippet.snippet?.active ?? snippet.active) ? 'Active' : 'Inactive'}
                                </span>
                                <button
                                  onClick={() => unassignSnippetFromPage(selectedPage.id, snippet.snippet?.id || snippet.snippetId)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Unassign snippet"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Available Snippets to Add */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Available Snippets</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        These snippets are available to add to this page. Click a snippet to assign it.
                      </p>
                      {snippets.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
                          No snippets available
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                          {snippets.filter(snippet => 
                            !pageSnippets.some(ps => (ps.snippet?.id || ps.snippetId) === snippet.id)
                          ).map((snippet) => (
                            <button
                              key={snippet.id}
                              onClick={() => assignSnippetToPage(selectedPage.id, snippet.id)}
                              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 text-sm">{snippet.name}</h4>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      snippet.type === 'amazon' 
                                        ? 'bg-orange-100 text-orange-700' 
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                      {snippet.type === 'amazon' ? 'Amazon' : 'Bol.com'}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      snippet.active 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                      {snippet.active ? 'Active' : 'Inactive'}
                                    </span>
                                    {snippet.tag && (
                                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                        {snippet.tag}
                                      </span>
                                    )}
                                  </div>
                                  {(snippet.price || snippet.originalPrice) && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      <strong>Price:</strong> 
                                      {snippet.price && (
                                        <span className="text-green-600 font-medium ml-1">{snippet.price}</span>
                                      )}
                                      {snippet.originalPrice && snippet.originalPrice !== snippet.price && (
                                        <span className="text-gray-400 line-through ml-1">{snippet.originalPrice}</span>
                                      )}
                                      {snippet.priceLastUpdated && (
                                        <span className="text-gray-400 ml-1">
                                          (Updated: {new Date(snippet.priceLastUpdated).toLocaleDateString()})
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <Plus className="w-4 h-4 text-gray-400" />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {activeTab === 'overview' && (
          <>
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">How the System Works</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p>• <strong>Frontend Integration:</strong> Pages use <code>pageId</code> prop to load snippets from admin system</p>
                <p>• <strong>Example:</strong> <code>&lt;AffiliateProductWidget pageId="hygiene-bereiding_flessen-steriliseren" /&gt;</code></p>
                <p>• <strong>Data Flow:</strong> Admin snippets → API endpoint → Frontend widget</p>
                <p>• <strong>Current Status:</strong> {snippets.filter(s => s.active).length} active snippets ready for display</p>
              </div>
            </div>

            {/* Debug Info */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Debug Information</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• <strong>Snippets loaded:</strong> {snippets.length}</p>
                <p>• <strong>Pages loaded:</strong> {pages.length}</p>
                <p>• <strong>Loading state:</strong> {loading ? 'Loading...' : 'Complete'}</p>
                <p>• <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</p>
                <p>• <strong>API Endpoints:</strong></p>
                <div className="ml-4 text-xs">
                  <p>- Snippets: <code>/api/admin-snippets/</code></p>
                  <p>- Pages: <code>/api/admin-pages/</code></p>
                </div>
                {loadError && (
                  <p>• <strong>Last Error:</strong> <span className="text-red-600">{loadError}</span></p>
                )}
              </div>
              <button
                onClick={() => loadData(true)}
                className="mt-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh Data'}
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}