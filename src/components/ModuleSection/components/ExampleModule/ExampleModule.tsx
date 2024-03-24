import { TextField } from "@mui/material"

interface ExampleModuleData {
  first_field: number
  second_field: number
}

interface ExampleModuleProps {
  value: ExampleModuleData
  onChange: (newValue: Partial<ExampleModuleData>) => void
}

export function ExampleModule({ value, onChange }: ExampleModuleProps) {
  return (
    <>
      <TextField
        value={value?.first_field || 0}
        type="number"
        onChange={(event) => {
          const newValue = event.target.value
          onChange({ first_field: Number(newValue) })
        }}
        label="Первый параметр:"
      />
      <TextField
        value={value?.second_field || 0}
        type="number"
        onChange={(event) => {
          const newValue = event.target.value
          onChange({ second_field: Number(newValue) })
        }}
        label="Второй параметр:"
      />
    </>
  )
}
