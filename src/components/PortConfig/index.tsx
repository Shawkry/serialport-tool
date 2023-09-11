import './index.scss'
import { useState, useEffect, useMemo } from 'react'
import { Input, Select, Switch, Form } from 'antd'
import type { IPortConfig } from '@/types'
import { DefaultPortConfigEnum } from '@/constants'
import { ipcRenderer } from 'electron'
export const PortConfig = () => {
  const [form] = Form.useForm<IPortConfig>()
  const [portListOptions, setPortListOptions] = useState<{ label: string; value: string }[]>()
  const pathValue = Form.useWatch('path', form)
  const canEdit = useMemo(() => {
    return Boolean(pathValue) && pathValue !== ''
  }, [pathValue])
  const getPortOptions = () => {
    ipcRenderer.send('serialPort/getList')
    ipcRenderer.on('serialPort/getList/data', (_event, data) => {
      setPortListOptions(data)
    })
  }

  const handlePortConf = async () => {
    const portConfig = await form.validateFields()
    portConfig.path = portListOptions!.find((item) => item.value === portConfig.path)!.label
    ipcRenderer.send('serialPort/setConf', JSON.stringify(portConfig))
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
        <Form.Item label="状态：" name="isOpen" valuePropName="checked">
          <Switch checkedChildren="开" unCheckedChildren="关" disabled={!canEdit} />
        </Form.Item>
      </Form>
    </div>
  )
}
