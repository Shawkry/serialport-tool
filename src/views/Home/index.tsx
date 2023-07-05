import { Layout } from 'antd'
import { Sidebar } from '../Sidebar'
import { ContentPage } from '../ContentPage'

export const Home = () => {
  return (
    <Layout>
      <Sidebar />
      <ContentPage />
    </Layout>
  )
}
