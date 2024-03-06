import { Card, Table } from "antd"
import { getStehiometricColumns, matrixToRows } from "./utils"
import { memo, useMemo } from "react"
import { useUpdateCellHandler } from "../../../../hooks/useUpdateCellHandler"
import { cardStyle } from "../../../../const"

interface StehiometricTableProps {
  components: number
  value: number[][]
  onChange: React.Dispatch<React.SetStateAction<number[][]>>
}

export const StehiometricTable = memo(
  ({ components, value, onChange }: StehiometricTableProps) => {
    const handleChange = useUpdateCellHandler(onChange)

    const columns = useMemo(
      () => getStehiometricColumns(components, handleChange),
      [components, handleChange],
    )

    const rows = matrixToRows(value)

    return (
      <Card
        title="Матрица стехиометрических коэффициентов"
        style={{ ...cardStyle, flexBasis: "50%", marginRight: 16 }}
      >
        <div style={{ overflow: "auto", height: 400 }}>
          <Table
            dataSource={rows}
            columns={columns}
            rowKey={(row) => row.id}
            pagination={false}
            bordered
          />
        </div>
      </Card>
    )
  },
)
