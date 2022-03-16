import {
  Box,
  Paper,
  ListItem,
  Typography,
  Grid,
  TextField,
  Card,
  styled,
} from '@mui/material'
import { Card as CardComponent } from 'components'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import { api } from 'services'
import { Product } from './types'
import Masonry from '@mui/lab/Masonry'
import { lineHeight } from '@mui/lab/node_modules/@mui/system'

const Item = styled(Card)(({ theme }) => ({
  h1: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fff',
    strong: {
      fontSize: '14px',
    },
  },
  h3: {
    fontSize: '14px',
    color: '#ffffff70',
    fontWeight: 'bold',
    wordWrap: 'break-word',
  },
  h6: {
    fontSize: '11px',
    color: '#ffffff70',
    fontWeight: '300',
    whiteSpace: 'wrap',
    marginTop: '8px',
    wordWrap: 'break-word',
    lineHeight: '142.7%',
  },
  '.container': {
    textAlign: 'left',
    marginBottom: '24px'
  },
  '.badge': {
    color: '#fff',
    fontSize: '9px',
    padding: '4px 16px',
  },
  '.mark': {
    background: '#7B61FF',
  },
  '.category': {
    background: '#FF61DC',
  },
  padding: '16px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const ProductCard = ({ data }: Product) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [category, setCategories] = useState(data || [])
  const [openModal, setOpenModal] = useState(false)

  async function handleFilterInformation(key: string) {
    try {
      const { data: markGetFromApi } = await api.get<Product>(
        `/product/category?search=${key}`
      )
      if (markGetFromApi) {
        setCategories(markGetFromApi?.data || [])
      }
    } catch (err) {
      console.log(err)
    }
  }
  {
    console.log(category)
  }

  return (
    <>
      <Box sx={{ width: '100%', maxHeight: 20 }}>
        <Masonry columns={3} spacing={2}>
          {category.map(
            ({
              name,
              _id,
              description,
              mark,
              price,
              productsCategory,
              stock,
            }) => {
              return (
                <Item key={_id}>
                  <Typography variant='h1'>
                    {price} <strong>R$</strong>
                  </Typography>
                  <div className='container'>
                    <Typography variant='h3'>{name}</Typography>
                    <Typography variant='h6'>{description}</Typography>
                  </div>
                  <Grid container gap={1}>
                    {productsCategory?.name && (
                      <Grid item>
                        <Typography className='badge category'>
                          {productsCategory?.name}
                        </Typography>
                      </Grid>
                    )}
                    {mark?.name && (
                      <Grid item>
                        <Typography className='badge mark'>
                          {mark?.name}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Item>
              )
            }
          )}
        </Masonry>
      </Box>
      {/* <CardComponent maxWidth="auto" title='Produto' onClick={() => setOpenModal(true)}>
        <TextField
          fullWidth
          label='buscar categorias'
          onChange={(event) => handleFilterInformation(event.target.value)}
        />
        <List>
          {category.map(({ name, _id }) => {
            return (
              <ListItem disablePadding key={_id}>
                <ListItemButton>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </CardComponent> */}
    </>
  )
}
