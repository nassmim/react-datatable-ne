/**
 * CUSTOMIZABLE COMPONENT WHOSE PURPOSE IS TO DISPLAY DATA IN A TABLE
 */

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import {
  EntriesLengthChoice,
  SearchField,
  TableDisplayOptions,
  TablePagination,
  Arrow,
  NoData,
} from './components/style'

import Select from 'react-select'

import EmployeesTable from './components/Table/Table'
import { TableColumn } from './types/types'
import useSortTable from './components/Table/hooks/useSortTable'
import useSearch from './hooks/useSearch'
import { OptionValue, DataRow, DataRows } from './types/types'


/**
 * Component that shows a table data to the user and different options to
 * the user to play with it
 * On top of the data feeding the table, It receives a set of parameters
 * that define what options are available to the end-user to display data
 * @returns
 */
const App = ({
  data, // data contained in the table
  columns, // headers of the table
  initialSort, // is data sorted in a specific way at page load?
  entriesNumberOptionsProps, // the select options to set the table size
  showEntriesNumberText = 'Show', // the label for the table size select dropdown
  entriesUnits = 'entries', // the table size units label
  isSearchable = false, // can the user make a research to filter data?
  fieldsSearched = [], // which columns must be used if a research is made
  searchInputsProps, // any property natively used by react-select or HTML select
  searchOnFullWord = false, // research matching on keyword only or any part of the string
  searchLabel = 'Search', // the label for the search input
  isPaginable = false, // can the user paginate to display different pieces of data?
  pagesNumberVisible = false, // are the pages positions shown to the user?
  paginateArrowProps, // any property natived used by HTML img
  textForDataNull = 'There is no data yet', // text to display if there is no data
  textForDataFilteredNull = 'There are o results from your search', // text to display if the research didn't get any results
}: {
  data: DataRows
  columns: TableColumn[]
  initialSort?: { column: keyof DataRow; order: 'asc' | 'desc' }
  entriesNumberOptionsProps: { [key: string]: any }
  showEntriesNumberText?: string
  entriesUnits?: string
  isSearchable?: boolean
  fieldsSearched?: [keyof DataRow][]
  searchInputsProps: { [key: string]: any }
  searchOnFullWord?: boolean
  searchLabel?: string
  isPaginable?: boolean
  pagesNumberVisible?: boolean
  paginateArrowProps?: { [key: string]: any }
  textForDataNull: string
  textForDataFilteredNull: string
}) => {
  const entriesNumberOptions = entriesNumberOptionsProps.options

  if (isPaginable && !entriesNumberOptions.length) {
    alert(
      'entriesNumberOptions must be specified if you set isPaginable to true'
    )
    throw new Error()
  }

  const [totalPagesNumber, setTotalPageNumber]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState(0)
  const [pagePreviousIsClickable, setPagePreviousIsClickable]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false)
  const [pageNextIsClickable, setPageNextIsClickable]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(true)

  const [entriesNumberChoice, setEntriesNumberChoice]: [
    OptionValue,
    React.Dispatch<React.SetStateAction<OptionValue>>
  ] = useState(entriesNumberOptions[0] as OptionValue)

  const [pageNumber, setPageNumber]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState(1)

  const [hasBeenFiltered, setHasBeenFiltered] = useState(false)

  /**
   * Derives the portion of the list to display in the table
   */
  const deriveDataSlice = useCallback(
    /**
     * @param numberOfEntries represents the table size
     * @param page represents the pagination number
     * @returns the starting and ending position to slice the data on
     */
    (numberOfEntries: number, page: number): number[] => {
      const dataSlice = [numberOfEntries * (page - 1), numberOfEntries * page]
      return dataSlice
    },
    [pageNumber]
  )

  const handleEntriesNumberChange = (newValue: unknown) => {
    if (newValue) setEntriesNumberChoice(newValue as OptionValue)
  }

  /**
   * If we want to display data in a specific order at first page load
   * @returns the sorted data
   */
  const dataInitiallySorted = useMemo(() => {
    if (initialSort) {
      return data
        .slice()
        .sort(
          (a: DataRow, b: DataRow) =>
            a[initialSort.column].localeCompare(b[initialSort.column]) *
            (initialSort.order === 'asc' ? 1 : -1)
        )
    } else {
      return data
    }
  }, [data, initialSort])

  /* This is the full data that feeds the table. Operations like sorting and 
  filter are applied to it. So each time they modify this list, we need to save
  it so that they are always applied to the latest list
  */
  const [tableData, setTableData] = useState(dataInitiallySorted)

  // This is the list of data that will be displayed in the table, based on
  // the table size (number of entries shown in one page) and its pagination number
  const [tableDataSliced, setTableDataSliced] = useState(tableData)

  // This is the starting and ending position used to truncate the data
  // and update the tableDataSliced state
  const dataSlice: React.MutableRefObject<number[]> = useRef([])

  const [tableDataSorted, sortData, hasBeenSorted] = useSortTable(data)

  const [tableDataFiltered, filter] = useSearch({
    data: hasBeenSorted ? tableDataSorted : dataInitiallySorted,
    fieldsSearched,
    searchOnFullWord,
  })

  const handlePaginateNext = () => {
    setPageNextIsClickable(pageNumber < totalPagesNumber)
  }
  const handlePaginatePrevious = () => {
    setPagePreviousIsClickable(pageNumber > 1)
  }

  // Filters the table based on the value entered in the search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHasBeenFiltered(true)
    filter(value)
  }

  /**
   * Updates the full list of data feeding the table and the truncated data
   * to display when the data has just been altered
   * @param valueToBeTrue indicates if data has been modified (sorted or filtered)
   * @param dataToUse is the new list of data feeding the table
   */
  const setAndSliceTableData = (
    valueToBeTrue: boolean,
    dataToUse: DataRows
  ) => {
    if (valueToBeTrue) {
      // Since data has been altered, we need to store it as future operations
      // like the filter search will be applied on it
      setTableData(dataToUse)
      const offset = 1
      setPageNumber(offset)
      sliceData(dataToUse, offset)
    }
  }

  /**
   * Updates the data that is displayed in the table on a specific page number
   * @param dataToSlice reprensent the full data contained in the table
   * @param offset represents the pagination number
   */
  const sliceData = (dataToSlice: DataRows, offset?: number) => {
    let numberOfEntries: number, page: number | undefined

    // First condition is if no size is defined, then the whole data is displayed
    if (!entriesNumberChoice) numberOfEntries = dataToSlice.length
    else numberOfEntries = Number(entriesNumberChoice.value)

    if (!isPaginable) page = 1
    else page = offset ? offset : pageNumber

    const newDataSlice = deriveDataSlice(numberOfEntries, page)
    // The upper bound used for slicing cannot be higher than the list length
    newDataSlice[1] = Math.min(dataToSlice.length, newDataSlice[1])
    dataSlice.current = newDataSlice
    setTableDataSliced(dataToSlice.slice(newDataSlice[0], newDataSlice[1]))
  }

  // Sets the full data and displayed one at first render
  useEffect(() => {
    setTableData(dataInitiallySorted)
    sliceData(dataInitiallySorted)
  }, [dataInitiallySorted])

  useEffect(() => {
    setAndSliceTableData(hasBeenSorted, tableDataSorted)
  }, [hasBeenSorted, tableDataSorted])

  useEffect(() => {
    setAndSliceTableData(hasBeenFiltered, tableDataFiltered)
  }, [hasBeenFiltered, tableDataFiltered])

  /* Whenever data or the table size is updating, the total number of pages 
  the user can paginate might be affected
  */
  useEffect(() => {
    setTotalPageNumber(
      Math.ceil(tableData.length / Number(entriesNumberChoice.value))
    )
  }, [entriesNumberChoice, tableData])

  /* Whenever the total pages number necessary to display the whole table changes,
  or the user selects a new page, then we need to check if the previous and next button
  to paginate are still allowed
  */
  useEffect(() => {
    sliceData(tableData)
    if (entriesNumberChoice) {
      handlePaginateNext()
      handlePaginatePrevious()
    }
  }, [totalPagesNumber, pageNumber])

  return (
    <>
      <TableDisplayOptions>
        {entriesNumberOptions.length >= 1 && (
          <EntriesLengthChoice>
            <p>{showEntriesNumberText}</p>
            <Select
              onChange={handleEntriesNumberChange}
              {...entriesNumberOptionsProps}
            />
            <p>{entriesUnits}</p>
          </EntriesLengthChoice>
        )}
        {isSearchable && (
          <SearchField>
            <p>{searchLabel}</p>
            <input
              type="search"
              name="search"
              {...searchInputsProps}
              onChange={handleSearch}
            />
          </SearchField>
        )}
      </TableDisplayOptions>
      {isPaginable && (
        <TablePagination>
          <p>
            {dataSlice.current[0] + 1} - {dataSlice.current[1]} in{' '}
            {tableData.length}
          </p>
          <div className="arrows">
            <Arrow
              {...paginateArrowProps?.previous?.attributes}
              style={{
                ...paginateArrowProps?.previous?.style,
                cursor: pagePreviousIsClickable ? 'pointer' : 'cursor',
                opacity: pagePreviousIsClickable ? '1' : '0.5',
              }}
              onClick={() =>
                pagePreviousIsClickable
                  ? setPageNumber(pageNumber - 1)
                  : undefined
              }
            />
            {pagesNumberVisible &&
              [...Array(totalPagesNumber)].map((i, index) => (
                <p
                  key={`${index}-${i}`}
                  className={
                    'page-number' +
                    ' ' +
                    (pageNumber === index + 1 ? 'active' : '')
                  }
                  onClick={() => setPageNumber(index + 1)}
                >
                  {index + 1}
                </p>
              ))}
            <Arrow
              {...paginateArrowProps?.next?.attributes}
              style={{
                ...paginateArrowProps?.next?.style,
                cursor: pageNextIsClickable ? 'pointer' : 'cursor',
                opacity: pageNextIsClickable ? '1' : '0.5',
              }}
              onClick={() =>
                pageNextIsClickable ? setPageNumber(pageNumber + 1) : undefined
              }
            />
          </div>
        </TablePagination>
      )}
      <div>
        <EmployeesTable
          data={tableDataSliced}
          columns={columns}
          sortData={sortData}
        />
        {!tableData.length && (
          <NoData>
            {hasBeenFiltered ? textForDataNull : textForDataFilteredNull}
          </NoData>
        )}
      </div>
    </>
  )
}

export default App
