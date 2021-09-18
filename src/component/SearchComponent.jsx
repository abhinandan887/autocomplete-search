import React, {useState, useRef, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Config from './../common/urlConfig';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import Button from "@material-ui/core/Button";
import {Divider} from "primereact/divider";
import {Github, LinkedinSquare, StackOverflow} from "@styled-icons/boxicons-logos";
import {Hackerearth, Hackerrank, Leetcode} from "@styled-icons/simple-icons";
import {Email} from "@styled-icons/evaicons-solid";
import {PhoneCallOutline} from "@styled-icons/evaicons-outline";
import {Copyright} from "@styled-icons/boxicons-regular";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import 'ag-grid-enterprise';
import {styled} from "@mui/material";
import Paper from "@mui/material/Paper";
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
}));

export default function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const [filteredSearch, setFilteredSearch] = useState({});
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [capital, setCapital] = useState([]);
    const [country, setCountry] = useState([]);
    const [options, setOptions] = useState([{id:'', name: '', type: ''}]);
    const [indexData, setindexData] = useState([]);

    useEffect(() => {
        fetch(Config.getAll)
            .then(res => res.json())
            // .then(res => {
            //     if(res.status === 200) {
            //         res.json();
            //     }else{
            //         throw new Error(res.status);
            //     }
            // })
            .then(res => {
                console.log(res);
                let country = [];
                let capital = [];
                let count = 0;
                for(let item of res){
                    if(country.indexOf(item.name) === -1) {
                        options.push({
                            "id": item.name + item.capital + " Country",
                            "name": item.name,
                            "type": "is a Country."
                        });
                        country.push(item.name);
                        if(indexData.indexOf(item.name) === -1)
                            indexData.push(item.name);
                    }
                    if(capital.indexOf(item.capital) === -1) {
                        options.push({
                            "id": item.name + item.capital + " Capital",
                            "name": item.capital,
                            "type": "Capital of " + item.name
                        });
                        capital.push(item.capital);
                        if(indexData.indexOf(item.capital) === -1)
                            indexData.push(item.capital);
                    }
                }

                setCapital(capital);
                setCountry(country);
                //country.push(...capital);
                //setOptions(country);
            })
            .catch((error) => {
                console.log('error '+error);
            });
    }, [rowData]);

    const handleSubmit = () => {
        if(searchText && searchText.length > 0){
            if(country.indexOf(searchText) > -1){
                fetch(Config.getCountryByPartialName + searchText)
                    .then((resp) => resp.json())
                    .then((data) => setRowData(data));
            }else if(capital.indexOf(searchText) > -1){
                fetch(Config.getByCapitalName + searchText)
                    .then((resp) => resp.json())
                    .then((data) => setRowData(data));
            }else{
                alert("No Match Found in the result\n Showing all th data");
            }
        }else{
            alert("No Match Found in the result\n Showing all th data");
        }
    }
    const handleInputChange = (event,value,reason) => {
        console.log('Value: '+value);
        console.log('Targetv Value: '+event.target.value);
        setSearchText(value);
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

        const updateData = (data) => {
            setRowData(data);
        };

        fetch(Config.getAll)
            .then((resp) => resp.json())
            .then((data) => updateData(data));
    };
    return (
        <React.Fragment>
            <div className="width-100  align-center "  style={{height: "calc(100% - 300px)"}}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                //value={searchText}
                options={indexData}
                //getOptionLabel={(option) => option.id + ','+option.name +','+ option.type}
                // getOptionLabel={(option) => { return (
                //     <React.Fragment>{option.name}<span style={{paddingRight: '3px'}} />{option.type})</React.Fragment>
                // )}}
                className="margin-20"
                autoHighlight={true}
                noOptionsText="No Matches Found"
                //inputValue={(option) => option.name + "                 " + option.type}
                loading={true}
                onInputChange={(event, value, reason) => handleInputChange(event,value,reason)}
                sx={{ width: "70%" }}
                renderInput={(params) => <div >
                        <TextField {...params} className="margin-20 " label="Search Countries" />
                    <Button color="secondary" variant="contained" style={{marginTop: '20px'}} onClick={handleSubmit}>Submit</Button></div>}

            />
            <div id="myGrid" className="ag-theme-alpine align-center margin-20 flex-child" style={{height: '55vh'}}>
            <AgGridReact
                defaultColDef={{
                    width: 170,
                    sortable: true,
                    resizable: true,
                    filter: true,
                    flex: 1
                }}
                onGridReady={onGridReady}
                rowData={rowData}
                groupDefaultExpanded={1}
                suppressAggFuncInHeader={true}
                enableCellChangeFlash={true}
                animateRows={true}
                colResizeDefault={true}
                enableBrowserTooltips={true}

            >
                <AgGridColumn field="name" headerName="Country" sort="asc" />
                <AgGridColumn field="capital" />
                <AgGridColumn field="flag" hide={true}/>
                <AgGridColumn field="borders"  />
                <AgGridColumn field="population" />
                <AgGridColumn field="region" />
                <AgGridColumn field="subregion" />
                <AgGridColumn field="timezones" />
            </AgGridReact></div></div>

        </React.Fragment>
    );

}