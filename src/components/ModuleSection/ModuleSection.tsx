import { MODULE, ModuleComponent, ModuleData } from "../../types"
import {
  COMPONENT_BY_MODULE,
  DEFAULT_VALUE_BY_MODULE,
  moduleOptions,
} from "./const"
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
  moduleData: ModuleData | null
  onModuleDataChange: (newData: ModuleData | null) => void
}

export function ModuleSection({
  module,
  onModuleChange,
  moduleData,
  onModuleDataChange,
}: ModuleSectionProps) {
  const Component = COMPONENT_BY_MODULE[module] as ModuleComponent | null

  const handleModuleDataChange = (newParams: Partial<ModuleData>) => {
    onModuleDataChange({ ...moduleData, ...newParams })
  }

  return (
    <Paper variant="outlined">
      <Stack p={2} gap={2} height="100%">
        <FormControl>
          <InputLabel id="module-label">Расчетный модуль</InputLabel>
          <Select
            labelId="module-label"
            value={module}
            onChange={(event, option) => {
              console.log({ option })
              const newValue = event.target.value as MODULE
              onModuleChange(newValue)
              onModuleDataChange(DEFAULT_VALUE_BY_MODULE[newValue])
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
        {!!(Component && moduleData) && (
          <Component value={moduleData} onChange={handleModuleDataChange} />
        )}
      </Stack>
    </Paper>
  )
}
