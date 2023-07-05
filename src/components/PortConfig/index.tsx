import './index.scss'
import { useState, useEffect, useMemo } from 'react'
import { Input, Select, Switch, Form } from 'antd'
import type { IPortConfig } from '@/types'
import { DefaultPortConfigEnum } from '@/constants'
import { ipcRenderer } from 'electron'
export const PortConfig = () => {
  const [form] = Form.useForm<IPortConfig>()
  const [portListOptions, setPortListOptions] = useState()
  const pathValue = Form.useWatch('path', form)
  const canEdit = useMemo(() => {
    return Boolean(pathValue) && pathValue !== ''
  }, [pathValue])
  const getPortOptions = () => {
    ipcRenderer.send('getSerialPortList')
    ipcRenderer.on('serialPortsList', (_event, data) => {
      console.log(data)
      setPortListOptions(data)
    })
  }

  const handlePortConf = async (value: IPortConfig) => {
    console.log(value)
    if (value?.path && value.path !== '') await form.setFieldValue('isOpen', true)
    const portConfig = await form.validateFields()
    console.log(portConfig)
    ipcRenderer.send('setSerialPort', JSON.stringify(portConfig))
  }
  useEffect(() => {
    getPortOptions()
  }, [])
  return (
    <div className={'port-config'}>
      <Form
        form={form}
        name="portConfig"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={DefaultPortConfigEnum}
        onValuesChange={handlePortConf}
        autoComplete="off"
      >
        <Form.Item label="串口号：" name="path">
          <Select options={portListOptions} />
        </Form.Item>
        <Form.Item label="波特率：" name="baudRate">
          <Input disabled={!canEdit} />
        </Form.Item>
        <Form.Item label="数据位：" name="dataBits">
          <Select disabled={!canEdit} />
        </Form.Item>
        <Form.Item label="停止位：" name="stopBits">
          <Select disabled={!canEdit} />
        </Form.Item>
        <Form.Item label="校验位：" name="parity">
          <Select disabled={!canEdit} />
        </Form.Item>
        <Form.Item label="状态：" name="isOpen">
          <Switch checkedChildren="开" unCheckedChildren="关" disabled={!canEdit} />
        </Form.Item>
      </Form>
    </div>
  )
}
