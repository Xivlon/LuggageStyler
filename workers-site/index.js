import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleRequest(event.request))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Handle API routes
  if (url.pathname.startsWith('/api/')) {
    return handleApiRequest(request)
  }
  
  // Handle static files
  let options = {}

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    }
    
    const page = await getAssetFromKV(event.request, options)

    // allow headers to be altered
    const response = new Response(page.body, page)

    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'unsafe-url')
    response.headers.set('Feature-Policy', 'none')

    return response

  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event.request, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

async function handleApiRequest(request) {
  const url = new URL(request.url)
  
  // Enable CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  if (url.pathname === '/api/health') {
    return new Response(JSON.stringify({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      environment: 'cloudflare-workers'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
  
  if (url.pathname === '/api/create-payment-intent' && request.method === 'POST') {
    return handleCreatePaymentIntent(request, corsHeaders)
  }
  
  if (url.pathname === '/api/process-membership' && request.method === 'POST') {
    return handleProcessMembership(request, corsHeaders)
  }
  
  return new Response('Not Found', { 
    status: 404, 
    headers: corsHeaders 
  })
}

async function handleCreatePaymentIntent(request, corsHeaders) {
  try {
    const body = await request.json()
    const { amount, planType, customerEmail, customerName } = body
    
    if (!amount || !planType) {
      return new Response(JSON.stringify({ error: 'Amount and plan type are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Stripe with secret key from environment
    const stripe = require('stripe')(STRIPE_SECRET_KEY)
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        planType: planType,
        customerEmail: customerEmail || '',
        customerName: customerName || ''
      }
    })

    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return new Response(JSON.stringify({ error: 'Failed to create payment intent' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

async function handleProcessMembership(request, corsHeaders) {
  try {
    const body = await request.json()
    const { fullName, email, planType, amount, paymentIntentId } = body
    
    if (!fullName || !email || !planType || !amount) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Store membership in KV storage
    const membership = {
      id: Date.now(),
      customerName: fullName,
      email: email,
      planType: planType,
      amount: amount,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: planType === 'monthly' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      paymentIntentId: paymentIntentId
    }

    // Store in KV
    await LUGGSTERS_KV.put(`membership:${membership.id}`, JSON.stringify(membership))
    
    return new Response(JSON.stringify({
      success: true,
      membership: membership,
      message: 'Membership activated successfully!'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('Error processing membership:', error)
    return new Response(JSON.stringify({ error: 'Failed to process membership' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}