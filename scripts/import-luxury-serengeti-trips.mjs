import {execFileSync} from 'node:child_process'
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {basename, join, resolve} from 'node:path'

import {createClient} from '@sanity/client'
import sharp from 'sharp'

const projectId = process.env.SANITY_PROJECT_ID || '3k0dys1e'
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

const defaultSources = {
  sevenDay: '/Users/lovrokrizan/Downloads/LUXURY 7 DAYS SERENGETI.docx',
  tenDay: '/Users/lovrokrizan/Downloads/LUXURY 10 DAYS ULTIMATE TANZANIA SAFARI..docx',
}

const canonicalSlugs = {
  sevenDay: '7-day-luxury-serengeti-safari',
  tenDay: '10-day-luxury-ultimate-tanzania-safari-adventure',
}

const titles = {
  sevenDay: '7-Day Luxury Serengeti Safari',
  tenDay: '10-Day Luxury Ultimate Tanzania Safari Adventure',
}

const existingTenDayId = 'b0784220-8240-4fda-89df-3d74d403381f'

function option(name, fallback) {
  const index = process.argv.indexOf(name)
  return index === -1 ? fallback : process.argv[index + 1]
}

const sourcePaths = {
  sevenDay: resolve(option('--seven-day', defaultSources.sevenDay)),
  tenDay: resolve(option('--ten-day', defaultSources.tenDay)),
}

const dryRun = process.argv.includes('--dry-run')

function getAuthToken() {
  const environmentToken = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN
  if (environmentToken) return environmentToken

  const configPath = join(homedir(), '.config', 'sanity', 'config.json')
  if (!existsSync(configPath)) return undefined

  return JSON.parse(readFileSync(configPath, 'utf8')).authToken
}

function assertSourceFiles() {
  for (const sourcePath of Object.values(sourcePaths)) {
    if (!existsSync(sourcePath)) throw new Error(`Missing source document: ${sourcePath}`)
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
  const top = 270
  const bottom = 890
  const step = stops.length === 1 ? 0 : (bottom - top) / (stops.length - 1)
  const nodes = stops.map((stop, index) => {
    const y = top + step * index
    const x = index % 2 === 0 ? 390 : 1058
    const textAnchor = index % 2 === 0 ? 'start' : 'end'
    const textX = index % 2 === 0 ? x + 64 : x - 64

    return `
      <circle cx="${x}" cy="${y}" r="25" fill="#E0B880" stroke="#403028" stroke-width="8" />
      <text x="${x}" y="${y + 11}" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#403028">${index + 1}</text>
      <text x="${textX}" y="${y + 12}" text-anchor="${textAnchor}" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#403028">${escapeXml(stop)}</text>`
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
      <text x="724" y="132" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="5" fill="#E0B880">SAFARI ROUTE OVERVIEW</text>
      <text x="724" y="196" text-anchor="middle" font-family="Arial, sans-serif" font-size="46" font-weight="700" fill="#403028">${escapeXml(title)}</text>
      <polyline points="${pathPoints}" fill="none" stroke="#E0B880" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />
      ${nodes}
      <text x="724" y="980" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="600" fill="#786B65">Private transfers, charter flights and guided safari activities</text>
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
  const paragraphs = Array.isArray(description) ? description : [description]

  return {
    _key: `day-${dayNumber}`,
    _type: 'itineraryDay',
    dayNumber,
    title,
    description: portableText(paragraphs, `day-${dayNumber}-description`),
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

function buildTrips(assets, existingTenDay) {
  const sevenMigration = imageValue(
    assets.sevenMigration,
    'Large herds of wildebeest crossing the Serengeti plains during the Great Migration',
  )
  const sevenLodge = imageValue(
    assets.sevenLodge,
    'Landscaped gardens at Legendary Lodge in Arusha',
  )
  const sevenLeopard = imageValue(
    assets.sevenLeopard,
    'Leopard walking through the grass in the Serengeti',
  )
  const sevenCheetah = imageValue(
    assets.sevenCheetah,
    'Cheetah resting on a rock in the Serengeti',
  )
  const tenZebras = imageValue(
    assets.tenZebras,
    'Zebras and antelope grazing across a green Serengeti landscape',
  )
  const tenCrossing = imageValue(
    assets.tenCrossing,
    'Wildebeest crossing the Mara River in the Northern Serengeti',
  )
  const tenLions = imageValue(
    assets.tenLions,
    'Lion pride resting beneath a tree in the Western Serengeti',
  )
  const tenHadzabe = imageValue(
    assets.tenHadzabe,
    'Hadzabe hunter demonstrating traditional archery in the Southern Serengeti region',
  )

  const sevenDayTrip = {
    _type: 'trip',
    title: titles.sevenDay,
    slug: {_type: 'slug', current: canonicalSlugs.sevenDay},
    duration: '7 nights / 8 days',
    destinations: 'Kilimanjaro → Arusha → Western Serengeti → Northern Serengeti → Kilimanjaro',
    bestSeason: 'June - October',
    bestTimeSeasons: [
      {
        _key: 'western-migration',
        _type: 'object',
        period: 'May – July',
        highlight: 'The migration typically moves through the Western Serengeti and Grumeti region; exact timing varies with rainfall.',
      },
      {
        _key: 'northern-migration',
        _type: 'object',
        period: 'July – September',
        highlight: 'A strong planning window for the Northern Serengeti and possible Mara River crossings, which can never be guaranteed.',
      },
      {
        _key: 'year-round-wildlife',
        _type: 'object',
        period: 'Year-round',
        highlight: 'Resident wildlife remains rewarding outside migration peaks, with the route adjusted to current conditions.',
      },
    ],
    category: 'Luxury Safari',
    heroImage: sevenMigration,
    mapImage: imageValue(
      assets.sevenRoute,
      'Route overview for the 7-Day Luxury Serengeti Safari',
    ),
    gallery: [
      galleryImage(assets.sevenMigration, 'Large herds of wildebeest on the Serengeti plains', 'gallery-migration'),
      galleryImage(assets.sevenLodge, 'Landscaped gardens at Legendary Lodge in Arusha', 'gallery-legendary-lodge'),
      galleryImage(assets.sevenLeopard, 'Leopard walking through Serengeti grassland', 'gallery-leopard'),
      galleryImage(assets.sevenCheetah, 'Cheetah resting on a rock in the Serengeti', 'gallery-cheetah'),
    ],
    shortDescription: 'A private luxury fly-in safari combining an Arusha lodge stay with three nights in the Western Serengeti and three nights in the Northern Serengeti.',
    overviewText: portableText([
      'Begin with a private welcome at Kilimanjaro International Airport and an overnight stay at Legendary Lodge or Legendary Coffee Lodge in Arusha.',
      'Fly by charter to the Western Serengeti for three nights of private game drives, sundowners and night drives in the Grumeti region, then continue by scenic flight to the Northern Serengeti for three nights of migration-focused wildlife viewing.',
      'After seven nights, fly from Lamai or Kogatende Airstrip to Kilimanjaro International Airport for your onward journey.',
    ], 'overview'),
    targetAudience: ['Luxury travellers', 'Private groups', 'Migration-focused safari guests', 'Couples and senior travellers'],
    tourForMeDescription: 'Ideal for travellers who prefer charter flights, exclusive camps, a relaxed pace and private guiding across two distinct Serengeti regions.',
    itinerary: [
      itineraryDay({
        dayNumber: 1,
        title: 'Arrival and Legendary Lodge',
        description: 'Meet your Chatama Safari private guide at Kilimanjaro International Airport and transfer by road to Legendary Lodge or Legendary Coffee Lodge in Arusha for your overnight stay.',
        activities: ['Airport welcome', 'Private road transfer to Arusha', 'Lodge check-in and leisure'],
        meals: ['Dinner'],
        accommodation: 'Legendary Lodge or Legendary Coffee Lodge, Arusha',
        activityImage: sevenMigration,
        accommodationImage: sevenLodge,
      }),
      itineraryDay({
        dayNumber: 2,
        title: 'Charter Flight to Western Serengeti',
        description: [
          'After breakfast, transfer to Arusha Airport for a charter flight to Grumeti or Sasakwa Airstrip in the Western Serengeti. A resident field guide welcomes you with a game drive to camp for check-in and lunch.',
          'Later, enjoy an afternoon game drive and sundowner, followed by a night drive back to camp for a campfire dinner under the stars.',
        ],
        activities: ['Charter flight to Western Serengeti', 'Arrival and afternoon game drives', 'Sundowner stop', 'Night game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Sasakwa Lodge, Grumeti Reserves',
        activityImage: sevenMigration,
      }),
      itineraryDay({
        dayNumber: 3,
        title: 'Full Day in Western Serengeti',
        description: 'Begin with coffee, tea and a light snack before a morning game drive. Return for breakfast or brunch, relax through midday, then head out again for an afternoon game drive and sundowner before dinner under the stars.',
        activities: ['Morning game drive', 'Lodge leisure time', 'Afternoon game drive', 'Sundowner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Sasakwa Lodge, Grumeti Reserves',
        activityImage: sevenLeopard,
      }),
      itineraryDay({
        dayNumber: 4,
        title: 'Second Full Day in Western Serengeti',
        description: 'Enjoy another full day in the Grumeti region, with morning and afternoon game drives arranged around wildlife movements and time to relax at the lodge between activities.',
        activities: ['Morning game drive', 'Lodge leisure time', 'Afternoon game drive', 'Campfire dinner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Sasakwa Lodge, Grumeti Reserves',
        activityImage: sevenLeopard,
      }),
      itineraryDay({
        dayNumber: 5,
        title: 'Scenic Flight to Northern Serengeti',
        description: 'After breakfast, fly from the nearest airstrip to the Northern Serengeti. Meet your resident field guide and game-drive to camp for check-in and lunch, followed by an afternoon game drive and dinner under the stars.',
        activities: ['Scenic flight to Northern Serengeti', 'Arrival game drive', 'Afternoon game drive', 'Campfire dinner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Lamai',
        activityImage: sevenCheetah,
      }),
      itineraryDay({
        dayNumber: 6,
        title: 'Full Day in Northern Serengeti',
        description: 'Set out early for a morning game drive with the option of a packed breakfast in the bush. Return for lunch and time at the pool, spa, gym or lounge, then continue with an afternoon game drive before dark.',
        activities: ['Morning game drive', 'Optional bush breakfast', 'Lodge leisure time', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Lamai',
        activityImage: sevenCheetah,
      }),
      itineraryDay({
        dayNumber: 7,
        title: 'Second Full Day in Northern Serengeti',
        description: 'Spend a second full day exploring the Northern Serengeti with morning and afternoon game drives tailored to current wildlife and migration conditions, balanced with time to enjoy the lodge.',
        activities: ['Morning game drive', 'Migration tracking', 'Lodge leisure time', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Lamai',
        activityImage: sevenCheetah,
      }),
      itineraryDay({
        dayNumber: 8,
        title: 'Departure',
        description: 'After breakfast or lunch, depending on your flight schedule, transfer to Lamai or Kogatende Airstrip for a scenic flight to Kilimanjaro International Airport and your onward international connection.',
        activities: ['Airstrip transfer', 'Scenic flight to Kilimanjaro', 'International flight connection'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'No accommodation (departure day)',
        activityImage: sevenMigration,
      }),
    ],
    included: [
      'All-inclusive luxury accommodation',
      'Charter flights from Arusha to Western Serengeti, Western to Northern Serengeti, and Northern Serengeti to Arusha or Kilimanjaro',
      'All park fees',
      'Mineral water, soft drinks, local beers and house wines during game drives',
      'Private 4x4 safari vehicle with an expert guide',
      'All government taxes',
    ],
    notIncluded: [
      'International flight tickets',
      'Gratuities for the private guide and resident field guides',
      'Optional balloon flight',
      'Premium wines',
    ],
    physicalRating: 'Easy',
    isFeatured: false,
    seo: {
      metaTitle: '7-Day Luxury Serengeti Safari | Western & Northern Serengeti',
      metaDescription: 'A private luxury fly-in safari with Arusha, Singita Grumeti, Northern Serengeti, migration tracking, game drives, sundowners and charter flights.',
    },
  }

  const tenDayPrice = Number.isFinite(existingTenDay?.priceFrom) && existingTenDay.priceFrom > 0
    ? existingTenDay.priceFrom
    : undefined

  const tenDayTrip = {
    _type: 'trip',
    title: titles.tenDay,
    slug: {_type: 'slug', current: canonicalSlugs.tenDay},
    duration: '9 nights / 10 days',
    destinations: 'Kilimanjaro → Arusha → Northern Serengeti → Western Serengeti → Southern Serengeti → Kilimanjaro',
    bestSeason: existingTenDay?.bestSeason || 'June - December',
    bestTimeSeasons: [
      {
        _key: 'west-north-migration',
        _type: 'object',
        period: 'June – September',
        highlight: 'A prime period for the Western and Northern Serengeti, with migration stages and possible river crossings depending on rainfall.',
      },
      {
        _key: 'southern-calving',
        _type: 'object',
        period: 'January – March',
        highlight: 'Southern Serengeti and the Mwiba area offer green-season wildlife, cultural visits and access to the wider calving region.',
      },
      {
        _key: 'year-round-safari',
        _type: 'object',
        period: 'Year-round',
        highlight: 'Resident wildlife is present throughout the year; routing and expectations are tailored to seasonal conditions.',
      },
    ],
    category: 'Luxury Safari',
    ...(tenDayPrice ? {
      priceFrom: tenDayPrice,
      pricingTiers: [{_key: 'price-from', _type: 'object', label: 'From price', pricePerPerson: tenDayPrice}],
    } : {}),
    heroImage: tenZebras,
    mapImage: imageValue(
      assets.tenRoute,
      'Route overview for the 10-Day Luxury Ultimate Tanzania Safari Adventure',
    ),
    gallery: [
      galleryImage(assets.tenZebras, 'Zebras and antelope grazing across a green Serengeti landscape', 'gallery-zebras'),
      galleryImage(assets.tenCrossing, 'Wildebeest crossing the Mara River in the Northern Serengeti', 'gallery-river-crossing'),
      galleryImage(assets.tenLions, 'Lion pride resting beneath a tree in the Western Serengeti', 'gallery-lions'),
      galleryImage(assets.tenHadzabe, 'Hadzabe hunter demonstrating traditional archery', 'gallery-hadzabe'),
    ],
    shortDescription: 'An ultra-luxury private fly-in safari with one night in Arusha and eight nights across the Northern, Western and Southern Serengeti.',
    overviewText: portableText([
      'Begin with a private welcome at Kilimanjaro International Airport and an overnight stay in Arusha before flying to the Northern Serengeti.',
      'Spend three nights in the north exploring the Mara River and migration country, three nights in the Western Serengeti for private game drives and sundowners, then two nights in the Southern Serengeti at Mwiba Lodge for wildlife and cultural experiences with Hadzabe and Datoga communities.',
      'On Day 10, fly from the nearest airstrip to Kilimanjaro International Airport for your onward international connection.',
    ], 'overview'),
    targetAudience: ['Luxury travellers', 'Private groups', 'Couples and senior travellers', 'Guests seeking fly-in safari comfort'],
    tourForMeDescription: 'Designed for guests who want an unhurried private safari, premium camps and lodges, scenic charter flights and contrasting experiences across three Serengeti regions.',
    itinerary: [
      itineraryDay({
        dayNumber: 1,
        title: 'Arrival and Legendary Lodge in Arusha',
        description: 'Meet your Chatama Safari private guide at Kilimanjaro International Airport and transfer by road to Arusha for an overnight stay at Legendary Lodge or a comparable luxury lodge.',
        activities: ['Airport welcome', 'Private road transfer to Arusha', 'Lodge check-in and leisure'],
        meals: ['Dinner'],
        accommodation: 'Legendary Lodge or comparable luxury lodge, Arusha',
        activityImage: tenZebras,
      }),
      itineraryDay({
        dayNumber: 2,
        title: 'Charter Flight to Northern Serengeti',
        description: 'After breakfast, transfer to Arusha Airport for a charter flight to the Northern Serengeti. Meet the resident field guide and game-drive to camp for check-in and lunch, then explore the Mara River area on an afternoon game drive before returning to camp before dark.',
        activities: ['Charter flight to Northern Serengeti', 'Arrival game drive', 'Mara River exploration', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Lamai or Nyasi Camp',
        activityImage: tenCrossing,
      }),
      itineraryDay({
        dayNumber: 3,
        title: 'Full Day in Northern Serengeti',
        description: 'Set out after early coffee, tea and a snack for extended wildlife viewing across the Northern Serengeti. Take a packed breakfast or lunch depending on the day’s plan, then continue with an afternoon game drive and dinner under the stars.',
        activities: ['Extended morning game drive', 'Migration and river-crossing tracking', 'Optional bush breakfast or lunch', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Lamai or Nyasi Camp',
        activityImage: tenCrossing,
      }),
      itineraryDay({
        dayNumber: 4,
        title: 'Second Full Day in Northern Serengeti',
        description: 'Enjoy another full day in the Northern Serengeti with flexible morning and afternoon game drives arranged around current wildlife and migration conditions.',
        activities: ['Morning game drive', 'Mara River and plains exploration', 'Lodge leisure time', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Singita Lamai or Nyasi Camp',
        activityImage: tenCrossing,
      }),
      itineraryDay({
        dayNumber: 5,
        title: 'Flight to Western Serengeti',
        description: 'After breakfast, fly to the Western Serengeti. A Grumeti resident guide welcomes you with a game drive to camp for check-in and lunch, followed by an afternoon game drive, campfire drinks and five-star dinner service.',
        activities: ['Flight to Western Serengeti', 'Arrival game drive', 'Afternoon game drive', 'Campfire drinks'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mila Tented Camp or Singita Sabora Camp',
        activityImage: tenLions,
      }),
      itineraryDay({
        dayNumber: 6,
        title: 'Full Day in Western Serengeti',
        description: 'Begin with a morning game drive and return for breakfast, or take a packed breakfast in the bush. Relax at camp through midday, then depart around 16:00 for an afternoon game drive and sundowner before returning before dark.',
        activities: ['Morning game drive', 'Optional bush breakfast', 'Lodge leisure time', 'Afternoon game drive and sundowner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mila Tented Camp or Singita Sabora Camp',
        activityImage: tenLions,
      }),
      itineraryDay({
        dayNumber: 7,
        title: 'Second Full Day in Western Serengeti',
        description: 'Spend a second full day exploring the Grumeti region, combining morning and afternoon wildlife drives with a relaxed midday break at camp.',
        activities: ['Morning game drive', 'Lodge leisure time', 'Afternoon game drive', 'Sundowner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mila Tented Camp or Singita Sabora Camp',
        activityImage: tenLions,
      }),
      itineraryDay({
        dayNumber: 8,
        title: 'Charter Flight to Southern Serengeti',
        description: 'After breakfast, transfer to Sasakwa Airstrip for a charter flight to the Southern Serengeti. Meet your resident field guide and game-drive to Mwiba Lodge for check-in and lunch, then enjoy an afternoon game drive before dark.',
        activities: ['Charter flight to Southern Serengeti', 'Arrival game drive', 'Lodge check-in', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mwiba Lodge',
        activityImage: tenZebras,
      }),
      itineraryDay({
        dayNumber: 9,
        title: 'Southern Serengeti Cultural Experience',
        description: 'Spend the day with Hadzabe and Datoga community hosts in the Southern Serengeti region. Learn about their daily life and traditions through activities described in the source itinerary, including hunting, honey harvesting and food preparation.',
        activities: ['Hadzabe cultural experience', 'Datoga community visit', 'Traditional skills and daily-life activities'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mwiba Lodge',
        activityImage: tenHadzabe,
      }),
      itineraryDay({
        dayNumber: 10,
        title: 'Departure',
        description: 'After breakfast or lunch, depending on your flight schedule, transfer to the nearest airstrip for a scenic flight to Kilimanjaro International Airport and your onward international connection.',
        activities: ['Airstrip transfer', 'Scenic flight to Kilimanjaro', 'International flight connection'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'No accommodation (departure day)',
        activityImage: tenZebras,
      }),
    ],
    included: [
      'All-inclusive luxury accommodation',
      'All scheduled and charter flights listed in the itinerary',
      'All park fees',
      'All airport transfers',
      'Mineral water, soft drinks, local beers and house wines during game drives',
      'Private open 4x4 safari vehicle with an expert guide',
      'All government taxes',
    ],
    notIncluded: [
      'International flight tickets',
      'Travel insurance',
      'Gratuities for the private guide and resident field guides',
      'Items of a personal nature',
    ],
    physicalRating: existingTenDay?.physicalRating || 'Easy',
    isFeatured: existingTenDay?.isFeatured ?? false,
    seo: {
      metaTitle: '10-Day Luxury Ultimate Tanzania Safari Adventure',
      metaDescription: 'An ultra-luxury private fly-in safari through Arusha and the Northern, Western and Southern Serengeti, including migration country, Mwiba and cultural experiences.',
    },
  }

  return [sevenDayTrip, tenDayTrip]
}

function assertTripData(trips) {
  const expectedDayCounts = new Map([
    [canonicalSlugs.sevenDay, 8],
    [canonicalSlugs.tenDay, 10],
  ])

  for (const trip of trips) {
    const expectedDays = expectedDayCounts.get(trip.slug.current)
    if (trip.itinerary.length !== expectedDays) {
      throw new Error(`${trip.title} has ${trip.itinerary.length} itinerary entries; expected ${expectedDays}`)
    }

    const dayNumbers = trip.itinerary.map((day) => day.dayNumber)
    if (dayNumbers.some((dayNumber, index) => dayNumber !== index + 1)) {
      throw new Error(`${trip.title} has non-sequential itinerary day numbers`)
    }

    const images = [trip.heroImage, trip.mapImage, ...trip.gallery]
    if (images.some((image) => !image.alt || !image.asset?._ref)) {
      throw new Error(`${trip.title} contains an incomplete image value`)
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

async function collectAssets(client, tenDayHeroAssetId) {
  if (!tenDayHeroAssetId) {
    throw new Error('The existing 10-day Sanity trip has no reusable hero/gallery image asset')
  }

  const [sevenRoute, tenRoute] = await Promise.all([
    buildRouteGraphic(titles.sevenDay, [
      'Kilimanjaro & Arusha',
      'Western Serengeti',
      'Northern Serengeti',
      'Kilimanjaro departure',
    ]),
    buildRouteGraphic(titles.tenDay, [
      'Kilimanjaro & Arusha',
      'Northern Serengeti',
      'Western Serengeti',
      'Southern Serengeti',
      'Kilimanjaro departure',
    ]),
  ])

  const uploads = {
    sevenMigration: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image1.jpeg'),
      filename: '7-day-serengeti-wildebeest-migration.jpeg',
      title: 'Wildebeest migration on the Serengeti plains',
    },
    sevenLodge: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image2.jpeg'),
      filename: 'legendary-lodge-arusha-gardens.jpeg',
      title: 'Legendary Lodge gardens in Arusha',
    },
    sevenLeopard: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image3.jpeg'),
      filename: 'western-serengeti-leopard.jpeg',
      title: 'Leopard in the Western Serengeti',
    },
    sevenCheetah: {
      buffer: readDocxMedia(sourcePaths.sevenDay, 'image4.jpeg'),
      filename: 'northern-serengeti-cheetah.jpeg',
      title: 'Cheetah in the Northern Serengeti',
    },
    tenCrossing: {
      buffer: readDocxMedia(sourcePaths.tenDay, 'image1.jpeg'),
      filename: 'northern-serengeti-mara-river-crossing.jpeg',
      title: 'Wildebeest crossing the Mara River',
    },
    tenLions: {
      buffer: readDocxMedia(sourcePaths.tenDay, 'image2.jpeg'),
      filename: 'western-serengeti-lion-pride.jpeg',
      title: 'Lion pride in the Western Serengeti',
    },
    tenHadzabe: {
      buffer: readDocxMedia(sourcePaths.tenDay, 'image3.jpeg'),
      filename: 'southern-serengeti-hadzabe-archery.jpeg',
      title: 'Hadzabe traditional archery experience',
    },
    sevenRoute: {
      buffer: sevenRoute,
      filename: '7-day-luxury-serengeti-route-overview.png',
      title: '7-Day Luxury Serengeti Safari route overview',
    },
    tenRoute: {
      buffer: tenRoute,
      filename: '10-day-luxury-ultimate-tanzania-route-overview.png',
      title: '10-Day Luxury Ultimate Tanzania Safari route overview',
    },
  }

  const uploadedEntries = await Promise.all(
    Object.entries(uploads).map(async ([key, upload]) => [key, await uploadImage(client, upload)]),
  )

  return {
    ...Object.fromEntries(uploadedEntries),
    tenZebras: {_id: tenDayHeroAssetId},
  }
}

function baseDocumentId(id) {
  return id.startsWith('drafts.') ? id.slice('drafts.'.length) : id
}

async function findExistingTrips(client) {
  const slugs = Object.values(canonicalSlugs)
  const legacyTitles = [
    titles.sevenDay,
    titles.tenDay,
    '7 DAYS LUXURY SERENGETI SAFARI',
    'LUXURY 10 DAYS ULTIMATE TANZANIA SAFARI',
    '10 DAYS LUXURY ULTIMATE TANZANIA SAFARI ADVENTURE.',
  ]

  const existing = await client.fetch(
    `*[_type == "trip" && (
      slug.current in $slugs ||
      title in $legacyTitles ||
      _id in [$tenDayId, $tenDayDraftId]
    )]{
      _id,
      title,
      "slug": slug.current,
      priceFrom,
      bestSeason,
      physicalRating,
      isFeatured,
      "galleryAssets": gallery[].asset->_id
    }`,
    {
      legacyTitles,
      slugs,
      tenDayDraftId: `drafts.${existingTenDayId}`,
      tenDayId: existingTenDayId,
    },
  )

  const groups = new Map()
  for (const document of existing) {
    const id = baseDocumentId(document._id)
    groups.set(id, [...(groups.get(id) || []), document])
  }

  const sevenDayGroups = [...groups.values()].filter((documents) => documents.some((document) =>
    document.slug === canonicalSlugs.sevenDay ||
    document.title === titles.sevenDay ||
    document.title === '7 DAYS LUXURY SERENGETI SAFARI'
  ))
  if (sevenDayGroups.length > 1) throw new Error('More than one Sanity trip matches the 7-day luxury source')

  const tenDayGroups = [...groups.values()].filter((documents) => documents.some((document) =>
    baseDocumentId(document._id) === existingTenDayId ||
    document.slug === canonicalSlugs.tenDay ||
    document.title === titles.tenDay ||
    document.title === 'LUXURY 10 DAYS ULTIMATE TANZANIA SAFARI'
  ))
  if (tenDayGroups.length !== 1) {
    throw new Error(`Expected one existing 10-day trip group but found ${tenDayGroups.length}`)
  }

  return {
    all: existing,
    sevenDay: sevenDayGroups[0] || [],
    tenDay: tenDayGroups[0],
  }
}

function publishedDocument(documents) {
  return documents.find((document) => !document._id.startsWith('drafts.')) || documents[0]
}

async function verifyImport(client) {
  const slugs = Object.values(canonicalSlugs)
  const trips = await client.fetch(
    `*[_type == "trip" && !(_id in path("drafts.**")) && slug.current in $slugs] | order(slug.current asc) {
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
    throw new Error(`Expected ${slugs.length} published trips but found ${trips.length}`)
  }

  const expectedDayCounts = {
    [canonicalSlugs.sevenDay]: 8,
    [canonicalSlugs.tenDay]: 10,
  }

  for (const trip of trips) {
    if (!trip.heroAsset || !trip.mapAsset || trip.galleryAssets.length < 4 || trip.galleryAssets.some((asset) => !asset)) {
      throw new Error(`${trip.title} has a broken or missing primary image reference`)
    }
    if (trip.itinerary.length !== expectedDayCounts[trip.slug]) {
      throw new Error(`${trip.title} has the wrong itinerary length after import`)
    }
  }

  const rawDocuments = await client.fetch(
    `*[_type == "trip" && slug.current in $slugs]{_id, title, "slug": slug.current}`,
    {slugs},
  )
  const tenDayDraft = rawDocuments.find((document) => document._id === `drafts.${existingTenDayId}`)
  if (!tenDayDraft || tenDayDraft.slug !== canonicalSlugs.tenDay) {
    throw new Error('The existing 10-day draft was not synchronized with the published document')
  }

  return {publishedTrips: trips, synchronizedTenDayDraft: tenDayDraft}
}

async function main() {
  assertSourceFiles()

  const token = getAuthToken()
  if (!token) throw new Error('A Sanity token is required. Sign in with the Sanity CLI or set SANITY_AUTH_TOKEN.')

  const client = createClient({
    apiVersion,
    dataset,
    perspective: 'raw',
    projectId,
    token,
    useCdn: false,
  })
  const existing = await findExistingTrips(client)
  const tenDayPublished = publishedDocument(existing.tenDay)

  if (dryRun) {
    console.log(JSON.stringify({
      dataset,
      existingDocuments: existing.all,
      projectId,
      sourceDocuments: sourcePaths,
      tripsToCreate: existing.sevenDay.length === 0 ? [canonicalSlugs.sevenDay] : [],
      tripsToUpdate: [
        ...(existing.sevenDay.length > 0 ? [canonicalSlugs.sevenDay] : []),
        canonicalSlugs.tenDay,
      ],
    }, null, 2))
    return
  }

  const tenDayHeroAssetId = tenDayPublished.galleryAssets?.[0]
  const assets = await collectAssets(client, tenDayHeroAssetId)
  const trips = buildTrips(assets, tenDayPublished)
  assertTripData(trips)

  const tripBySlug = new Map(trips.map((trip) => [trip.slug.current, trip]))
  let transaction = client.transaction()

  const sevenDayTrip = tripBySlug.get(canonicalSlugs.sevenDay)
  if (existing.sevenDay.length === 0) {
    transaction = transaction.create(sevenDayTrip)
  } else {
    for (const document of existing.sevenDay) {
      transaction = transaction.patch(document._id, (patch) => patch.set(sevenDayTrip))
    }
  }

  const tenDayTrip = tripBySlug.get(canonicalSlugs.tenDay)
  for (const document of existing.tenDay) {
    transaction = transaction.patch(document._id, (patch) => patch.set(tenDayTrip))
  }

  await transaction.commit({autoGenerateArrayKeys: true})
  const verified = await verifyImport(client)
  console.log(JSON.stringify({importedTrips: verified}, null, 2))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
