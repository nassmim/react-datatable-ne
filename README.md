[![NPM](https://img.shields.io/npm/v/react-datatable-ne.svg)](https://www.npmjs.com/package/react-datatable-ne)

# react-datatable-ne, simple and customizable table 

React Typescript library enabling to enhance plain HTML tables with minimal effort. <br/><br/>


## 1. Features

The library removes developers the hassle to build and style data representation with a table. <br/>
The main features are : sorting, paging and filtering the table.  <br/><br/>

It is developed with two distinct groups of users in mind:

* You the developers using react-datatable-ne. The package provides a wide array of options for how data should be obtained, displayed and acted upon, along with an extensive API for accessing and manipulating the table.

* End users. Your users will get an interface where actions to get the most from the information contained in tables, such as sorting, filtering and paging, are easy to use, intuitive and fast.
<br/>
<br/>


## 2. STACK TECHNIQUE
The project uses as its primarily building tools React and Typescript.

### 2.1 Frameworks

<ul>
<li>Node 16.20.0</li>  
<li>React ^18.2.0</li>  
</ul>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" /></a>
<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" /></a>

### 2.2 Dependencies
The library has some dependencies that will get automatically downloaded and listed in your package.json. The main ones are:
<ul>
<li>typescript</li>
<li>react-select</li>
<li>styled-components</li>
</ul>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
<a href="https://www.styled-components.com">
  <img alt="styled-components" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" width="36" height="36"  />
</a>
<br/>
<br/>


## 3. Installation

Firstly, the project uses Node packages and uses `pnpm`, so the installation of Node.js in your IDE is required
> [Install Node.js](https://nodejs.org/en/)
<br/>
If you have not yet `pnpm` you can run the following command line: <br/>
`npm install --global pnpm`  <br/>
*⚠ Other options are available to install it, so feel free to use the one you are more comfortable with. *⚠
 <br/>
  <br/>
Then, use any package manager to install our package. With `npm`, the command line to run is: <br/>
`npm install --save react-datatable-ne` <br/>
Add the necessary flag arguments like `--save-dev`depending on the environment you want to use the library.
Most likely, you will need it for production as well so use `--save`
<br/>
<br/>

## 4. Usage

### 4.1 Import
To start using react-table-ne, import it in the component where the table must be displayed. 
```js
import DisplayTable from 'react-datatable-ne'
```
And then you can integrate it with a single line of code:
```js
<DisplayTable data={data} columns={columns} />
```
*⚠ The library exports the component as the default value. So you can replace `DisplayTable` by any name you prefer. *⚠ 

### 4.2. Parameters

#### Mandatory
In order to work properly, the component DisplayTable must receive 2 arguments:
```js
<DisplayTable d
  data={data} // data that must be displayed in the table, i.e. the data that will populate the plain HTML tbody
  columns={columns} // headers of the table, i.e. the row for plain HTML thead
/>
```

#### Optional
Optional configuration parameters can be passed to the component to have it perform certain actions.
Here are presented below all the available properties you can modify. 

```js
<DisplayTable
  data={data} // data that must be displayed in the table, i.e. the data that will populate the plain HTML tbody
  columns={columns} // headers of the table, i.e. the row for plain HTML thead
  initialSort={{ column: 'startDate', order: 'asc' }}, // to define if the table must display the data in a certain order at page load. The column property indicates on which column to sort and in which order. By default, no order is specified. 
  sortArrowsProps={{
    ascending: {src: 'relative/path/to/image', alt: 'asc', style: {width: '50px'}},
    descending: {src: 'relative/path/to/image', alt: 'desc', style: {width: '50px'}},
  }}, // for attributes, only src and alt may be altered. For the style object, any CSS property natively used by the HTML img element can be passed in
  entriesNumberOptionsProps={selectNativeProps: {options: [5, 10, 20}, showEntriesNumberText: 'Show', entriesUnits: 'units'}, // If specified, it will let the user chooses how many rows he wants the table to display (i.e. the table size). The selectNativeProps accepts any properties natively used by a plain HTML select. 
  showEntriesNumberText = 'Show', // the label text associated to the table size select dropdown
  entriesUnits= 'entries', // the table size units label
  isSearchable= false, // Indicates if the table can be filtered by the user from a search input. If set to true, then a search input will be displayed
  fieldsSearched= [], // If you allow filtering the data, you might also want to specify which columns are concerned by the search
  searchInputsProps={width: '2Opx'}, // any property natively used by the package react-select or the plain HTML select
  searchOnFullWord= false, // Indicates if the research is of type keyword (i.e. for a field value, it will match the research only if it starts with the searched value) or the sole presence of the string in the field value is sufficient
  searchLabel= 'Search', // the label for the search input
  isPaginable= false, // Indicates if the user is allowed to paginate 
  pagesNumberVisible= false, // If pagination is allowed, then most likely there are different pages. This indicates if the number of these pages must be shown to the user or not
  paginateArrowProps=, // any property natived used by HTML img
  textForDataNull= 'There is no data yet', // text to display if there is no data
  textForDataFilteredNull= 'There are o results from your search', // text to display if the research didn't get any results    
/>
```
We have not precised the type for each of these props. However, our package is typed so you will be able to see the types of each of them. 
<br/>
<br/>

## 5. Contribution
Although as it stands, this library does the job, offering enough flexibility and simplicity to the developpers, any participation on this project is more than welcome.

If you want to work and propose improvements:
<ol>
<li>Fork the Front-end repository</li>
<li>Clone it locally using <code>git clone</code></li>
</ol>

The project uses Node packages. So the installation of Node.js in your IDE is required
> [Install Node.js](https://nodejs.org/en/)
For Node packages manager, yarn is being used. To install it, run the command line:
`npm install --global yarn`
<br/>
<br/>

## License

DataTables is release under the [MIT license](//datatables.net/license). You are free to use, modify and distribute this software, as long as the copyright header is left intact (specifically the comment block which starts with `/*!`).
