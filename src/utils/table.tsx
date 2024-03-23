export function mergeMatrix(currentMatrix: number[][], newMatrix: number[][]) {
  return newMatrix.map((values, rowIndex) =>
    !currentMatrix[rowIndex]
      ? values
      : values.map(
          (value, colIndex) => currentMatrix[rowIndex]?.[colIndex] ?? value,
        ),
  )
}

export function getZeroMatrix(rows: number, columns: number) {
  return Array.from({ length: rows }).map(
    () => Array.from({ length: columns }).fill(0) as number[],
  )
}
