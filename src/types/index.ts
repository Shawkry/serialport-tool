export interface IPortConfig {
  path: string
  baudRate: number
  stopBits?: number
  dataBits?: number
  parity?: string
  isOpen: boolean
}
