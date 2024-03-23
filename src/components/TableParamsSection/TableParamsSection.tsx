import { TableParams } from "../../types"
import { Divider, Paper, Stack, TextField, Typography } from "@mui/material"

interface ParamsSectionProps {
  value: TableParams
  onChange: (value: Partial<TableParams>) => void
}

export function TableParamsSection({
  value: { components, stages, experiments },
  onChange,
}: ParamsSectionProps) {
  return (
    <Paper variant="outlined">
      <Stack p={2} gap={2}>
        <Typography fontWeight={700}>Параметры таблиц</Typography>
        <Divider />
        <TextField
          value={components}
          type="number"
          onChange={(event) => {
            const newValue = event.target.value
            onChange({ components: Number(newValue) })
          }}
          label="Количество компонентов:"
        />
        <TextField
          value={stages}
          type="number"
          onChange={(event) => {
            const newValue = event.target.value
            onChange({ stages: Number(newValue) })
          }}
          label="Количество стадий:"
        />
        <TextField
          value={experiments}
          type="number"
          onChange={(event) => {
            const newValue = event.target.value
            onChange({ experiments: Number(newValue) })
          }}
          label="Количество экспериментов:"
        />
      </Stack>
    </Paper>
  )
}
