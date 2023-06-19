export type TableColumn = {
  label: string
  accessor: string
  sortable: boolean
}

export type OptionValue = {
  value: string
  label: string
}

export type DataRow = {
  [key: string]: any
}

export type DataRows = DataRow[]
