import { Card, Flex, Select } from "antd"
import { cardStyle } from "../../const"
import { MODULE } from "../../types"
import { moduleOptions } from "./const"

interface ModuleSectionProps<Module extends MODULE> {
  module: Module
  onModuleChange: (newModule: Module) => void
  moduleData: unknown
  onModuleDataChange: (newData: unknown) => void
}

export function ModuleSection<Module extends MODULE>({
  module,
  onModuleChange,
}: ModuleSectionProps<Module>) {
  return (
    <Card
      title="Расчетный модуль"
      style={{
        ...cardStyle,
        maxWidth: 500,
        flexGrow: 1,
      }}
    >
      <Flex vertical gap={16}>
        <Select
          options={moduleOptions}
          value={module}
          onChange={onModuleChange}
        />
      </Flex>
    </Card>
  )
}
