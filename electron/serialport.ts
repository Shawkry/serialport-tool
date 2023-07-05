import { ipcMain } from 'electron'
const { SerialPort } = require('serialport')
let port: typeof SerialPort
export const registerSerialPortHandlers = async () => {
  ipcMain.on('getSerialPortList', async (event) => {
    try {
      const portList = await SerialPort.list()
      const serialPortsList = portList?.map((item: { path: string }) => {
        return {
          label: item.path,
          value: item.path,
        }
      })
      event.reply('serialPortsList', serialPortsList)
    } catch (error) {
      console.error('Error getting serial ports:', error)
    }
  })
  ipcMain.on('setSerialPort', async (_event, portConfigString) => {
    try {
      const portConfig = JSON.parse(portConfigString)
      if (!portConfig.isOpen) {
        return port?.close()
      }
      delete portConfig.isOpen
      port = new SerialPort(portConfig)
      console.log(port)
    } catch (error) {
      console.error('设置串口参数错误:', error)
    }
  })
}
