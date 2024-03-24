import { ComponentType } from "react"

export interface TableParams {
  components: number
  stages: number
  experiments: number
}

export interface TableSectionData {
  stoichiometric_coefficients_matrix: number[][]
  exponents_of_substances_matrix: number[][]
  experimental_data_matrix: number[][]
  reaction_rate_constants: number[][]
}

export enum METHOD {
  EXPLICIT_EULER = "EXPLICIT_EULER",
  IMPLICIT_EULER = "IMPLICIT_EULER",
  SEMI_IMPLICIT_EULER = "SEMI_IMPLICIT_EULER",
  TRAPEZOID = "TRAPEZOID",
  MIDDLE_POINT = "MIDDLE_POINT",
  EXPLICIT_RK2 = "EXPLICIT_RK2",
  IMPLICIT_RK2 = "IMPLICIT_RK2",
  SEMI_IMPLICIT_RK2 = "SEMI_IMPLICIT_RK2",
  EXPLICIT_RK4 = "EXPLICIT_RK4",
  IMPLICIT_RK4 = "IMPLICIT_RK4",
  SEMI_IMPLICIT_RK4 = "SEMI_IMPLICIT_RK4",
  KUTTA_MERSON = "KUTTA_MERSON",
  EXPLICIT_2STEP_ADAMS = "EXPLICIT_2STEP_ADAMS",
}

export interface CommonParams {
  initial_time: number
  modeling_time: number
  time_step: number
  ODE_method_name: METHOD
}

export enum MODULE {
  NONE = "none",
  EXAMPLE = "example",
}

export interface ModuleData {
  [field: string]: unknown
}

export type ModuleComponent<Data extends ModuleData = ModuleData> =
  ComponentType<{
    value: Data
    onChange: (value: Partial<Data>) => void
  }>

export type RequestData = TableSectionData &
  CommonParams & { module_data?: ModuleData }

export interface CalculationResult {
  calculation_time: number
  kinetics_ODE_solution: number[][]
  numerical_errors_at_experimental_points: number[][]
  numerical_solutions_at_experimental_points: number[][]
  time_array: number[]
}
