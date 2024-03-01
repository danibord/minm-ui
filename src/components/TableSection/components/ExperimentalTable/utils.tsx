import { InputNumber } from "antd"

interface RowData {
  id: number
  time: number
  components: number[]
}

export function getExperimentalColumns(
  components: number,
  onCellChange: (row: number, column: number, value: number) => void,
) {
  return [
    {
      key: "Стадия",
      title: "Стадия",
      render: (_: number, __: RowData, index: number) => index + 1,
    },
    {
      key: "Время",
      title: "Время",
      dataIndex: "time",
      render: (cellValue: number, _: RowData, rowIndex: number) => (
        <InputNumber
          value={cellValue || 0}
          onChange={(newValue) => onCellChange(rowIndex, 0, newValue || 0)}
        />
      ),
    },
    ...Array.from({ length: components }).map((_, columnIndex) => ({
      key: columnIndex,
      dataIndex: ["components", columnIndex],
      title: `C${columnIndex}`,
      render: (cellValue: number, _: RowData, rowIndex: number) => (
        <InputNumber
          value={cellValue || 0}
          onChange={(newValue) =>
            onCellChange(rowIndex, columnIndex + 1, newValue || 0)
          }
        />
      ),
    })),
  ]
}

export function matrixToRows(matrix: number[][]) {
  return matrix.map(([time, ...components], index) => ({
    id: index,
    time,
    components,
  }))
}
