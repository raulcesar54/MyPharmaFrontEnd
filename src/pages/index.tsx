/* eslint-disable @next/next/no-img-element */
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { FiLogIn } from 'react-icons/fi'
import { Stack } from '@mui/material'

const Home: NextPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required('email obrigatório'),
      password: yup.string().required(),
    })
    .required()

  const {
    register,
    handleSubmit: submit,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  function handleSubmit() {}
  return (
    <Grid
      sx={{
        backgroundImage: `url(/images/background_image.png)`,
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
      container
    >
      <Grid item xs={3.4} m={9} ml={14}>
        <img
          alt='logo mypharma'
          src='/images/logo.png'
          width='145px'
          height='40px'
          style={{ marginTop: '24px' }}
        />
        <Typography variant='h1' mt='24px' sx={{maxWidth: '300px'}}>
          Vamos mudar a forma como voçê gerencia seus produtos e medicamentos!
          <br />
          <Link>começe criando uma conta!</Link>
        </Typography>
        <form style={{ marginTop: '24px' }} onSubmit={submit(handleSubmit)}>
          <Grid container mt={4} gap='24px'>
            <Grid item xs={12} gap={1}>
              <TextField fullWidth label='Email' {...register('email')} />
              {errors.email && (
                <Alert severity='error' sx={{ marginTop: '8px' }}>
                  {errors.email?.message}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} gap={1}>
              <TextField
                fullWidth
                label='Password'
                type='password'
                {...register('password')}
              />
              {errors.password && (
                <Alert severity='error' sx={{ marginTop: '8px' }}>
                  {errors.password?.message}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!isValid}
                type='submit'
                variant='contained'
                sx={{ minHeight: '52px' }}
                fullWidth
              >
                <FiLogIn size={13} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default Home
