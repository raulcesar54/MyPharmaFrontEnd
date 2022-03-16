import { Mark, Category } from 'layout'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { api } from 'services'

const Dashboard = ({ mark, productCategory, product }: any) => {
  return (
    <>
      <Mark {...mark} />
      <Category {...productCategory} />
    </>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth:token': token } = parseCookies(ctx)
  const { data: dataToken } = JSON.parse(token)
  const { data: mark } = await api.get(
    '/mark',
    {},
    {
      headers: { Authorization: `Bearer ${dataToken.token}` },
    }
  )
  const { data: productCategory } = await api.get(
    '/product/category',
    {},
    {
      headers: { Authorization: `Bearer ${dataToken.token}` },
    }
  )
  const { data: product } = await api.get(
    '/product',
    {},
    {
      headers: { Authorization: `Bearer ${dataToken.token}` },
    }
  )
  return {
    props: { mark, productCategory, product },
  }
}
