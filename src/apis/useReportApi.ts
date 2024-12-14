import useApi from '~hooks/useApi'
import { AgingReportQuery } from '~types/reports'

const endpoint = 'v1/reports'
export default function useReportApi() {
  const { get, post, put } = useApi()

  const getAgingReport = async (payload: AgingReportQuery) => {
    const url = `${endpoint}/aging`
    return await post(url, payload)
  }

  return {
    getAgingReport,
  }
}
