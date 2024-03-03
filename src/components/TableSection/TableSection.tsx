import { Card, Flex, InputNumber } from "antd"
import { useEffect, useImperativeHandle, useState } from "react"
import { getZeroMatrix, mergeMatrix } from "./utils"
import {
  StehiometricTable,
  ExponentsTable,
  ExperimentalTable,
  SpeedTable,
} from "./components"
import { TableSectionData } from "../../types"
import { cardStyle } from "../../const"

export interface TableSectionRef {
  getData: () => TableSectionData
}

interface TableSectionProps {
  tableRef: React.Ref<TableSectionRef>
}

export function TableSection({ tableRef }: TableSectionProps) {
  const [components, setComponents] = useState(5)
  const [stages, setStages] = useState(5)
  const [experiments, setExperiments] = useState(5)

  const [stehiometricMatrix, setStehiometricMatrix] = useState<number[][]>([[]])
  const [exponentsMatrix, setExponentsMatrix] = useState<number[][]>([])
  const [experimentalMatrix, setExperimentalMatrix] = useState<number[][]>([])
  const [speedMatrix, setSpeedMatrix] = useState<number[][]>([])

  useImperativeHandle(tableRef, () => ({
    getData: () => ({
      stoichiometric_coefficients_matrix: stehiometricMatrix,
      exponents_of_substances_matrix: exponentsMatrix,
      experimental_data_matrix: experimentalMatrix,
      reaction_rate_constants: speedMatrix,
    }),
  }))

  // Update stehiometric and exponents (depends on stages and components)
  useEffect(() => {
    const newMatrix = getZeroMatrix(stages, components)
    setStehiometricMatrix((currentMatrix) =>
      mergeMatrix(currentMatrix, newMatrix),
    )
    setExponentsMatrix((currentMatrix) => mergeMatrix(currentMatrix, newMatrix))
  }, [components, stages])

  // Update stehiometric and exponents (depends on stages and components + time column)
  useEffect(() => {
    const newMatrix = getZeroMatrix(experiments, components + 1)
    setExperimentalMatrix((currentMatrix) =>
      mergeMatrix(currentMatrix, newMatrix),
    )
  }, [components, experiments])

  // Update speedMatrix (depends on stages only)
  useEffect(() => {
    const newMatrix = getZeroMatrix(stages, 1)
    setSpeedMatrix((currentMatrix) => mergeMatrix(currentMatrix, newMatrix))
  }, [stages])

  return (
    <>
      <Card
        title="Параметры таблиц"
        style={{ ...cardStyle, width: "fit-content" }}
      >
        <Flex vertical gap={8} style={{ maxWidth: 300 }}>
          <InputNumber
            value={components}
            onChange={(value) => setComponents(Math.floor(value || 0))}
            min={1}
            addonBefore="Количество компонентов:"
          />
          <InputNumber
            value={stages}
            onChange={(value) => setStages(value || 0)}
            min={1}
            addonBefore="Количество стадий:"
          />
          <InputNumber
            value={experiments}
            onChange={(value) => setExperiments(value || 0)}
            min={1}
            addonBefore="Количество экспериментов:"
          />
        </Flex>
      </Card>
      <Flex gap={16} wrap="wrap">
        <StehiometricTable
          components={components}
          value={stehiometricMatrix}
          onChange={setStehiometricMatrix}
        />
        <ExponentsTable
          components={components}
          value={exponentsMatrix}
          onChange={setExponentsMatrix}
        />
        <ExperimentalTable
          components={components}
          value={experimentalMatrix}
          onChange={setExperimentalMatrix}
        />
        <SpeedTable value={speedMatrix} onChange={setSpeedMatrix} />
      </Flex>
    </>
  )
}
