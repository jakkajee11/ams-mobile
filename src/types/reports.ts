import { PagedQuery } from './queries'

export type AgingReportQuery = PagedQuery & {
  serialNo?: string
  assetTypeId?: string[]
  assetTypeDetailId?: string[]
}
