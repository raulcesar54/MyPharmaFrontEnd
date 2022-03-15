import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import { Card } from 'components'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import IconButton from '@mui/material/IconButton'

import { api } from 'services'
import { Mark } from './types'
export const MarkCard = ({ data }: Mark) => {
  const [marks, setMarks] = useState(data || [])
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
  return (
    <>
      <Card title='Marca'>
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
      </Card>
    </>
  )
}
