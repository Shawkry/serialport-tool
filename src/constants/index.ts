import { IPortConfig } from '@/types'

export const DefaultPortConfigEnum: IPortConfig = {
  path: '',
  baudRate: 9600,
  parity: 'none',
  stopBits: 1,
  dataBits: 8,
  isOpen: false,
}
