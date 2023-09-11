import { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Layout, Input, Button, Space } from 'antd'
import { ClearOutlined, SendOutlined } from '@ant-design/icons'
import './index.scss'
const { Content } = Layout
const { TextArea } = Input
export const ContentPage = () => {
  const [writeValue, setWriteValue] = useState<string>('')
  const [readValue, setReadValue] = useState<string>('')
  const writeToSerialPort = () => {
    ipcRenderer.send('serialPort/write', writeValue)
  }
  const readToSerialPort = () => {
    ipcRenderer.send('serialPort/read')
    ipcRenderer.on('serialPort/read/data', (_event, data) => {
      setReadValue((value) => value + data)
    })
  }
  const clearReadTextArea = () => {
    setReadValue('')
  }
  useEffect(() => {
    readToSerialPort()
  }, [])
  return (
    <Layout>
      <Content
        style={{
          height: '100vh',
          padding: '25px',
        }}
      >
        <div className={'readTextArea'}>
          <div className={'title'}>
            <span className={'text'}>接收</span>
            <Button
              onClick={clearReadTextArea}
              icon={<ClearOutlined />}
              danger
              className={'btn'}
            ></Button>
          </div>
          <div className={'content'}>
            <TextArea value={readValue} readOnly={true} rows={15} />
          </div>
        </div>
        <div className={'writeTextArea'}>
          <div className={'title'}>
            <span className={'text'}>发送</span>
          </div>
          <div className={'content'}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Space.Compact style={{ width: '100%' }}>
                <Input value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />

                <Button onClick={writeToSerialPort} type="primary" icon={<SendOutlined />}>
                  发送
                </Button>
              </Space.Compact>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  )
}
