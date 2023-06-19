import { useState } from 'react'
import { DataRow, DataRows } from '../../../types/types'

/**
 * Custom hook to update the data sorted on the specific column and order
 * @returns the sorted list along with the function to sort it and a boolean
 * informing the parent component that the list has been sorted
 */
const useSortTable = (
  data: DataRows = []
): [
  DataRows,
  (sortingField: string, sortingOrder: string) => void,
  boolean
] => {
  const [tableData, setTableData] = useState(data)
  const [hasBeenSorted, setHasBeenSorted] = useState(false)

  /**
   *
   * @param sortingField represents the column name to sort data on
   * @param sortingOrder indicates the ordering type. If its value is 'asc'
   * then the list is ordered ascendently
   * @returns nothing. Updates the table with the sorted one and the boolean
   * indicating if the table has been sorted or not
   */
  const sortData = (sortingField: string, sortingOrder: string): void => {
    const dataSorted = [...data].sort((a, b): number => {
      let result: number
      if (a[sortingField as keyof DataRow] === null) result = 1
      else if (b[sortingField as keyof DataRow] === null) result = -1
      else {
        result =
          a[sortingField as keyof DataRow]
            .toString()
            .localeCompare(b[sortingField as keyof DataRow].toString(), 'en', {
              numeric: true,
            }) * (sortingOrder === 'asc' ? 1 : -1)
      }

      return result
    })

    setHasBeenSorted(true)
    setTableData(dataSorted)
  }

  return [tableData, sortData, hasBeenSorted]
}

export default useSortTable
