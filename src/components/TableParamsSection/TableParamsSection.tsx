import { Card, Flex, InputNumber } from "antd"
import { cardStyle } from "../../const"
import { TableParams } from "../../types"

interface ParamsSectionProps {
  value: TableParams
  onChange: (value: Partial<TableParams>) => void
}

export function TableParamsSection({
  value: { components, stages, experiments },
  onChange,
}: ParamsSectionProps) {
  return (
    <Card
      title="Параметры таблиц"
      style={{ ...cardStyle, width: "fit-content" }}
    >
      <Flex vertical gap={8} style={{ maxWidth: 300 }}>
        <InputNumber
          value={components}
          onChange={(value) => {
            onChange({ components: value || 0 })
          }}
          min={1}
          addonBefore="Количество компонентов:"
        />
        <InputNumber
          value={stages}
          onChange={(value) => {
            onChange({ stages: value || 0 })
          }}
          min={1}
          addonBefore="Количество стадий:"
        />
        <InputNumber
          value={experiments}
          onChange={(value) => {
            onChange({ experiments: value || 0 })
          }}
          min={1}
          addonBefore="Количество экспериментов:"
        />
      </Flex>
    </Card>
  )
}
