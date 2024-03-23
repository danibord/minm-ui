import { useMemo } from "react"
import { useTableData } from "."
import { GridColDef } from "@mui/x-data-grid"
import { NumberCell } from "../components"

function getTableData(matrix: number[][]) {
  return matrix.map(([time, ...values], index) => ({
    id: index,
    time,
    components: values,
  }))
}
function getColumns(
  columnsCount: number,
  onCellChange: (row: number, column: number, value: number) => void,
) {
  const columns: GridColDef<{
    id: number
    time: number
    components: number[]
  }>[] = [
    { field: "id", headerName: "Стадия", valueGetter: (value) => value + 1 },
    {
      field: "time",
      headerName: "Время",
      renderCell: ({ value, row }) => {
        const rowIndex = row.id

        return (
          <NumberCell
            value={value}
            onChange={(newValue) => {
              onCellChange(rowIndex, 0, newValue)
            }}
          />
        )
      },
      valueGetter: (_, row) => {
        const value = row.time
        return value || 0
      },
    },
  ]

  for (let i = 0; i < columnsCount; i++) {
    columns.push({
      field: `${i}`,
      headerName: `C${i + 1}`,
      renderCell: ({ value, row, field }) => {
        const rowIndex = row.id
        const colIndex = Number(field) + 1

        return (
          <NumberCell
            value={value}
            onChange={(newValue) => {
              onCellChange(rowIndex, colIndex, newValue)
            }}
          />
        )
      },
      valueGetter: (_, row, column) => {
        const value = row.components[Number(column.field)]
        return value || 0
      },
    })
  }

  return columns
}

export function useExperimentalMatrix(stages: number, components: number) {
  const [value, handleCellChange] = useTableData(stages, components)

  const tableData = useMemo(() => getTableData(value), [value])

  const columns = useMemo(
    () => getColumns(components, handleCellChange),
    [handleCellChange, components],
  )

  return { value, tableData, columns }
}
