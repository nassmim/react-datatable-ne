import { TableStyled } from './style'

import TableHead from './TableHead'
import TableBody from './TableBody'
import { TableColumn, DataRows } from '../../types/types'


const Table = ({
  data,
  columns,
  sortData,
  sortArrowsProps,
}: {
  data: DataRows
  columns: TableColumn[]
  sortData: (sortingField: string, sortingOrder: string) => void
  sortArrowsProps?: { [key: string]: any }
}) => {
  return (
    <TableStyled>
      <TableHead columns={columns} sortData={sortData} sortArrowsProps={sortArrowsProps} />
      <TableBody columns={columns} employees={data} />
    </TableStyled>
  )
}

export default Table
