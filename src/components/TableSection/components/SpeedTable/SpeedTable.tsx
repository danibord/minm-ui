import { Card, Table } from "antd"
import { getColumns, matrixToRows } from "./utils"
import { memo, useMemo } from "react"
import { useUpdateCellHandler } from "../../../../hooks/useUpdateCellHandler"
import { cardStyle } from "../../../../const"

interface SpeedTableProps {
  value: number[][]
  onChange: React.Dispatch<React.SetStateAction<number[][]>>
}

export const SpeedTable = memo(({ value, onChange }: SpeedTableProps) => {
  const handleChange = useUpdateCellHandler(onChange)

  const columns = useMemo(() => getColumns(handleChange), [handleChange])

  const rows = matrixToRows(value)

  return (
    <Card title="Константы скорости" style={cardStyle}>
      <div style={{ overflow: "auto", height: 400 }}>
        <Table
          dataSource={rows}
          columns={columns}
          rowKey={(_, index) => index || 0}
          pagination={false}
          bordered
        />
      </div>
    </Card>
  )
})
