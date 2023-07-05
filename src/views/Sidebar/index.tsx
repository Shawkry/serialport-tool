import { Layout } from 'antd'
import { PortConfig } from '@/components/PortConfig'
const { Sider } = Layout
import './index.scss'
export const Sidebar = () => {
  return (
    <Sider className={'sidebar'} width={'250'}>
      <div className={'bar'}>
        <span className={'bar-title'}>串口设置</span>
        <div className={'bar-content'}>
          <PortConfig />
        </div>
      </div>
    </Sider>
  )
}
