import { useMemo } from "react"
import { useTableData } from "."
import { GridColDef } from "@mui/x-data-grid"
import { NumberCell } from "../components"

function getTableData(matrix: number[][]) {
  return matrix.map(([speed], index) => ({ id: index, speed }))
}
function getColumns(
  onCellChange: (row: number, column: number, value: number) => void,
) {
  const columns: GridColDef<{ id: number; speed: number }>[] = [
    { field: "id", headerName: "Стадия", valueGetter: (value) => value + 1 },
    {
      field: `speed`,
      headerName: "Скорость",
      renderCell: ({ value, row, field }) => {
        const rowIndex = row.id
        const colIndex = Number(field)

        return (
          <NumberCell
            value={value}
            onChange={(newValue) => {
              onCellChange(rowIndex, colIndex, newValue)
            }}
          />
        )
      },
      valueGetter: (_, row) => {
        const value = row.speed
        return value || 0
      },
    },
  ]

  return columns
}

export function useSpeedMatrix(stages: number) {
  const [value, handleCellChange] = useTableData(stages, 1)

  const tableData = useMemo(() => getTableData(value), [value])

  const columns = useMemo(
    () => getColumns(handleCellChange),
    [handleCellChange],
  )

  return { value, tableData, columns }
}
