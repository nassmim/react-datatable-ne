import { Arrow } from '../style'
import { TableColumn } from '../../types/types'
import { useState } from 'react'

import ArrowSVG from '../../assets/pagination-left-arrow.svg'

const TableHead = ({
  columns,
  sortData,
  sortArrowsProps
}: {
  columns: TableColumn[]
  sortData: (accessor: string, order: string) => void
  sortArrowsProps?: { [key: string]: any }
}) => {
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('')

  /**
   * Updates the sorting caracteristics (column and order) and the data table
   * @param accessor representing the column to sort data on
   */
  const handleSorting = (accessor: string) => {
    const newSortingOrder =
      accessor === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'
    setSortingField(accessor)
    setSortingOrder(newSortingOrder)
    sortData(accessor, newSortingOrder)
  }

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }: TableColumn) => (
          <th
            key={accessor}
            onClick={sortable ? () => handleSorting(accessor) : undefined}
          >
            <div className="title">
              <p>{label}</p>
              {
                sortable && (
                  <>
              <div className="arrows">
                <Arrow
                  style={{
                    ...sortArrowsProps?.ascending?.style,
                    width: sortArrowsProps?.ascending?.style.width || '10px',
                    transform: sortArrowsProps?.ascending?.style.transform || `rotate(90deg)`,                   
                  }}
                  alt= {sortArrowsProps?.ascending?.alt || 'Sort ascending'}
                  src= {sortArrowsProps?.ascending?.src || ArrowSVG}
                  className={
                    'sort-arrow' +
                    ' ' +
                    (!sortingOrder || sortingOrder === 'asc'
                      ? 'visible'
                      : 'hidden')
                  }
                />
                <Arrow
                  style={{
                    ...sortArrowsProps?.ascending?.style,
                    width: sortArrowsProps?.ascending?.style.width || '10px',
                    transform: sortArrowsProps?.ascending?.style.transform || `rotate(-90deg)`,                   
                  }}
                  alt= {sortArrowsProps?.ascending?.alt || 'Sort descending'}
                  src= {sortArrowsProps?.ascending?.src || ArrowSVG}
                  className={
                    'sort-arrow' +
                    ' ' +
                    (!sortingOrder || sortingOrder === 'desc'
                      ? 'visible'
                      : 'hidden')
                  }
                />
              </div>
                  </>
                )
              }
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
export default TableHead
