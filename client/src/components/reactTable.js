import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'



function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function ReactTable(props) {
    let data=[]
    let columns=[]
    if(props.data && props.columns ){
        data=props.data
        columns=props.columns
    }else if(props.columns && props.inverted && props.type=='tokenList'){
        columns=props.columns
        
    }else{
        data = [{  
            terminal: 'E',
            int: 'C E1',
            float: 'C E1',
            '+' : 'C E1',
            '-' : 'C E1',
            '(' : 'C E1',
            'VAR' : 'VAR ID=E',
            'ID' : 'C E1',
            'NOT' : 'C E1'
        },
        {  
            terminal: 'E1',
            ')' : 'e',
            'EOF' : 'e',
            'AND' : 'AND CE1',
            'OR' : 'OR CE1'
        },
        {  
            terminal: 'T',
            int: 'F T1',
            float: 'F T1',
            '+' : 'F T1',
            '-' : 'F T1',
            '(' : 'F T1'

        },
        {  
            terminal: 'T1',
            '+' : 'e',
            '-' : 'e',
            '*' : '* FT1',
            '/' : '/ FT1',
            ')' : 'e',
            'EOF' : 'e',
            'AND' : 'e',
            'OR' : 'e',
            '<' : 'e',
            '<=' : 'e',
            '>' : 'e',
            '>=' : 'e',
            '==' : 'e',
            '!=' : 'e'
        },
        {  
            terminal: 'F',
            int: 'P',
            float: 'P',
            '+' : '+P',
            '-' : '-P',
            '(' : 'P',
            'ID' : 'P'
        },
        {  
            terminal: 'P^',
            int: 'L ^ P',
            float: 'L ^ P',
            '(' : 'L ^ P',
            'ID' : 'L ^ P'
        },
        {  
            terminal: 'P',
            int: 'L',
            float: 'L',
            '(' : 'L',
            'ID' : 'L'
        },
        {  
            terminal: 'L',
            int: 'int',
            float: 'float',
            '(' : '(E)'
        },
        {  
            terminal: 'A1',
            '+' : '+ TA1',
            '-' : '- TA1',
            ')' : 'e',
            'EOF' : 'e',
            'AND' : 'e',
            'OR' : 'e',
            '<' : 'e',
            '<=' : 'e',
            '>' : 'e',
            '>=' : 'e',
            '==' : 'e',
            '!=' : 'e'
        },
        {  
            terminal: 'A',
            int: 'T A1',
            float: 'T A1',
            '+' : 'T A1',
            '-' : 'T A1',
            '(' : 'T A1',
            ')' : 'e',
            'EOF' : 'e',
            'ID' : 'T A1',
            'AND' : 'e',
            'OR' : 'e',
            '<' : 'e',
            '<=' : 'e',
            '>' : 'e',
            '>=' : 'e',
            '==' : 'e',
            '!=' : 'e'
        },
        {  
            terminal: 'C1',
            ')' : 'e',
            'EOF' : 'e',
            'AND' : 'e',
            'OR' : 'e',
            '<' : '< AC1',
            '<=' : '<= AC1',
            '>' : '> AC1',
            '>=' : '>= AC1',
            '==' : '== AC1',
            '!=' : '!= AC1'
        },
        {  
            terminal: 'C',
            int: 'A C1',
            float: 'A C1',
            '+' : 'A C1',
            '-' : 'A C1',
            '(' : 'A C1',
            'ID' : 'A C1',
            'NOT' : 'NOT C'
        },
            ] 
        columns.push({
            Header: '',
            accessor: 'terminal'
        })
        let colName=['int','float','+','EOF','=','*','/','^','(',')','VAR','ID','AND','OR','NOT','<','<=','>','>=','==','!=']
        for(let i=0;i<21;i++){
            columns.push({
                Header: colName[i],
                accessor: colName[i]
            })
        }
    }
    console.log(props.size)
    const Styles = styled.div`
    padding: ${data.length<5 ? '1.5rem' : ((props.size && props.size=='large') ? '1.3rem': '1rem')};
    font-size: ${data.length<5 ? '1.5rem' : ((props.size && props.size=='large') ? '1.3rem': '1rem')};
    table {
      border-spacing: 0;
      border: 3px solid black;
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
  
      th{
        margin: 0;
        padding: ${data.length>5 ? '0.5rem' : '1.5rem'};
        border: 1.5px solid black;
        border-bottom: 3px solid black;
        border-right: 2px solid black;
        background: #c7f0ee;
        
        :last-child {
          border-right: 1px solid black;
        }
        :first-child{
          background: ${props.inverted ? '#75b2ad' : '#c7f0ee'}

        }
      }
      td {
        margin: 0;
        padding: ${data.length>5 ? '0.5rem' : '1.5rem'};
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        background : white;
        :first-child{
          background : #75b2ad;
          border-right: 3px solid black;
          border-bottom: 3px solid black;
        }
        :last-child {
          border-right: 0;
        }
      }
    }
  `
 

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default ReactTable
