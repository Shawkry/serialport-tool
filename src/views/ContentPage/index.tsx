import { Layout } from 'antd'
const { Content } = Layout
export const ContentPage = () => {
  return (
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
  )
}
