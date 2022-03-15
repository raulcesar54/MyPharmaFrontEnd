import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'
import { FiActivity } from 'react-icons/fi'

interface Card {
  title: string
  maxWidth?: number
  children?: ReactNode
}

export const CardComponent = ({ title, children, maxWidth = 264 }: Card) => {
  return (
    <Card sx={{ maxWidth: maxWidth }}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#fff',
        }}
        action={
          <Button
            sx={{
              marginRight: '8px',
              maxHeight: '19px',
              minWidth: '36px',
              fontSize: '11px',
              borderRadius: '4px',
            }}
            variant='contained'
          >
            +
          </Button>
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
