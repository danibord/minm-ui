import { memo, useMemo, useState } from "react"
import { CalculationResult } from "../../types"
import {
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  LineSeriesType,
  ResponsiveChartContainer,
  ScatterPlot,
  ScatterSeriesType,
} from "@mui/x-charts"
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material"
import { cheerfulFiestaPaletteLight } from "@mui/x-charts/colorPalettes"

interface ResultSectionProps {
  value: CalculationResult
  experimentalData: number[][]
}

const CONTAINER_HEIGHT = 600

export const ResultSection = memo(
  ({ value, experimentalData }: ResultSectionProps) => {
    const maxX = value.kinetics_ODE_solution.length

    const [xAxis, setXAxis] = useState<number[]>([0, maxX])
    const xAxisData = value.time_array.slice(xAxis[0], xAxis[1])

    const components = useMemo(
      () =>
        value.numerical_errors_at_experimental_points[0]
          .slice(1)
          .map((_, index) => ({
            label: `Component ${index + 1}`,
            color: cheerfulFiestaPaletteLight[index],
          })),
      [value],
    )

    const [componentsVisibility, setComponentsVisibility] = useState(() =>
      Array(components.length).fill(true),
    )

    const lines = useMemo(() => {
      const result: number[][] = []

      value.kinetics_ODE_solution
        .slice(xAxis[0], xAxis[1])
        .forEach((values, timePoint) => {
          values.forEach((value, index) => {
            if (timePoint === 0) {
              result.push([])
            }
            result[index].push(value)
          })
        })

      return result
    }, [value, xAxis])

    const calculatedPoints = useMemo(() => {
      const result: { x: number; y: number; id: string }[][] = []

      value.numerical_solutions_at_experimental_points.forEach(
        ([time, ...values], timePoint) => {
          values.forEach((value, index) => {
            if (timePoint === 0) {
              result.push([])
            }
            if (
              time >= xAxisData[xAxis[0]] &&
              time <= xAxisData[xAxis[1] - 1]
            ) {
              result[index].push({
                x: time,
                y: value,
                id: `Calculated ${index + 1} (${time}, ${value})`,
              })
            }
          })
        },
      )

      return result
    }, [value, xAxis, xAxisData])

    const experimentalPoints = useMemo(() => {
      const result: { x: number; y: number; id: string }[][] = []

      experimentalData.forEach(([time, ...values], timePoint) => {
        values.forEach((value, index) => {
          if (timePoint === 0) {
            result.push([])
          }

          if (time >= xAxisData[xAxis[0]] && time <= xAxisData[xAxis[1] - 1]) {
            result[index].push({
              x: time,
              y: value,
              id: `Experimental ${index + 1} (${time}, ${value})`,
            })
          }
        })
      })

      return result
    }, [experimentalData, xAxis, xAxisData])

    return (
      <>
        <Paper variant="outlined">
          <Stack gap={2} p={2}>
            <Typography fontWeight={700}>Результат</Typography>
            <Divider />
            <Stack direction="row" alignItems="center">
              <FormGroup sx={{ minWidth: 200 }}>
                <FormControlLabel
                  label="All"
                  control={
                    <Checkbox
                      checked={componentsVisibility.every(Boolean)}
                      indeterminate={
                        !componentsVisibility.every(Boolean) &&
                        componentsVisibility.some(Boolean)
                      }
                      onChange={(event) => {
                        const newValue = event.target.checked
                        setComponentsVisibility(
                          Array(componentsVisibility.length).fill(newValue),
                        )
                      }}
                    />
                  }
                />
                <Stack overflow="auto" maxHeight={CONTAINER_HEIGHT}>
                  {components.map((component, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          sx={{
                            color: cheerfulFiestaPaletteLight[index],
                            "&.Mui-checked": {
                              color: cheerfulFiestaPaletteLight[index],
                            },
                          }}
                          checked={componentsVisibility[index]}
                          onChange={(event) => {
                            const newValue = event.target.checked
                            const newComponentVisibility = [
                              ...componentsVisibility,
                            ]
                            newComponentVisibility[index] = newValue
                            setComponentsVisibility(newComponentVisibility)
                          }}
                        />
                      }
                      label={component.label}
                    />
                  ))}
                </Stack>
              </FormGroup>
              <Stack width="100%">
                <ResponsiveChartContainer
                  height={CONTAINER_HEIGHT}
                  colors={cheerfulFiestaPaletteLight}
                  series={[
                    ...(experimentalPoints
                      .map((values, index) =>
                        componentsVisibility[index]
                          ? ({
                              id: `Experimental ${index + 1}`,
                              data: values,
                              type: "scatter",
                              color: cheerfulFiestaPaletteLight[index],
                              valueFormatter: ({ y }) =>
                                `Experimental value: ${y}`,
                            } as ScatterSeriesType)
                          : null,
                      )
                      .filter(Boolean) as ScatterSeriesType[]),
                    ...(calculatedPoints
                      .map((values, index) =>
                        componentsVisibility[index]
                          ? ({
                              id: `Calculated ${index + 1}`,
                              data: values,
                              type: "scatter",
                              color: cheerfulFiestaPaletteLight[index],
                              valueFormatter: ({ y }) =>
                                `Calculated value: ${y}`,
                            } as ScatterSeriesType)
                          : null,
                      )
                      .filter(Boolean) as ScatterSeriesType[]),
                    ...(lines
                      .map((values, index) =>
                        componentsVisibility[index]
                          ? ({
                              data: values,
                              type: "line",
                              color: cheerfulFiestaPaletteLight[index],
                            } as LineSeriesType)
                          : null,
                      )
                      .filter(Boolean) as LineSeriesType[]),
                  ]}
                  xAxis={[
                    {
                      data: xAxisData,
                      scaleType: "linear",
                      id: "x-axis-id",
                    },
                  ]}
                >
                  <LinePlot />
                  <ScatterPlot />
                  <ChartsXAxis
                    label="Время, сек"
                    position="bottom"
                    axisId="x-axis-id"
                  />
                  <ChartsYAxis label="Концентрация, моль/л" position="left" />
                  <ChartsLegend direction="row" />
                  <ChartsTooltip trigger="item" />
                </ResponsiveChartContainer>
                <Slider
                  getAriaLabel={() => "Time"}
                  value={xAxis}
                  onChange={(_event, newValue) => {
                    setXAxis(newValue as number[])
                  }}
                  min={0}
                  max={maxX}
                />
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </>
    )
  },
)
