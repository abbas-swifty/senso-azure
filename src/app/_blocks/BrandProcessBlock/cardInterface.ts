import { Media } from '../../../payload/payload-types'

export interface IconCard {
  id?: string
  media: Media
  heading: string
  content: string
}
