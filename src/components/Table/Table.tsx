import { EmployeesTableStyled } from './style'

import TableHead from './TableHead'
import TableBody from './TableBody'
import { TableColumn, DataRows } from '../../types/types'


const EmployeesTable = ({
  data,
  columns,
  sortData,
}: {
  data: DataRows
  columns: TableColumn[]
  sortData: (sortingField: string, sortingOrder: string) => void
}) => {
  return (
    <EmployeesTableStyled>
      <TableHead columns={columns} sortData={sortData} />
      <TableBody columns={columns} employees={data} />
    </EmployeesTableStyled>
  )
}

export default EmployeesTable
