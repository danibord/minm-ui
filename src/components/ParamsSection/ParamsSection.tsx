import { METHOD, CommonParams } from "../../types"
import { methodOptions } from "./utils"
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

interface ParamsSectionProps {
  value: CommonParams
  onChange: (value: Partial<CommonParams>) => void
}

export function ParamsSection({ value, onChange }: ParamsSectionProps) {
  return (
    <Paper variant="outlined">
      <Stack p={2} gap={2}>
        <Typography fontWeight={700}>Общие параметры</Typography>
        <Divider />
        <TextField
          value={value.initial_time}
          type="number"
          onChange={(event) => {
            const newValue = event.target.value
            onChange({ initial_time: Number(newValue) })
          }}
          label="Начальное время, с:"
        />
        <TextField
          value={value.modeling_time}
          type="number"
          onChange={(event) => {
            const newValue = event.target.value
            onChange({ modeling_time: Number(newValue) })
          }}
          label="Время, с:"
        />
        <TextField
          value={value.time_step}
          type="number"
          onChange={(event) => {
            const newValue = event.target.value
            onChange({ time_step: Number(newValue) })
          }}
          label="Шаг, с:"
        />
        <FormControl>
          <InputLabel id="method-label">Метод</InputLabel>
          <Select
            labelId="method-label"
            value={value.ODE_method_name}
            onChange={(event) => {
              const newValue = event.target.value as METHOD
              onChange({ ODE_method_name: newValue })
            }}
            label="Метод"
          >
            {methodOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  )
}
