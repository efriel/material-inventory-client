import React, { Component, useState } from "react";
import axios from "axios";

class SelectDocs extends Component {  
    constructor(props){
        super(props);
        this.state = {
            options: [],   
            value: this.props.value,
            items: [],          
        };
        
    }
        
    componentDidMount() {
        axios.get("http://rumeh.com:9000/api/combo/docs")
        .then(res => {
            const option = res.data.Response;      
            this.setState({ options: option});      
            this.setState({ items: option.map(({ doc_number, file_name }) => ({ label: doc_number, value: file_name }))});
        });                                      
    }    

    handleOnChange = e => {
        const inputSelect = e;
        this.setState({
          value: e.currentTarget.value
        });
        this.props.onChange(inputSelect);
    };
  
    render() {          
        
        return (            
                <select               
                id="DocNumber"
                name="DocNumber"
                onChange={this.handleOnChange}                
                value={this.state.value}              
                >
                {this.state.items.map(({ label, value }) => (                    
                    <option key={label} value={label}>
                    {value} | Doc No. ({label})
                    </option>
                ))}
                </select>            
        );
    } 
}

export default SelectDocs;