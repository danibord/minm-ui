import { Card, Table } from "antd"
import { getExponentsColumns, matrixToRows } from "./utils"
import { memo, useMemo } from "react"
import { useUpdateCellHandler } from "../../../../hooks/useUpdateCellHandler"
import { cardStyle } from "../../../../const"

interface ExponentsTableProps {
  components: number
  value: number[][]
  onChange: React.Dispatch<React.SetStateAction<number[][]>>
}

export const ExponentsTable = memo(
  ({ components, value, onChange }: ExponentsTableProps) => {
    const handleChange = useUpdateCellHandler(onChange)

    const columns = useMemo(
      () => getExponentsColumns(components, handleChange),
      [components, handleChange],
    )

    const rows = matrixToRows(value)

    return (
      <Card
        title="Матрица показателей степени"
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
