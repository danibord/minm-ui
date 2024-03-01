import { useCallback } from "react"

function updateMatrixCell<Value>({
  matrix,
  row,
  column,
  value,
}: {
  matrix: Value[][]
  row: number
  column: number
  value: Value
}) {
  return matrix.map((values, index) => {
    if (index !== row) {
      return values
    }

    const newValues = [...values]
    newValues[column] = value
    return newValues
  })
}

export function useUpdateCellHandler(
  onChange: React.Dispatch<React.SetStateAction<number[][]>>,
) {
  return useCallback(
    (row: number, column: number, newValue: number) => {
      onChange((currentValue) =>
        updateMatrixCell({
          matrix: currentValue,
          row,
          column,
          value: newValue,
        }),
      )
    },
    [onChange],
  )
}
