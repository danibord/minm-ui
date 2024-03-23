import { useEffect, useState } from "react"
import { useUpdateCellHandler } from "./useUpdateCellHandler"
import { getZeroMatrix, mergeMatrix } from "../utils/table"

export function useTableData(
  rows: number,
  columns: number,
): [number[][], (row: number, column: number, value: number) => void] {
  const [data, setData] = useState<number[][]>([])
  const updateCell = useUpdateCellHandler(setData)

  useEffect(() => {
    const newMatrix = getZeroMatrix(rows, columns)
    setData((currentData) => mergeMatrix(currentData, newMatrix))
  }, [columns, rows])

  return [data, updateCell]
}
