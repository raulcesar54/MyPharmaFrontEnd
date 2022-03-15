import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { ReactNode } from 'react'

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
      />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
