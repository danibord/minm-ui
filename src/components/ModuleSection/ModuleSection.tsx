import { MODULE } from "../../types"
import { moduleOptions } from "./const"
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material"

interface ModuleSectionProps {
  module: MODULE
  onModuleChange: (newModule: MODULE) => void
  moduleData: unknown
  onModuleDataChange: (newData: unknown) => void
}

export function ModuleSection({ module, onModuleChange }: ModuleSectionProps) {
  return (
    <Paper variant="outlined">
      <Stack p={2} gap={2} height="100%">
        <FormControl>
          <InputLabel id="module-label">Расчетный модуль</InputLabel>
          <Select
            labelId="module-label"
            value={module}
            onChange={(event) => {
              const newValue = event.target.value as MODULE
              onModuleChange(newValue)
            }}
            label="Расчетный модуль"
          >
            {moduleOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider />
      </Stack>
    </Paper>
  )
}
