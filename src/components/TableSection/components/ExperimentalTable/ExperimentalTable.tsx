import { Card, Table } from "antd"
import { getExperimentalColumns, matrixToRows } from "./utils"
import { memo, useMemo } from "react"
import { useUpdateCellHandler } from "../../../../hooks/useUpdateCellHandler"
import { cardStyle } from "../../../../const"

interface ExperimentalTableProps {
  components: number
  value: number[][]
  onChange: React.Dispatch<React.SetStateAction<number[][]>>
}

export const ExperimentalTable = memo(
  ({ components, value, onChange }: ExperimentalTableProps) => {
    const handleChange = useUpdateCellHandler(onChange)

    const columns = useMemo(
      () => getExperimentalColumns(components, handleChange),
      [components, handleChange],
    )

    const rows = matrixToRows(value)

    return (
      <Card title="Экспериментальные данные" style={cardStyle}>
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
