/* eslint-disable @next/next/no-img-element */
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { api } from 'services'
import * as yup from 'yup'
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack'

const Home: NextPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)

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
  async function handleSubmit(values: { email: string; password: string }) {
    enqueueSnackbar('Fazendo login!', { variant: 'info' })
    try {
      const { data } = await api.post<{
        data: {
          token: string
          user: {
            id: string
            email: string
          }
        }
      }>('/auth', values)
      console.log(data?.data.token)
      closeSnackbar()
      enqueueSnackbar('Bem vindo!', { variant: 'success' })
    } catch (err) {
      closeSnackbar()
      enqueueSnackbar('Senha ou Email incorreto!', { variant: 'error' })
    }
  }
  const select = useSelector((e) => console.log(e))
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
      <Grid item md={3.3} xs={12} m={{ md: 9, xs: 3 }} ml={14}>
        <img
          alt='logo mypharma'
          src='/images/logo.png'
          width='145px'
          height='40px'
          style={{ marginTop: '24px' }}
        />
        <Typography variant='h1' mt='24px' sx={{ maxWidth: '300px' }}>
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
                type={showPassword ? 'password' : 'text'}
                InputProps={{
                  endAdornment: showPassword ? (
                    <FiEye
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FiEyeOff
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(true)}
                    />
                  ),
                }}
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
