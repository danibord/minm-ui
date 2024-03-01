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
  MIDDLE = "MIDDLE",
  EXPLICIT_RK2 = "EXPLICIT_RK2",
  IMPLICIT_RK2 = "IMPLICIT_RK2",
  SEMI_IMPLICIT_RK2 = "SEMI_IMPLICIT_RK2",
  EXPLICIT_RK4 = "EXPLICIT_RK4",
  IMPLICIT_RK4 = "IMPLICIT_RK4",
  SEMI_IMPLICIT_RK4 = "SEMI_IMPLICIT_RK4",
  KM = "KM",
  EXPLICIT_ADAMS = "EXPLICIT_ADAMS",
}

export interface ParamsData {
  initial_time: number
  time: number
  step: number
  method: METHOD
}
