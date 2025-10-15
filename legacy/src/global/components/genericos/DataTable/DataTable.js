import { Body, DataTableContainer, Item, Top } from "./localStyle";

const DataTable = ({rows, columns}) => {
   
    
    return (
        <DataTableContainer>
                <Top>
                    <Item>
                      {
                        columns.map((element)=> {
                            return <span>{element.headerStr}</span>
                        })
                      }
                    </Item>
                </Top>
                <Body>
                    
                   {
                    rows.map(row => {
                        return (
                            <Item>
                                {
                                    columns.map(columns => {
                                        const element = 
                                        !columns?.property? 
                                        columns?.element: null; 
                                        const property = row[columns.property]; 
                                        return (
                                                <span>{element ? element : property}</span>
                                        )
                                    }) 
                                }
                            </Item>
                        )
                    })
                   }
                </Body>
            </DataTableContainer>
    )
}; 

export default DataTable; 