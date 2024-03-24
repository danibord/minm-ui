import {
  ParamsSection,
  ModuleSection,
  TableParamsSection,
  ResultSection,
  Table,
} from "../../components"
import { useState } from "react"
import { MOCK_DATA, URL_BY_MODULE } from "../../const"
import axios from "axios"
import {
  CalculationResult,
  MODULE,
  CommonParams,
  RequestData,
  TableParams,
  METHOD,
} from "../../types"
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useStoichiometricMatrix } from "../../hooks"
import { useExponentsMatrix } from "../../hooks/useExponentsMatrix"
import { useSpeedMatrix } from "../../hooks/useSpeedMatrix"
import { useExperimentalMatrix } from "../../hooks/useExperimentalMatrix"

export function Root() {
  const [loading, setLoading] = useState(false)

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

  const [commonParams, setCommonParams] = useState<CommonParams>({
    initial_time: 0,
    modeling_time: 0,
    time_step: 0,
    ODE_method_name: METHOD.EXPLICIT_EULER,
  })
  const handleCommonParamsChange = (newParams: Partial<CommonParams>) => {
    setCommonParams((currentParams) => ({ ...currentParams, ...newParams }))
  }

  const {
    value: stoichiometric_coefficients_matrix,
    tableData: stoichiometricData,
    columns: stoichiometricColumns,
  } = useStoichiometricMatrix(tableParams.stages, tableParams.components)
  const {
    value: exponents_of_substances_matrix,
    tableData: exponentsData,
    columns: exponentsColumns,
  } = useExponentsMatrix(tableParams.stages, tableParams.components)
  const {
    value: reaction_rate_constants,
    tableData: speedData,
    columns: speedColumns,
  } = useSpeedMatrix(tableParams.stages)
  const {
    value: experimental_data_matrix,
    tableData: experimentalTableData,
    columns: experimentalColumns,
  } = useExperimentalMatrix(tableParams.stages, tableParams.components + 1)

  const [result, setResult] = useState<CalculationResult>()
  const [fixedExperimentalData, setFixedExperimentalData] = useState<
    number[][]
  >([])

  const onSubmit = async (requestData: RequestData) => {
    setLoading(true)
    try {
      const { data } = await axios.post<CalculationResult>(
        URL_BY_MODULE[module],
        requestData,
      )
      setResult(data)
      setFixedExperimentalData(requestData.experimental_data_matrix)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box p={2}>
      <Paper variant="outlined">
        <Stack gap={2} p={2}>
          <Typography>Моделирование в микрореакторах</Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ParamsSection
                value={commonParams}
                onChange={handleCommonParamsChange}
              />
            </Grid>
            <Grid item xs={4}>
              <ModuleSection
                module={module}
                onModuleChange={setModule}
                moduleData={moduleData}
                onModuleDataChange={setModuleData}
              />
            </Grid>
            <Grid item xs={4}>
              <TableParamsSection
                value={tableParams}
                onChange={handleTableParamsChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Table
                label="Матрица стехиометрических коэффициентов"
                data={stoichiometricData}
                // Here is some TypeScript bug
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                columns={stoichiometricColumns as any}
              />
            </Grid>
            <Grid item xs={6}>
              <Table
                label="Матрица показателей степени"
                data={exponentsData}
                // Here is some TypeScript bug
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                columns={exponentsColumns as any}
              />
            </Grid>
            <Grid item xs={3}>
              <Table
                label="Константы скорости"
                data={speedData}
                // Here is some TypeScript bug
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                columns={speedColumns as any}
              />
            </Grid>
            <Grid item xs={9}>
              <Table
                label="Экспериментальные данные"
                data={experimentalTableData}
                // Here is some TypeScript bug
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                columns={experimentalColumns as any}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                fullWidth
                variant="outlined"
                onClick={() => {
                  onSubmit({
                    ...commonParams,
                    stoichiometric_coefficients_matrix,
                    exponents_of_substances_matrix,
                    reaction_rate_constants,
                    experimental_data_matrix,
                  })
                }}
                disabled={loading}
              >
                Решить
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                fullWidth
                variant="outlined"
                onClick={() => onSubmit(MOCK_DATA)}
                disabled={loading}
              >
                Решить c заготовленными данными
              </Button>
            </Grid>
            {!!result && (
              <Grid item xs={12}>
                <ResultSection
                  value={result}
                  experimentalData={fixedExperimentalData}
                />
              </Grid>
            )}
          </Grid>
        </Stack>
      </Paper>
    </Box>
  )
}
