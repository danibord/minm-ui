import { Flex } from "antd"
import { useEffect, useImperativeHandle, useState } from "react"
import { getZeroMatrix, mergeMatrix } from "./utils"
import {
  StehiometricTable,
  ExponentsTable,
  ExperimentalTable,
  SpeedTable,
} from "./components"
import { TableParams, TableSectionData } from "../../types"

export interface TableSectionRef {
  getData: () => TableSectionData
}

interface TableSectionProps extends TableParams {
  tableRef: React.Ref<TableSectionRef>
}

export function TableSection({
  components,
  stages,
  experiments,
  tableRef,
}: TableSectionProps) {
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
      <Flex style={{ maxWidth: "100%" }}>
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
        <SpeedTable value={speedMatrix} onChange={setSpeedMatrix} />
      </Flex>
      <ExperimentalTable
        components={components}
        value={experimentalMatrix}
        onChange={setExperimentalMatrix}
      />
    </>
  )
}
