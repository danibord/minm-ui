import {
  TableSection,
  TableSectionRef,
  ParamsSection,
  ParamsSectionRef,
  ModuleSection,
  TableParamsSection,
  ResultSection,
} from "../../components"
import { Button, Card, Flex } from "antd"
import { useRef, useState } from "react"
import { MOCK_DATA, cardStyle, urls } from "../../const"
import axios from "axios"
import {
  CalculationResult,
  MODULE,
  RequestData,
  TableParams,
} from "../../types"

export function Root() {
  const [loading, setLoading] = useState(false)
  const tableRef = useRef<TableSectionRef>(null)
  const paramsRef = useRef<ParamsSectionRef>(null)

  const [module, setModule] = useState<MODULE>(MODULE.NONE)
  const [moduleData, setModuleData] = useState<unknown>()

  const [tableParams, setTableParams] = useState<TableParams>({
    components: 5,
    stages: 5,
    experiments: 5,
  })
  const handleTableParamsChange = (newParams: Partial<TableParams>) => {
    setTableParams((currentParams) => ({ ...currentParams, ...newParams }))
  }

  const [result, setResult] = useState<CalculationResult>()

  const onSubmit = async (requestData: RequestData) => {
    setLoading(true)
    try {
      const { data } = await axios.post<CalculationResult>(
        urls.solveKinetics,
        requestData,
      )
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  console.log({ result })

  return (
    <Card
      title="Моделирование в микрореакторах"
      style={{ ...cardStyle, margin: 16 }}
    >
      <Flex vertical gap={16} style={{ padding: 16 }}>
        <Flex gap={16}>
          <ParamsSection paramsRef={paramsRef} />
          <ModuleSection
            module={module}
            onModuleChange={setModule}
            moduleData={moduleData}
            onModuleDataChange={setModuleData}
          />
          <TableParamsSection
            value={tableParams}
            onChange={handleTableParamsChange}
          />
        </Flex>
        <TableSection {...tableParams} tableRef={tableRef} />
        <Flex gap={8}>
          <Button
            onClick={() => {
              if (!tableRef.current || !paramsRef.current) {
                return
              }
              const tables = tableRef.current.getData()
              const params = paramsRef.current.getData()
              onSubmit({ ...tables, ...params })
            }}
            loading={loading}
            style={{ flex: 1 }}
          >
            Решить
          </Button>
          <Button
            onClick={() => onSubmit(MOCK_DATA)}
            loading={loading}
            style={{ flex: 1 }}
          >
            Решить c заготовленными данными
          </Button>
        </Flex>
        {!!result && <ResultSection value={result} />}
      </Flex>
    </Card>
  )
}
