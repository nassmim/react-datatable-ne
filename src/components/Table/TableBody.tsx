import { DataRow, DataRows } from '../../types/types'
import { TableColumn } from '../../types/types'

const TableBody = ({
  employees,
  columns,
}: {
  employees: DataRows
  columns: TableColumn[]
}) => {
  return (
    <tbody>
      {employees.map((employee: DataRow, index: number) => (
        <tr key={`${index}-${employee.firstName}`}>
          {columns.map(({ accessor }, index) => {
            const value = employee[accessor as keyof DataRow]
              ? employee[accessor as keyof DataRow]
              : '——'
            return <td key={index}>{value}</td>
          })}
        </tr>
      ))}
    </tbody>
  )
}
export default TableBody
