import React, { Component, useState } from "react";
import axios from "axios";



class SelectOriginator extends Component {  
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
        axios.get("/api/combo/users")
        .then(res => {
            const option = res.data.Response;      
            this.setState({ options: option});      
            this.setState({ items: option.map(({ user_id, name, email }) => ({ label: user_id, value: name, contact: email }))});
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
                id="OriginatorId"
                name="OriginatorId"
                onChange={this.handleOnChange}                
                value={this.state.value}                               
                >
                {this.state.items.map(({ label, value, contact }) => (                    
                    <option key={label} value={label}>
                    {value} - {contact}
                    </option>
                ))}
                </select>            
        );
    } 
}

export default SelectOriginator;