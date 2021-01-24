import React, { Component, useState } from "react";
import axios from "axios";



class SelectCategory extends Component {  
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
        axios.get("http://rumeh.com:9000/api/combo/category")
        .then(res => {
            const option = res.data.Response;      
            this.setState({ options: option});      
            this.setState({ items: option.map(({ mg_cat_id, mg_cat_name }) => ({ label: mg_cat_id, value: mg_cat_name }))});
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
                id="CatId"
                name="CatId"
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

export default SelectCategory;