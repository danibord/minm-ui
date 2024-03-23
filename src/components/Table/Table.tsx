import { Box, Divider, Paper, Stack, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { memo } from "react"

interface TableProps<Data extends { id: number }> {
  label: string
  data: Data[]
  columns: GridColDef<Data>[]
}

function TableCore<Data extends { id: number }>({
  label,
  data,
  columns,
}: TableProps<Data>) {
  return (
    <Paper variant="outlined">
      <Stack gap={2} p={2}>
        <Typography fontWeight={700}>{label}</Typography>
        <Divider />
        <Box height={400} width="100%">
          <DataGrid
            columns={columns}
            rows={data}
            disableColumnSorting
            disableColumnFilter
            disableRowSelectionOnClick
            disableColumnMenu
            rowBufferPx={100}
            hideFooter
          />
        </Box>
      </Stack>
    </Paper>
  )
}

export const Table = memo(TableCore)
