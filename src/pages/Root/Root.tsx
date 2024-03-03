import {
  TableSection,
  TableSectionRef,
  ParamsSection,
  ParamsSectionRef,
} from "../../components"
import { Button, Card, Flex } from "antd"
import { useRef, useState } from "react"
import { MOCK_DATA, cardStyle, urls } from "../../const"
import axios from "axios"

export function Root() {
  const [loading, setLoading] = useState(false)
  const tableRef = useRef<TableSectionRef>(null)
  const paramsRef = useRef<ParamsSectionRef>(null)

  const onSubmit = async () => {
    if (!tableRef.current || !paramsRef.current) {
      return
    }

    const tables = tableRef.current.getData()
    const params = paramsRef.current.getData()
    const data = MOCK_DATA || { ...tables, ...params }

    setLoading(true)
    try {
      const result = await axios.post(urls.solveKinetics, data)
      console.log({ data, result: result.data })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      title="Моделирование в микрореакторах"
      style={{ ...cardStyle, margin: 16 }}
    >
      <Flex vertical gap={16} style={{ padding: 16 }}>
        <TableSection tableRef={tableRef} />
        <Card
          style={{
            ...cardStyle,
            // width: "calc(30% - 8px)",
            maxWidth: 500,
            flexGrow: 1,
            height: "fit-content",
          }}
        >
          <Flex vertical gap={16}>
            <ParamsSection paramsRef={paramsRef} />
            <Button onClick={onSubmit} loading={loading}>
              Решить
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Card>
  )
}
