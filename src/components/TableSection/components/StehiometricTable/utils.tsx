import { InputNumber } from "antd"

interface RowData {
  id: number
  components: number[]
}

export function getStehiometricColumns(
  components: number,
  onCellChange: (row: number, column: number, value: number) => void,
) {
  return [
    {
      key: "Стадия",
      title: "Стадия",
      render: (_: number, __: RowData, index: number) => index + 1,
    },
    ...Array.from({ length: components }).map((_, columnIndex) => ({
      key: columnIndex,
      dataIndex: ["components", columnIndex],
      title: `C${columnIndex + 1}`,
      render: (cellValue: number, _: RowData, rowIndex: number) => (
        <InputNumber
          value={cellValue || 0}
          onChange={(newValue) =>
            onCellChange(rowIndex, columnIndex, newValue || 0)
          }
        />
      ),
    })),
  ]
}

export function matrixToRows(matrix: number[][]) {
  return matrix.map((values, index) => ({ id: index, components: values }))
}
