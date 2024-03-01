import { InputNumber } from "antd"

interface RowData {
  id: number
  speed: number
}

export function getColumns(
  onCellChange: (row: number, column: number, value: number) => void,
) {
  return [
    {
      key: "Стадия",
      title: "Стадия",
      render: (_: number, __: RowData, index: number) => index + 1,
    },
    {
      key: "Скорость",
      title: "Скорость",
      dataIndex: "speed",
      render: (cellValue: number, _: RowData, rowIndex: number) => (
        <InputNumber
          value={cellValue || 0}
          onChange={(newValue) => onCellChange(rowIndex, 0, newValue || 0)}
        />
      ),
    },
  ]
}

export function matrixToRows(matrix: number[][]) {
  return matrix.map(([speed], index) => ({
    id: index,
    speed,
  }))
}
