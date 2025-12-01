import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { buttonStyle } from '../styles'

export const BackHome = () => {
  return (
    <Link href={"/"}>
        <Button variant="contained" sx={buttonStyle }>
          Back home
        </Button>
      </Link>
  )
}
