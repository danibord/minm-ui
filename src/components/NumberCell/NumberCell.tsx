import { Box, TextField } from "@mui/material"
import { useState } from "react"

interface NumberCellProps {
  value: number
  onChange: (value: number) => void
}

export function NumberCell({ value: _value, onChange }: NumberCellProps) {
  const [value, setValue] = useState(_value)
  return (
    <Box width="100%" height="100%" display="flex" alignItems="center">
      <TextField
        variant="standard"
        type="number"
        value={value}
        onChange={(event) => {
          const newValue = Number(event.target.value)
          setValue(newValue)
          onChange(newValue)
        }}
      />
    </Box>
  )
}
