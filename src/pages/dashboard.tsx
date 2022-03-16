import Grid from '@mui/material/Grid'
import { Mark, Category, Product } from 'layout'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { api } from 'services'

const Dashboard = ({ mark, productCategory, product }: any) => {
  return (
    <>
      <Grid container alignContent='center' justifyContent='center' gap={2}>
        <Grid item mt={5}>
          <Mark {...mark} />
        </Grid>
        <Grid item mt={5}>
          <Category {...productCategory} />
        </Grid>
        <Grid item mt={5} xs={6}>
          <Product {...product} />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth:token': token } = parseCookies(ctx)
  if (token) {
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
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
