import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material'
import { Card as CardComponent } from 'components'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiTrash } from 'react-icons/fi'
import { api } from 'services'
import * as yup from 'yup'
import { Mark } from './types'

export const MarkCard = ({ data }: Mark) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [marks, setMarks] = useState(data || [])
  const [openModal, setOpenModal] = useState(false)
  const schema = yup
    .object({
      name: yup.string().required('nome é obrigatório!'),
    })
    .required()

  const {
    register,
    reset,
    handleSubmit: submit,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  function hadleCloseModal() {
    setOpenModal(false)
    reset()
  }
  async function handleGetMarks() {
    try {
      const { data: markGetFromApi } = await api.get<Mark>('/mark')
      if (markGetFromApi) {
        setMarks(markGetFromApi?.data || [])
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function handleDelete(id: string) {
    const confirm = window.confirm(
      'tem certeza que deseja deletar está marca ?'
    )
    if (!confirm) return
    try {
      await api.delete(`/mark/${id}`)
      handleGetMarks()
    } catch (err) {
      console.log(err)
    }
  }
  async function handleFilterInformation(key: string) {
    try {
      const { data: markGetFromApi } = await api.get<Mark>(
        `/mark?search=${key}`
      )
      if (markGetFromApi) {
        setMarks(markGetFromApi?.data || [])
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function handleSubmit(values: { email: string; password: string }) {
    enqueueSnackbar('Fazendo login!', { variant: 'info' })
    try {
      await api.post('/mark', values)
      closeSnackbar()
      enqueueSnackbar('Bem vindo!', { variant: 'success' })
      hadleCloseModal()
      handleGetMarks()
    } catch (err) {
      closeSnackbar()
      enqueueSnackbar('Senha ou Email incorreto!', { variant: 'error' })
    }
  }

  return (
    <>
      <CardComponent title='Marca' onClick={() => setOpenModal(true)}>
        <TextField
          fullWidth
          label='buscar marca'
          onChange={(event) => handleFilterInformation(event.target.value)}
        />
        <List>
          {marks.map(({ name, _id }) => {
            return (
              <ListItem
                disablePadding
                key={_id}
                secondaryAction={
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => handleDelete(_id)}
                  >
                    <FiTrash size='10px' color='#ffffff70' />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </CardComponent>
      <Dialog
        open={openModal}
        onClose={hadleCloseModal}
        PaperProps={{
          style: {
            background: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <Card>
          <CardHeader
            title='Adicionar marca'
            titleTypographyProps={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          />
          <CardContent>
            <form onSubmit={submit(handleSubmit)}>
              <Grid container gap='24px'>
                <Grid item xs={12} gap={1}>
                  <TextField
                    fullWidth
                    label='Nome'
                    autoFocus
                    {...register('name')}
                  />
                  {errors.name && (
                    <Alert severity='error' sx={{ marginTop: '8px' }}>
                      {errors.name?.message}
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
                    salvar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </>
  )
}
