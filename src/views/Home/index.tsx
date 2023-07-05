import { Layout } from 'antd'
const { Sider, Content } = Layout
export const Home = () => {
  return (
    <Layout>
      <Sider style={{height: '100vh', padding: '25px' }}>Sider</Sider>
      <Layout>
        <Content
          style={{
            height: '100vh',
            padding: '25px',
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  )
}
