import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '3k0dys1e',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
