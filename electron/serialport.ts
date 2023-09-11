import { ipcMain } from 'electron'
import { IPortConfig } from '@/types'
const { SerialPort, ReadlineParser } = require('serialport')
class SerialManager {
  currentPort: typeof SerialPort | null
  isOpen: Boolean
  dataChangeCallback: any
  constructor() {
    this.currentPort = null
    this.isOpen = false
  }
  subscribeReadDataChange(callback: any) {
    this.dataChangeCallback = callback
  }
  openPort(portConfig: IPortConfig) {
    if (!portConfig.isOpen) return
    this.currentPort = new SerialPort(portConfig)
    this.isOpen = true
    this.startReadData()
  }

  closePort() {
    if (!this.isOpen) {
      throw new Error('Serial port already closed')
    }
    this.currentPort.close()
    this.currentPort = null
    this.isOpen = false
  }
  startReadData() {
    if (!serialManager.currentPort) return
    const parser = serialManager.currentPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    parser.on('data', (data: string) => {
      // this._readData += data.toString()
      this.dataChangeCallback(data ?? '')
    })
  }
}
const serialManager = new SerialManager()
export const registerSerialPortHandlers = async () => {
  ipcMain.on('serialPort/getList', async (event) => {
    try {
      const portList = await SerialPort.list()
      const serialPortsList = portList?.map((item: { path: string }, index: number) => {
        return {
          label: item.path,
          value: item.path + index,
        }
      })
      event.reply('serialPort/getList/data', serialPortsList)
    } catch (error) {
      console.error('获取串口列表错误: ', error)
    }
  })

  ipcMain.on('serialPort/setConf', async (_event, portConfigString) => {
    try {
      const portConfig = JSON.parse(portConfigString)
      if (serialManager.currentPort && !portConfig.isOpen) return serialManager.closePort()
      serialManager.openPort(portConfig)
    } catch (error) {
      console.error('设置串口错误:', error)
    }
  })

  ipcMain.on('serialPort/read', async (event) => {
    try {
      serialManager.startReadData()
      serialManager.subscribeReadDataChange((newData: string) => {
        event.reply('serialPort/read/data', newData)
      })
    } catch (error) {
      console.error('读取串口数据错误:', error)
    }
  })

  ipcMain.on('serialPort/write', async (_event, value) => {
    try {
      if (!serialManager.currentPort) return
      serialManager.currentPort.write(value)
      return
    } catch (error) {
      console.error('写入串口数据错误:', error)
    }
  })
}
