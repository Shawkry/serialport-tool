import { IPortConfig } from '@/types'

export const DefaultPortConfigEnum: IPortConfig = {
  path: '',
  baudRate: 9600,
  parity: 'none',
  stopBits: 8,
  dataBits: 1,
  isOpen: false,
}
