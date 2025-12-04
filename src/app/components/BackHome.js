import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { btnBlueGrey } from '../styles'

export const BackHome = () => {
  return (
    <Link href={"/"}>
        <Button variant="contained" sx={btnBlueGrey} fullWidth>
          Back home
        </Button>
      </Link>
  )
}
