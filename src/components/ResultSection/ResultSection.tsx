import { memo, useMemo } from "react"
import { CalculationResult } from "../../types"
import { Card } from "antd"
import { cardStyle } from "../../const"
import { Mix, MixConfig } from "@ant-design/plots"

interface ResultSectionProps {
  value: CalculationResult
  experimentalData: number[][]
}

interface ChartData {
  time: number
  value: number
  component: string
}

export const ResultSection = memo(
  ({ value, experimentalData }: ResultSectionProps) => {
    const lineData = useMemo(() => {
      const result: ChartData[] = []

      value.kinetics_ODE_solution.forEach((values, timeIndex) => {
        const time = value.time_array[timeIndex]
        values.forEach((value, index) => {
          result.push({ time, value, component: `Component ${index + 1}` })
        })
      })

      return result
    }, [value])

    const calculatedData = useMemo(() => {
      const result: ChartData[] = []

      value.numerical_solutions_at_experimental_points.forEach(
        ([time, ...values]) => {
          values.forEach((value, index) => {
            result.push({
              time,
              value,
              component: `Component ${index + 1}`,
            })
          })
        },
      )

      return result
    }, [value])

    const experimentalPlot = useMemo(() => {
      const result: ChartData[] = []

      experimentalData.forEach(([time, ...values]) => {
        values.forEach((value, index) => {
          result.push({
            time,
            value,
            component: `Component ${index + 1}`,
          })
        })
      })

      return result
    }, [experimentalData])

    const config = useMemo<MixConfig>(
      () => ({
        type: "view",
        children: [
          {
            type: "line",
            data: lineData,
            encode: {
              x: "time",
              y: "value",
              color: "component",
              shape: "smooth",
            },
          },
          {
            type: "point",
            data: calculatedData,
            encode: {
              x: "time",
              y: "value",
              color: "component",
            },
          },
          {
            type: "point",
            data: experimentalPlot,
            encode: {
              x: "time",
              y: "value",
              color: "component",
            },
          },
        ],
        axis: {
          x: { title: "Время, сек", size: 40 },
          y: { title: "Концентрация, моль/л", size: 36 },
        },
        slider: {
          x: { labelFormatter: "~s" },
          y: { labelFormatter: "~s" },
        },
      }),
      [calculatedData, experimentalPlot, lineData],
    )

    return (
      <Card title="Результат" style={cardStyle}>
        <Mix {...config} />
      </Card>
    )
  },
)
