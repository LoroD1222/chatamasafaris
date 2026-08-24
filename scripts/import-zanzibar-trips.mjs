import {execFileSync} from 'node:child_process'
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {basename, join, resolve} from 'node:path'

import {createClient} from '@sanity/client'
import sharp from 'sharp'

const projectId = process.env.SANITY_PROJECT_ID || '3k0dys1e'
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

const workspaceRoot = resolve(import.meta.dirname, '..')
const defaultSources = {
  threeDay: '/Users/lovrokrizan/Downloads/2 NIGHTS_ 3 DAYS  ZANZIBAR.docx',
  fiveDay: '/Users/lovrokrizan/Downloads/Zanzibar 5 Days 4 Nights Package.docx',
  sevenDay: '/Users/lovrokrizan/Downloads/Zanzibar 7 days.docx',
}

function option(name, fallback) {
  const index = process.argv.indexOf(name)
  return index === -1 ? fallback : process.argv[index + 1]
}

const sourcePaths = {
  threeDay: resolve(option('--three-day', defaultSources.threeDay)),
  fiveDay: resolve(option('--five-day', defaultSources.fiveDay)),
  sevenDay: resolve(option('--seven-day', defaultSources.sevenDay)),
}

const dryRun = process.argv.includes('--dry-run')

function getAuthToken() {
  const environmentToken = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN
  if (environmentToken) return environmentToken

  const configPath = join(homedir(), '.config', 'sanity', 'config.json')
  if (!existsSync(configPath)) return undefined

  const config = JSON.parse(readFileSync(configPath, 'utf8'))
  return config.authToken
}

function assertSourceFiles() {
  for (const sourcePath of Object.values(sourcePaths)) {
    if (!existsSync(sourcePath)) {
      throw new Error(`Missing source document: ${sourcePath}`)
    }
  }
}

function readDocxMedia(docxPath, mediaName) {
  return execFileSync('unzip', ['-p', docxPath, `word/media/${mediaName}`], {
    encoding: 'buffer',
    maxBuffer: 20 * 1024 * 1024,
  })
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

async function buildRouteGraphic(title, stops) {
  const height = 1086
  const width = 1448
  const top = 260
  const bottom = 900
  const step = stops.length === 1 ? 0 : (bottom - top) / (stops.length - 1)
  const nodes = stops.map((stop, index) => {
    const y = top + step * index
    const x = index % 2 === 0 ? 390 : 1058
    const textAnchor = index % 2 === 0 ? 'start' : 'end'
    const textX = index % 2 === 0 ? x + 64 : x - 64

    return `
      <circle cx="${x}" cy="${y}" r="25" fill="#E0B880" stroke="#403028" stroke-width="8" />
      <text x="${x}" y="${y + 11}" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#403028">${index + 1}</text>
      <text x="${textX}" y="${y + 12}" text-anchor="${textAnchor}" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#403028">${escapeXml(stop)}</text>`
  }).join('')

  const pathPoints = stops.map((_, index) => {
    const y = top + step * index
    const x = index % 2 === 0 ? 390 : 1058
    return `${x},${y}`
  }).join(' ')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#FFF8F0" />
      <rect x="58" y="58" width="1332" height="970" rx="36" fill="#FFFFFF" stroke="#E0B880" stroke-width="4" />
      <text x="724" y="132" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="5" fill="#E0B880">ZANZIBAR ROUTE OVERVIEW</text>
      <text x="724" y="196" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="#403028">${escapeXml(title)}</text>
      <polyline points="${pathPoints}" fill="none" stroke="#E0B880" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />
      ${nodes}
      <text x="724" y="980" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="600" fill="#786B65">Private transfers and guided excursions throughout the itinerary</text>
    </svg>`

  return sharp(Buffer.from(svg)).png({compressionLevel: 9}).toBuffer()
}

function portableText(paragraphs, prefix) {
  return paragraphs.map((text, index) => ({
    _key: `${prefix}-${index + 1}`,
    _type: 'block',
    children: [
      {
        _key: `${prefix}-${index + 1}-span`,
        _type: 'span',
        marks: [],
        text,
      },
    ],
    markDefs: [],
    style: 'normal',
  }))
}

function zanzibarBestTimeSeasons() {
  return [
    {
      _key: 'dry-season',
      _type: 'object',
      period: 'June – October',
      highlight: 'Zanzibar’s main dry season and the best overall period for outdoor activities, beaches, and snorkelling.',
    },
    {
      _key: 'dry-transition',
      _type: 'object',
      period: 'January – February',
      highlight: 'A relatively dry transition period and another good window for island activities.',
    },
    {
      _key: 'rainy-seasons',
      _type: 'object',
      period: 'Rainier months',
      highlight: 'Long rains usually fall from March to May, with shorter rains from October to December; sea trips remain weather-dependent.',
    },
  ]
}

function imageValue(asset, alt, key) {
  return {
    ...(key ? {_key: key} : {}),
    _type: 'image',
    alt,
    asset: {_ref: asset._id, _type: 'reference'},
  }
}

function itineraryDay({
  dayNumber,
  title,
  description,
  activities,
  meals,
  accommodation,
  activityImage,
  accommodationImage,
}) {
  return {
    _key: `day-${dayNumber}`,
    _type: 'itineraryDay',
    dayNumber,
    title,
    description: portableText([description], `day-${dayNumber}-description`),
    activities,
    meals,
    ...(activityImage ? {activityImage} : {}),
    accommodation: {
      _type: 'object',
      name: accommodation,
      ...(accommodationImage ? {image: accommodationImage} : {}),
    },
  }
}

function galleryImage(asset, alt, key) {
  return imageValue(asset, alt, key)
}

function buildTrips(assets) {
  const hotelImage = imageValue(
    assets.fiveHotel,
    'Beachfront Zanzibar hotel with palm trees and traditional thatched buildings',
  )

  return [
    {
      _type: 'trip',
      title: '3-Day Zanzibar Adventure',
      slug: {_type: 'slug', current: '3-day-zanzibar-adventure'},
      duration: '2 nights / 3 days',
      destinations: 'Stone Town → Prison Island → Menai Bay → Spice Farm',
      bestSeason: 'June - October',
      bestTimeSeasons: zanzibarBestTimeSeasons(),
      category: 'Zanzibar',
      priceFrom: 1000,
      heroImage: imageValue(
        assets.zanzibarCove,
        'Turquoise water at a sheltered Zanzibar beach cove',
      ),
      mapImage: imageValue(
        assets.threeRoute,
        'Route overview for the 3-Day Zanzibar Adventure',
      ),
      gallery: [
        galleryImage(assets.zanzibarCove, 'Turquoise water at a sheltered Zanzibar beach cove', 'gallery-cove'),
        galleryImage(assets.fiveStoneTown, 'Walking through the historic lanes of Stone Town, Zanzibar', 'gallery-stone-town'),
        galleryImage(assets.sevenSafariBlue, 'Traditional dhow on a sandbank during a Safari Blue excursion', 'gallery-safari-blue'),
      ],
      shortDescription: 'A compact Zanzibar extension combining Stone Town, Prison Island, a full-day Safari Blue excursion, and a spice farm visit.',
      overviewText: portableText([
        'This short Zanzibar package is designed for safari travellers who want to add island culture, marine activities, and beach time without extending their journey too far.',
        'Over three days, explore historic Stone Town and Prison Island, sail and snorkel in Menai Bay, then visit a working spice farm before departure.',
      ], 'overview'),
      targetAudience: ['Safari travellers adding Zanzibar', 'Couples and friends', 'Culture and ocean lovers', 'Travellers with limited time'],
      tourForMeDescription: 'Choose this package if you have only a few days in Zanzibar and want a balanced introduction to its history, marine life, food, and spices.',
      itinerary: [
        itineraryDay({
          dayNumber: 1,
          title: 'Stone Town and Prison Island',
          description: 'Walk through the narrow historic lanes of Stone Town, take a boat to Prison Island to see the Aldabra giant tortoises, and finish with a seafood dinner at the Forodhani Gardens night market.',
          activities: ['Guided Stone Town walking tour', 'Boat trip to Prison Island', 'Forodhani Gardens seafood dinner'],
          meals: ['Dinner'],
          accommodation: 'Zanzibar hotel (full board)',
          activityImage: imageValue(assets.fiveStoneTown, 'Walking through the historic lanes of Stone Town, Zanzibar'),
        }),
        itineraryDay({
          dayNumber: 2,
          title: 'Safari Blue in Menai Bay',
          description: 'Spend the day sailing on a traditional wooden dhow in Menai Bay. Snorkel around coral reefs, relax on a sandbank, and enjoy tropical fruit with a grilled seafood lunch.',
          activities: ['Traditional dhow sailing', 'Snorkelling in Menai Bay', 'Sandbank relaxation and seafood lunch'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar hotel (full board)',
          activityImage: imageValue(assets.sevenSafariBlue, 'Traditional dhow on a sandbank during a Safari Blue excursion'),
        }),
        itineraryDay({
          dayNumber: 3,
          title: 'Spice Farm and Departure',
          description: 'Visit a rural spice farm to smell and taste vanilla, cinnamon, and fresh tropical fruits. After the guided tour, transfer to Zanzibar Airport or the ferry terminal for departure.',
          activities: ['Guided spice farm walking tour', 'Airport or ferry terminal transfer'],
          meals: ['Breakfast'],
          accommodation: 'Zanzibar Airport or ferry terminal (departure)',
        }),
      ],
      included: [
        'Full-board accommodation',
        'Flight ticket from Serengeti to Zanzibar',
        'Activities listed in the itinerary',
        'Professional driver-guide',
        'Airport and ferry transfers',
        'Entrance fees',
        'Drinking water during excursions',
        'All taxes and VAT',
      ],
      notIncluded: ['International flights', 'Travel insurance', 'Optional activities not listed in the itinerary'],
      pricingTiers: [{_key: 'price-from', _type: 'object', label: 'From price', pricePerPerson: 1000}],
      physicalRating: 'Easy',
      isFeatured: false,
      seo: {
        metaTitle: '3-Day Zanzibar Adventure | Stone Town, Safari Blue & Spice Farm',
        metaDescription: 'A 2-night Zanzibar package with Stone Town, Prison Island, Safari Blue in Menai Bay, a spice farm visit, transfers, and full-board accommodation.',
      },
    },
    {
      _type: 'trip',
      title: '5-Day Zanzibar Island Tour',
      slug: {_type: 'slug', current: '5-day-zanzibar-island-tour'},
      duration: '4 nights / 5 days',
      destinations: 'Zanzibar Airport → Menai Bay → Mnemba Island → Stone Town → Prison Island',
      bestSeason: 'June - October',
      bestTimeSeasons: zanzibarBestTimeSeasons(),
      category: 'Zanzibar',
      priceFrom: 1250,
      heroImage: imageValue(
        assets.fiveHotel,
        'Beachfront Zanzibar hotel with palm trees and traditional thatched buildings',
      ),
      mapImage: imageValue(
        assets.fiveRoute,
        'Route overview for the 5-Day Zanzibar Island Tour',
      ),
      gallery: [
        galleryImage(assets.fiveHotel, 'Beachfront Zanzibar hotel with palm trees and traditional thatched buildings', 'gallery-hotel'),
        galleryImage(assets.fiveSafariBlue, 'Fresh seafood barbecue prepared during a Safari Blue excursion', 'gallery-safari-blue'),
        galleryImage(assets.fiveDolphins, 'Dolphins swimming near Mnemba Island, Zanzibar', 'gallery-dolphins'),
        galleryImage(assets.fiveStoneTown, 'Walking through the historic lanes of Stone Town, Zanzibar', 'gallery-stone-town'),
      ],
      shortDescription: 'Four nights in Zanzibar with airport transfers, Safari Blue, Mnemba Island dolphin watching and snorkelling, Stone Town, a spice farm, and Prison Island.',
      overviewText: portableText([
        'This five-day package combines a beachfront stay with Zanzibar’s best-known marine and cultural excursions.',
        'After a private airport transfer, sail through Menai Bay on Safari Blue, explore the reefs around Mnemba Island, and spend a full day discovering Stone Town, a spice farm, and Prison Island.',
      ], 'overview'),
      targetAudience: ['First-time Zanzibar visitors', 'Couples and friends', 'Families', 'Ocean and culture lovers'],
      tourForMeDescription: 'Choose this package if you want a comfortable Zanzibar stay with a full mix of sailing, snorkelling, history, spices, and wildlife encounters.',
      itinerary: [
        itineraryDay({
          dayNumber: 1,
          title: 'Arrival and Transfer to the Hotel',
          description: 'Arrive at Zanzibar International Airport and meet your driver outside the arrivals lounge. Your driver will display your name on a signboard and transfer you directly to your hotel; pickup time is arranged around your confirmed flight details.',
          activities: ['Airport meet-and-greet', 'Private transfer to the hotel'],
          meals: ['Dinner'],
          accommodation: 'Zanzibar beach hotel',
          accommodationImage: hotelImage,
        }),
        itineraryDay({
          dayNumber: 2,
          title: 'Full-Day Safari Blue Trip',
          description: 'Sail through Menai Bay’s mangroves and coral reefs, visit Kwale Island, relax on a sandbank, swim and snorkel, then enjoy a fresh seafood barbecue and tropical fruit.',
          activities: ['Dhow sailing in Menai Bay', 'Kwale Island and sandbank visit', 'Swimming and snorkelling', 'Seafood barbecue and tropical fruit'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar beach hotel',
          activityImage: imageValue(assets.fiveSafariBlue, 'Fresh seafood barbecue prepared during a Safari Blue excursion'),
          accommodationImage: hotelImage,
        }),
        itineraryDay({
          dayNumber: 3,
          title: 'Mnemba Island Dolphins and Snorkelling',
          description: 'Take a half-day marine excursion near Mnemba Island for dolphin watching, snorkelling among colourful tropical fish and coral reefs, and views of Zanzibar’s north coast near Matemwe Beach.',
          activities: ['Dolphin watching near Mnemba Island', 'Coral reef snorkelling', 'Matemwe Beach and north-coast views'],
          meals: ['Breakfast', 'Dinner'],
          accommodation: 'Zanzibar beach hotel',
          activityImage: imageValue(assets.fiveDolphins, 'Dolphins swimming near Mnemba Island, Zanzibar'),
          accommodationImage: hotelImage,
        }),
        itineraryDay({
          dayNumber: 4,
          title: 'Stone Town, Spice Farm and Prison Island',
          description: 'Taste and smell locally grown spices, explore Zanzibar’s history and culture with a professional guide in Stone Town, enjoy a local spiced-rice lunch at the farm, and visit the Aldabra giant tortoises on Prison Island.',
          activities: ['Guided spice farm tour and local lunch', 'Stone Town history and culture tour', 'Prison Island and giant tortoises'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar beach hotel',
          activityImage: imageValue(assets.fiveStoneTown, 'Walking through the historic lanes of Stone Town, Zanzibar'),
          accommodationImage: hotelImage,
        }),
        itineraryDay({
          dayNumber: 5,
          title: 'Transfer to Zanzibar Airport',
          description: 'Check out after breakfast and transfer from the hotel to Zanzibar International Airport according to your departure flight time.',
          activities: ['Hotel checkout', 'Private airport transfer'],
          meals: ['Breakfast'],
          accommodation: 'Zanzibar International Airport (departure)',
        }),
      ],
      included: [
        'Four nights of accommodation',
        'Flight ticket from Serengeti to Zanzibar',
        'Return airport-to-hotel transfers',
        'Breakfast and dinner',
        'Transport during excursions',
        'Entrance fees and listed activities',
        'Drinking water during excursions',
        'Professional driver-guide',
        'All taxes and VAT',
      ],
      notIncluded: [],
      pricingTiers: [{_key: 'price-from', _type: 'object', label: 'From price', pricePerPerson: 1250}],
      physicalRating: 'Easy',
      isFeatured: false,
      seo: {
        metaTitle: '5-Day Zanzibar Island Tour | Safari Blue, Mnemba & Stone Town',
        metaDescription: 'A 4-night Zanzibar package with airport transfers, Safari Blue, Mnemba snorkelling, Stone Town, a spice farm, Prison Island, and beachfront accommodation.',
      },
    },
    {
      _type: 'trip',
      title: '7-Day Zanzibar Island Adventure',
      slug: {_type: 'slug', current: '7-day-zanzibar-island-adventure'},
      duration: '6 nights / 7 days',
      destinations: 'Zanzibar Airport → Menai Bay → Stone Town → Prison Island → Mnemba Island → Jozani Forest',
      bestSeason: 'June - October',
      bestTimeSeasons: zanzibarBestTimeSeasons(),
      category: 'Zanzibar',
      priceFrom: 1398,
      heroImage: imageValue(
        assets.sevenAerial,
        'Aerial view of a green Zanzibar island surrounded by turquoise water',
      ),
      mapImage: imageValue(
        assets.sevenRoute,
        'Route overview for the 7-Day Zanzibar Island Adventure',
      ),
      gallery: [
        galleryImage(assets.sevenAerial, 'Aerial view of a green Zanzibar island surrounded by turquoise water', 'gallery-aerial'),
        galleryImage(assets.sevenSafariBlue, 'Traditional dhow on a sandbank during a Safari Blue excursion', 'gallery-safari-blue'),
        galleryImage(assets.sevenStoneTown, 'Guided walking tour in Stone Town, Zanzibar', 'gallery-stone-town'),
        galleryImage(assets.sevenDolphins, 'Dolphins swimming near snorkellers in Zanzibar', 'gallery-dolphins'),
        galleryImage(assets.sevenJozani, 'Zanzibar red colobus monkey in Jozani Forest', 'gallery-jozani'),
      ],
      shortDescription: 'Six nights in Zanzibar with Safari Blue, a beach day, Stone Town, a spice farm, Prison Island, Mnemba Island, Jozani Forest, and lunch at The Rock Restaurant.',
      overviewText: portableText([
        'This seven-day package explores several parts of Zanzibar while allowing time for both guided excursions and a relaxed beach day.',
        'Sail through Menai Bay, discover Stone Town and Prison Island, snorkel near Mnemba Island, and meet the endemic red colobus monkeys in Jozani Forest before lunch at The Rock Restaurant.',
      ], 'overview'),
      targetAudience: ['Travellers who prefer a relaxed pace', 'Couples and friends', 'Families', 'Beach, culture and wildlife lovers'],
      tourForMeDescription: 'Choose this package if you want Zanzibar’s essential marine, cultural, and wildlife experiences with a full free day for the beach.',
      itinerary: [
        itineraryDay({
          dayNumber: 1,
          title: 'Arrival and Transfer to the Hotel',
          description: 'Arrive at Zanzibar International Airport and meet your driver outside the arrivals lounge. Your driver will display your name on a signboard and transfer you to the hotel; pickup time is arranged around your confirmed flight details.',
          activities: ['Airport meet-and-greet', 'Private transfer to the hotel'],
          meals: ['Dinner'],
          accommodation: 'Zanzibar beach hotel (full board)',
        }),
        itineraryDay({
          dayNumber: 2,
          title: 'Full-Day Safari Blue Trip',
          description: 'Sail through Menai Bay’s mangroves and coral reefs, visit Kwale Island, relax on a sandbank, swim and snorkel, then enjoy a fresh seafood barbecue and tropical fruit.',
          activities: ['Dhow sailing in Menai Bay', 'Kwale Island and sandbank visit', 'Swimming and snorkelling', 'Seafood barbecue and tropical fruit'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar beach hotel (full board)',
          activityImage: imageValue(assets.sevenSafariBlue, 'Traditional dhow on a sandbank during a Safari Blue excursion'),
        }),
        itineraryDay({
          dayNumber: 3,
          title: 'Beach Relaxation',
          description: 'Enjoy a free day at the hotel and explore the beach at your own pace, with no scheduled excursion.',
          activities: ['Free time at the hotel', 'Beach relaxation'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar beach hotel (full board)',
          activityImage: imageValue(assets.zanzibarCove, 'Turquoise water at a sheltered Zanzibar beach cove'),
        }),
        itineraryDay({
          dayNumber: 4,
          title: 'Stone Town, Spice Farm and Prison Island',
          description: 'Taste and smell locally grown spices, explore Zanzibar’s history and culture with a professional guide in Stone Town, enjoy a local spiced-rice lunch at the farm, and visit the Aldabra giant tortoises on Prison Island.',
          activities: ['Guided spice farm tour and local lunch', 'Stone Town history and culture tour', 'Prison Island and giant tortoises'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar beach hotel (full board)',
          activityImage: imageValue(assets.sevenStoneTown, 'Guided walking tour in Stone Town, Zanzibar'),
        }),
        itineraryDay({
          dayNumber: 5,
          title: 'Mnemba Island Dolphins and Snorkelling',
          description: 'Take a half-day marine excursion near Mnemba Island for dolphin watching, snorkelling among colourful tropical fish and coral reefs, and views of Zanzibar’s north coast near Matemwe Beach.',
          activities: ['Dolphin watching near Mnemba Island', 'Coral reef snorkelling', 'Matemwe Beach and north-coast views'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar beach hotel (full board)',
          activityImage: imageValue(assets.sevenDolphins, 'Dolphins swimming near snorkellers in Zanzibar'),
        }),
        itineraryDay({
          dayNumber: 6,
          title: 'Jozani Forest and The Rock Restaurant',
          description: 'Explore Jozani Forest to see the endemic Zanzibar red colobus monkey and other wildlife, learn about local uses of forest herbs, and finish with lunch at The Rock Restaurant.',
          activities: ['Guided Jozani Forest walk', 'Red colobus monkey viewing', 'Lunch at The Rock Restaurant'],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Zanzibar beach hotel (full board)',
          activityImage: imageValue(assets.sevenJozani, 'Zanzibar red colobus monkey in Jozani Forest'),
        }),
        itineraryDay({
          dayNumber: 7,
          title: 'Transfer to Zanzibar Airport',
          description: 'After seven days in Zanzibar, check out and transfer from the hotel to Zanzibar International Airport according to your departure flight time.',
          activities: ['Hotel checkout', 'Private airport transfer'],
          meals: ['Breakfast'],
          accommodation: 'Zanzibar International Airport (departure)',
        }),
      ],
      included: ['Full-board accommodation', 'Professional driver-guide', 'Airport transfers', 'All government taxes'],
      notIncluded: ['International flight tickets', 'Domestic flight to Zanzibar', 'Travel insurance'],
      pricingTiers: [{_key: 'price-from', _type: 'object', label: 'From price', pricePerPerson: 1398}],
      physicalRating: 'Easy',
      isFeatured: false,
      seo: {
        metaTitle: '7-Day Zanzibar Island Adventure | Beach, Culture & Wildlife',
        metaDescription: 'A 6-night Zanzibar package with Safari Blue, Stone Town, Prison Island, Mnemba snorkelling, Jozani Forest, The Rock Restaurant, and a beach day.',
      },
    },
  ]
}

function assertTripData(trips) {
  const slugs = new Set()

  for (const trip of trips) {
    if (slugs.has(trip.slug.current)) throw new Error(`Duplicate slug: ${trip.slug.current}`)
    slugs.add(trip.slug.current)

    const expectedDays = Number.parseInt(trip.duration.match(/(\d+) days/)?.[1] || '', 10)
    if (trip.itinerary.length !== expectedDays) {
      throw new Error(`${trip.title} has ${trip.itinerary.length} itinerary entries but a ${expectedDays}-day duration`)
    }

    if (!trip.heroImage.alt || trip.gallery.some((image) => !image.alt)) {
      throw new Error(`${trip.title} contains an image without alternative text`)
    }

    const dayNumbers = trip.itinerary.map((day) => day.dayNumber)
    if (dayNumbers.some((dayNumber, index) => dayNumber !== index + 1)) {
      throw new Error(`${trip.title} has non-sequential itinerary day numbers`)
    }
  }
}

async function uploadImage(client, {buffer, filePath, filename, title}) {
  const body = buffer || createReadStream(filePath)
  const asset = await client.assets.upload('image', body, {
    filename: filename || basename(filePath),
    title,
  })
  console.log(`Uploaded image: ${title}`)
  return asset
}

async function collectAssets(client) {
  const routeGraphics = await Promise.all([
    buildRouteGraphic('3-Day Zanzibar Adventure', [
      'Stone Town & Prison Island',
      'Safari Blue, Menai Bay',
      'Spice Farm & departure',
    ]),
    buildRouteGraphic('5-Day Zanzibar Island Tour', [
      'Zanzibar arrival',
      'Safari Blue, Menai Bay',
      'Mnemba Island',
      'Stone Town, Spice Farm & Prison Island',
      'Departure',
    ]),
    buildRouteGraphic('7-Day Zanzibar Island Adventure', [
      'Zanzibar arrival',
      'Safari Blue, Menai Bay',
      'Beach leisure',
      'Stone Town, Spice Farm & Prison Island',
      'Mnemba Island',
      'Jozani Forest & The Rock',
      'Departure',
    ]),
  ])

  const uploads = {
    zanzibarCove: {
      filePath: join(workspaceRoot, 'public', 'assets', 'figma', 'zanzibar-88.jpg'),
      title: 'Zanzibar sheltered beach cove',
    },
    fiveHotel: {
      buffer: readDocxMedia(sourcePaths.fiveDay, 'image1.jpeg'),
      filename: 'zanzibar-beach-hotel.jpeg',
      title: 'Zanzibar beachfront hotel',
    },
    fiveSafariBlue: {
      buffer: readDocxMedia(sourcePaths.fiveDay, 'image2.jpeg'),
      filename: 'zanzibar-safari-blue-seafood-barbecue.jpeg',
      title: 'Safari Blue seafood barbecue',
    },
    fiveDolphins: {
      buffer: readDocxMedia(sourcePaths.fiveDay, 'image3.jpeg'),
      filename: 'zanzibar-mnemba-dolphins.jpeg',
      title: 'Dolphins near Mnemba Island',
    },
    fiveStoneTown: {
      buffer: readDocxMedia(sourcePaths.fiveDay, 'image4.jpeg'),
      filename: 'zanzibar-stone-town-walking-tour.jpeg',
      title: 'Stone Town walking tour',
    },
    sevenAerial: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image1.jpeg'),
      filename: 'zanzibar-island-aerial.jpeg',
      title: 'Aerial view of Zanzibar island and beach',
    },
    sevenSafariBlue: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image2.jpeg'),
      filename: 'zanzibar-safari-blue-dhow.jpeg',
      title: 'Safari Blue dhow at a sandbank',
    },
    sevenStoneTown: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image3.png'),
      filename: 'zanzibar-stone-town-guide.png',
      title: 'Guided Stone Town tour',
    },
    sevenDolphins: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image4.jpeg'),
      filename: 'zanzibar-dolphin-excursion.jpeg',
      title: 'Dolphin excursion near Mnemba Island',
    },
    sevenJozani: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image5.jpeg'),
      filename: 'zanzibar-red-colobus-monkey.jpeg',
      title: 'Zanzibar red colobus monkey in Jozani Forest',
    },
    threeRoute: {
      buffer: routeGraphics[0],
      filename: '3-day-zanzibar-route-overview.png',
      title: '3-Day Zanzibar Adventure route overview',
    },
    fiveRoute: {
      buffer: routeGraphics[1],
      filename: '5-day-zanzibar-route-overview.png',
      title: '5-Day Zanzibar Island Tour route overview',
    },
    sevenRoute: {
      buffer: routeGraphics[2],
      filename: '7-day-zanzibar-route-overview.png',
      title: '7-Day Zanzibar Island Adventure route overview',
    },
  }

  const assets = {}
  for (const [key, upload] of Object.entries(uploads)) {
    assets[key] = await uploadImage(client, upload)
  }
  return assets
}

async function findExistingTrips(client, slugs) {
  const existing = await client.fetch(
    `*[_type == "trip" && slug.current in $slugs]{_id, title, "slug": slug.current}`,
    {slugs},
  )

  for (const slug of slugs) {
    const matches = existing.filter((trip) => trip.slug === slug)
    if (matches.length > 1) {
      throw new Error(`More than one Sanity trip already uses the slug ${slug}`)
    }
  }

  return existing
}

async function verifyImport(client, slugs) {
  const trips = await client.fetch(
    `*[_type == "trip" && slug.current in $slugs] | order(slug.current asc) {
      _id,
      title,
      "slug": slug.current,
      duration,
      category,
      priceFrom,
      "heroAsset": heroImage.asset->_id,
      "mapAsset": mapImage.asset->_id,
      "galleryAssets": gallery[].asset->_id,
      "itinerary": itinerary[]{
        dayNumber,
        title,
        "activityAsset": activityImage.asset->_id,
        "accommodationAsset": accommodation.image.asset->_id
      }
    }`,
    {slugs},
  )

  if (trips.length !== slugs.length) {
    throw new Error(`Expected ${slugs.length} imported trips but found ${trips.length}`)
  }

  for (const trip of trips) {
    if (!trip.heroAsset || !trip.mapAsset || trip.galleryAssets.some((asset) => !asset)) {
      throw new Error(`${trip.title} has a broken image reference`)
    }
  }

  return trips
}

async function main() {
  assertSourceFiles()

  const token = getAuthToken()
  if (!token) {
    throw new Error('A Sanity token is required. Sign in with the Sanity CLI or set SANITY_AUTH_TOKEN.')
  }

  const client = createClient({apiVersion, dataset, projectId, token, useCdn: false})
  const slugs = [
    '3-day-zanzibar-adventure',
    '5-day-zanzibar-island-tour',
    '7-day-zanzibar-island-adventure',
  ]
  const existingTrips = await findExistingTrips(client, slugs)

  if (dryRun) {
    console.log(JSON.stringify({
      dataset,
      existingTrips,
      projectId,
      sourceDocuments: sourcePaths,
      tripsToCreate: slugs.filter((slug) => !existingTrips.some((trip) => trip.slug === slug)),
      tripsToUpdate: slugs.filter((slug) => existingTrips.some((trip) => trip.slug === slug)),
    }, null, 2))
    return
  }

  const assets = await collectAssets(client)
  const trips = buildTrips(assets)
  assertTripData(trips)

  let transaction = client.transaction()
  for (const trip of trips) {
    const existing = existingTrips.find((candidate) => candidate.slug === trip.slug.current)
    transaction = existing
      ? transaction.patch(existing._id, (patch) => patch.set(trip))
      : transaction.create(trip)
  }

  await transaction.commit({autoGenerateArrayKeys: true})
  const verifiedTrips = await verifyImport(client, slugs)
  console.log(JSON.stringify({importedTrips: verifiedTrips}, null, 2))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
