import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { ReactNode } from 'react'

interface Card {
  title: string
  maxWidth?: number
  children?: ReactNode
  onClick: () => void
}

export const CardComponent = ({
  title,
  children,
  maxWidth = 264,
  onClick,
}: Card) => {
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
            onClick={onClick}
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
