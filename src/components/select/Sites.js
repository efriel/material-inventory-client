import React, { Component } from "react";
import axios from "../../utils/Instance";

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
        axios.get("/combo/site")
        .then(res => {
            const option = res.data.Response;      
            this.setState({ options: option});      
            this.setState({ items: option.map(({ site_id, site_name }) => ({ label: site_id, value: site_name }))});
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
                id="SiteId"
                name="SiteId"
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
//onChange={(e) => this.setState({value: e.currentTarget.value})}
export default SelectSite;