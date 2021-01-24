import React, { Component, useState } from "react";
import axios from "axios";

class SelectWarehouse extends Component {  
    constructor(props){
        super(props);
        this.state = {
            options: [],   
            value: this.props.value,
            items: [],          
        };
        
    }
        
    componentDidMount() {
        axios.get("http://rumeh.com:9000/api/combo/warehouse")
        .then(res => {
            const option = res.data.Response;      
            this.setState({ options: option});      
            this.setState({ items: option.map(({ wh_id, wh_name }) => ({ label: wh_id, value: wh_name }))});
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
                id="WhId"
                name="WhId"
                onChange={this.handleOnChange}                
                value={this.state.value}              
                >
                {this.state.items.map(({ label, value }) => (                    
                    <option key={label} value={label}>
                    {value}
                    </option>
                ))}
                </select>            
        );
    } 
}

export default SelectWarehouse;