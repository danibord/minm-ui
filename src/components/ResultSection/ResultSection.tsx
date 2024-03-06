import { memo, useMemo } from "react"
import { CalculationResult } from "../../types"
import { Card } from "antd"
import { cardStyle } from "../../const"
import { Line } from "@ant-design/plots"

interface ResultSectionProps {
  value: CalculationResult
}

export const ResultSection = memo(({ value }: ResultSectionProps) => {
  const data = useMemo(() => {
    const result: { time: number; value: number; component: string }[] = []
    value.kinetics_ODE_solution.forEach((values, timeIndex) => {
      const time = value.time_array[timeIndex]
      values.forEach((value, index) => {
        result.push({ time, value, component: `Component ${index + 1}` })
      })
    })
    return result
  }, [value])

  const config = useMemo(
    () => ({
      data,
      xField: "time",
      yField: "value",
      shapeField: "smooth",
      axis: {
        x: { title: "Время, сек", size: 40 },
        y: { title: "Концентрация, моль/л", size: 36 },
      },
      slider: {
        x: { labelFormatter: "~s" },
        y: { labelFormatter: "~s" },
      },
      colorField: "component",
    }),
    [data],
  )

  return (
    <Card title="Результат" style={cardStyle}>
      <Line {...config} />
    </Card>
  )
})
