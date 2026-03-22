export interface Project {
  id: string
  title: string
  description: string | null
  category: string
  date: string | null
  image_urls: string[]
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  phone: string | null
  email: string | null
  message: string
  created_at: string
}

export interface SiteContent {
  key: string
  value: string
}

export type ProjectCategory =
  | 'Building'
  | 'Plastering'
  | 'Painting'
  | 'Renovations'
  | 'Tiling'
  | 'Paving'
  | 'Ceilings'
  | 'Flooring'
  | 'Plumbing'

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Building',
  'Plastering',
  'Painting',
  'Renovations',
  'Tiling',
  'Paving',
  'Ceilings',
  'Flooring',
  'Plumbing',
]
