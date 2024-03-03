export const cardStyle = {
  boxShadow: "1px 1px 10px",
}

export const tableStyle = {
  minWidth: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
  // flexBasis: "50%",
  flex: 1,
}

const rootUrl = "http://localhost:8000/api/v1"

export const urls = {
  solveKinetics: `${rootUrl}/reaction_kinetics_solver`,
}

export const MOCK_DATA = {
  stoichiometric_coefficients_matrix: [
    [-1, -1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, -1, -1, -1, 0, 0, 0, 0, 0],
    [0, 0, -1, 0, 0, -1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, -1, -1, 0, 0],
    [0, -1, 0, 1, 1, 0, -1, 0, 1, 0],
    [0, 1, 0, -1, -1, 0, 1, 0, -1, 0],
    [0, 0, 0, 0, 0, -1, 0, 1, -1, 1],
    [0, 0, 0, 0, 0, 1, 0, -1, 1, -1],
  ],
  exponents_of_substances_matrix: [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  ],
  experimental_data_matrix: [
    [0, 3.007, 16, 0, 0, 0, 3.233, 0, 0, 0, 0],
    [0.2, 2.587, 0, 0, 0, 0, 0, 0.229, 0, 0, 0.001],
    [0.5, 2.044, 0, 0, 0, 0, 0, 0.597, 0, 0, 0.005],
    [1, 1.925, 0, 0, 0, 0, 0, 0.839, 0, 0, 0.007],
    [2, 1.253, 0, 0, 0, 0, 0, 1.573, 0, 0, 0.03],
    [4, 0.835, 0, 0, 0, 0, 0, 2.12, 0, 0, 0.053],
  ],
  reaction_rate_constants: [
    [0.671],
    [3.34],
    [4.3],
    [0.017],
    [0.78],
    [2.44],
    [0.88],
    [1.95],
  ],
  initial_time: 0,
  modeling_time: 60,
  time_step: 0.1,
  ODE_method_name: "EXPLICIT_EULER",
}
