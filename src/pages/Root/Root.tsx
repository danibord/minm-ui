import {
  TableSection,
  TableSectionRef,
  ParamsSection,
  ParamsSectionRef,
} from "../../components"
import { Button, Card, Flex } from "antd"
import { useRef } from "react"
import { cardStyle } from "../../const"

export function Root() {
  const tableRef = useRef<TableSectionRef>(null)
  const paramsRef = useRef<ParamsSectionRef>(null)

  const onSubmit = () => {
    if (!tableRef.current || !paramsRef.current) {
      return
    }

    const tables = tableRef.current.getData()
    const params = paramsRef.current.getData()
    console.log({ tables, params })
  }

  return (
    <Flex gap={16} style={{ padding: 16 }}>
      <Card
        style={{
          ...cardStyle,
          width: "30%",
          height: "fit-content",
        }}
      >
        <Flex vertical gap={16}>
          <ParamsSection paramsRef={paramsRef} />
          <Button onClick={onSubmit}>Решить</Button>
        </Flex>
      </Card>
      <Flex vertical gap={16} style={{ width: "70%" }}>
        <TableSection tableRef={tableRef} />
      </Flex>
    </Flex>
  )
}
