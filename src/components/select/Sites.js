import React, { Component, useState } from "react";
import axios from "axios";

class SelectSite extends Component {  
    constructor(props){
        super(props);
        this.state = {
            options: [],   
            value: this.props.value,
            items: [],          
        };
        
    }
        
    componentDidMount() {
        axios.get("/api/combo/site")
        .then(res => {
            const option = res.data.Response;      
            this.setState({ options: option});      
            this.setState({ items: option.map(({ site_id, site_name }) => ({ label: site_id, value: site_name }))});
        });                                      
    }    
  
    render() {          
        console.log(this.props.options);
        return (            
                <select                
                value={this.state.value}
                onChange={(e) => this.setState({value: e.currentTarget.value})}
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

export default SelectSite;