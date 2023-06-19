import { useState } from 'react'
import { DataRow, DataRows } from '../types/types'

/**
 * Custom hook to update the data based on the filter value
 * @returns the filtered list along with the function to perform the filter
 */
const useSearch = ({
  data = [],
  fieldsSearched,
  searchOnFullWord,
}: {
  data: DataRows
  fieldsSearched: [keyof DataRow][]
  searchOnFullWord: boolean
}): [DataRows, (value: string) => void] => {
  const [tableData, setTableData] = useState(data)

  /**
   * Updates the state with the new list of data returned by the filtered array method
   * @param value representing the value to filter the data on
   * @returns nothing
   */
  const filter = (value: string) => {
    if (!value.length) {
      setTableData(data)
      return
    }

    const regexToMatch = searchOnFullWord
      ? new RegExp(`(\\s|^)${value}`, 'i')
      : new RegExp(`${value}`, 'i')

    const dataFound = data.reduce((listOfItems: DataRows, item: DataRow) => {
      /**
       * Determines if the element match the filter or not
       * @param isMatched
       * @returns
       */
      const keepValue = (isMatched: boolean) => {
        if (isMatched) {
          listOfItems.push(item)
          return false
        }
        return true
      }

      /* Since the user did not specify on which column to filter, 
      it is assumed all columns must be used*/
      if (!fieldsSearched.length) {
        Object.values(item).every((key) => {
          return keepValue(key.match(regexToMatch))
        })
      } else {
        // Columns to filter on have been specified, so we check the matching
        // only for these columns
        Object.values(item).every((key) => {
          return keepValue(
            fieldsSearched.includes(key) && key.match(regexToMatch)
          )
        })
      }

      return listOfItems
    }, [])

    setTableData(dataFound)
  }

  return [tableData, filter]
}

export default useSearch
