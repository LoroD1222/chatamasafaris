import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'q8s6kys3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
