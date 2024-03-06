import { memo } from "react"
import { CalculationResult } from "../../types"
import { Card } from "antd"
import { cardStyle } from "../../const"
import { Line } from "@ant-design/plots"

interface ResultSectionProps {
  value: CalculationResult
}

export const ResultSection = memo(({ value }: ResultSectionProps) => {
  const data: { time: number; value: number; component: string }[] = []
  value.kinetics_ODE_solution.forEach((values, timeIndex) => {
    const time = value.time_array[timeIndex]
    values.forEach((value, index) => {
      data.push({ time, value, component: `Component ${index + 1}` })
    })
  })
  const config = {
    data,
    xField: "time",
    yField: "value",
    legend: { size: false },
    colorField: "component",
  }
  return (
    <Card title="Результат" style={cardStyle}>
      <Line {...config} />
    </Card>
  )
})
