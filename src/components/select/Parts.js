import React, { Component, useState } from "react";
import axios from "axios";



class SelectParts extends Component {  
    constructor(props){
        super(props);
        this.state = {
            options: [],   
            value: this.props.value,
            items: [],
            classname: this.props.ClassName,
        };
        
    }
        
    componentDidMount() {
        axios.get("/api/combo/parts")
        .then(res => {
            const option = res.data.Response;      
            this.setState({ options: option});      
            this.setState({ items: option.map(({ part_id, part_name, part_code }) => ({ label: part_id, value: part_name, code: part_code }))});
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
                id="PartId"
                name="PartId"
                onChange={this.handleOnChange}                
                value={this.state.value}                               
                >
                {this.state.items.map(({ label, value, code }) => (                    
                    <option key={label} value={label}>
                    {value} - Code: {code}
                    </option>
                ))}
                </select>            
        );
    } 
}

export default SelectParts;