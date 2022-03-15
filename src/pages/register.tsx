/* eslint-disable @next/next/no-img-element */
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { api } from 'services'
import * as yup from 'yup'

interface SaveProps {
  email: string
  password: string
  name: string
}

const Home: NextPage = () => {
  const [showPassword, setShowPassword] = useState(true)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { push } = useRouter()
  const schema = yup
    .object({
      email: yup.string().email().required('email obrigatório'),
      name: yup.string().required('campo obrigatório'),
      password: yup.string().required('campo obrigatório'),
      confirmPassword: yup
        .string()
        .required('campo obrigatório')
        .oneOf([yup.ref('password'), null], 'As senhas não são iguais'),
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
  async function handleSubmit(values: SaveProps) {
    enqueueSnackbar('Criando usuario!', { variant: 'info' })
    try {
      await api.post('/user', values)
      closeSnackbar()
      enqueueSnackbar('Novo usuario criado com sucesso!', {
        variant: 'success',
      })
      push('/')
    } catch (err) {
      closeSnackbar()
      enqueueSnackbar('Senha ou Email incorreto!', { variant: 'error' })
    }
  }
  return (
    <Grid
      sx={{
        backgroundImage: `url(/images/background_image.png)`,
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        overflowX: 'hidden',
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
          <Link onClick={() => push('/')}>começe criando uma conta!</Link>
        </Typography>
        <form style={{ marginTop: '24px' }} onSubmit={submit(handleSubmit)}>
          <Grid container mt={4} gap='24px'>
            <Grid item xs={12} gap={1}>
              <TextField fullWidth label='Nome' {...register('name')} />
              {errors.name && (
                <Alert severity='error' sx={{ marginTop: '8px' }}>
                  {errors.name?.message}
                </Alert>
              )}
            </Grid>
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
                label='Senha'
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
            <Grid item xs={12} gap={1}>
              <TextField
                fullWidth
                label='Confirmar senha'
                type={showPassword ? 'password' : 'text'}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <Alert severity='error' sx={{ marginTop: '8px' }}>
                  {errors.confirmPassword?.message}
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
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default Home
