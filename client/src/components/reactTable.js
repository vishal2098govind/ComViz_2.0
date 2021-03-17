import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { Backdrop } from '@material-ui/core'



function Table({ columns, data, props }) {
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
                if(cell.column.Header==props.terminal && cell.row.values.terminal==props.nonTerminal){
                  return <td style={{background:'#80a879'}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }else{
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }
                
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
            'var' : 'var id=E',
            'id' : 'C E1',
            'not' : 'C E1'
        },
        {  
            terminal: 'E1',
            ')' : 'e',
            'EOF' : 'e',
            'and' : 'and CE1',
            'or' : 'or CE1'
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
            'and' : 'e',
            'or' : 'e',
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
            'id' : 'P'
        },
        {  
            terminal: 'P^',
            int: 'L ^ P',
            float: 'L ^ P',
            '(' : 'L ^ P',
            'id' : 'L ^ P'
        },
        {  
            terminal: 'P',
            int: 'L',
            float: 'L',
            '(' : 'L',
            'id' : 'L'
        },
        {  
            terminal: 'L',
            int: 'int',
            float: 'float',
            '(' : '(E)',
            id : 'id'
        },
        {  
            terminal: 'A1',
            '+' : '+ TA1',
            '-' : '- TA1',
            ')' : 'e',
            'EOF' : 'e',
            'and' : 'e',
            'or' : 'e',
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
            'id' : 'T A1',
            'and' : 'e',
            'or' : 'e',
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
            'and' : 'e',
            'or' : 'e',
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
            'id' : 'A C1',
            'not' : 'not C'
        },
            ] 
        columns.push({
            Header: '',
            accessor: 'terminal'
        })
        let colName=['int','float','+','EOF','=','*','/','^','(',')','var','id','and','or','not','<','<=','>','>=','==','!=']
        for(let i=0;i<21;i++){
            columns.push({
                Header: colName[i],
                accessor: colName[i]
            })
        }
    }
    const Styles = styled.div`
    padding: ${data.length<5 ? '1.5rem' : ((props.size && props.size=='large') ? '1.3rem': ((props.size && props.size=='small') ? '0.2rem' : '0.85rem'))};
    font-size: ${data.length<5 ? '1.5rem' : ((props.size && props.size=='large') ? '1.3rem': ((props.size && props.size=='small') ? '0.65rem' : '0.85rem'))};
    
    table {
      border-spacing: 0;
      margin-left:auto;
      margin-right:auto;
      margin-top:auto;
      margin-bottom:auto;
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
      <Table columns={columns} data={data} props={props} />
    </Styles>
  )
}

export default ReactTable
