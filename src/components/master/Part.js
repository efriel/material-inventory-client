import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import DataTable  from 'react-data-table-component';
import { Button, Form, Modal } from 'react-bootstrap';
import SelectCategory from "../select/Categories"
import SelectSite from "../select/Sites"
import SelectSupplier from "../select/Supplier"

const columns = [
  {name: 'Part ID', selector: 'part.part_id', sortable: true, width: '7em'},
  {name: 'Category', selector: 'category.mg_cat_name',},
  {name: 'Code', selector: 'part.part_code',},
  {name: 'Name', selector: 'part.part_name',},
  {name: 'Unit', selector: 'part.part_unit',},
  {name: 'Supplier', selector: 'supplier.supplier_name',},
  {name: 'Min Stock', selector: 'part.min_stock', width: '7.5em'},
  {name: 'Cost', selector: 'part.cost_price', sortable: true, right: true, width: '7em'},
  {name: 'Expired', selector: 'part.expired_date',},
  {name: 'Site Name', selector: 'site.site_name',},
  {name: 'User', selector: 'user.name',},
  {name: 'Stock', selector: 'stock.quantity', width: '5em'},
  {name: 'Updated', selector: 'part.update_date',},    
];

class Part extends Component {  
  constructor(props){
    super(props);
    this.state = {
      parts: [],   
      ModalDisplayStatus: false,
      PartId: "",
      CatId: "",      
      PartCode: "",
      PartName: "",
      Unit: "",
      SupplierId: "",      
      MinStock: "",
      Cost: "",
      Expired: "",
      SiteId: "",
      UserId: "",      
      Stock: 0,
      PartNotes: "",
      IsNew: false,
    };
    this.modOpenHandler = this.modOpenHandler.bind(this)    
  }
 

  componentDidMount() {
    axios.get("/api/master/part")
    .then(res => {
      const parts = res.data.Response;      
      this.setState({ parts });      
    })          

  }  

  modOpenHandler = (parts) => {
    this.setState({
      ModalDisplayStatus: true,
      PartId: parts.part.part_id,
      CatId: parts.part.mg_cat_id,
      PartCode: parts.part.part_code, 
      PartName: parts.part.part_name, 
      Unit: parts.part.part_unit, 
      SupplierId: parts.part.supplier_id, 
      MinStock: parts.part.min_stock, 
      Cost: parts.part.cost_price, 
      Expired: parts.part.expired_date, 
      SiteId: parts.part.site_id,
      Stock: parts.stock.quantity, 
      PartNotes:  parts.part.part_notes,
    });
  }

  modCloseHandler = parts => {
    this.setState({ModalDisplayStatus: false});    
  }

  handleChange (e) {    
    const target = e.target;    
    console.log(target);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;    
    this.setState({
      [name]: value
    });        
  }

  handleCreate = () => {    
    const form = this.form;    
    this.setState({ModalDisplayStatus: false});        
    var PartId = this.state.PartId;
    var IsNew = this.state.IsNew;    
    const { user } = this.props.auth;  
    const SavedUserId =  user.Userid;    
    let partData = {        
      "part_id": PartId,   
      "mg_cat_id": this.state.CatId,
      "part_code": this.state.PartCode,
      "part_name": this.state.PartName,
      "part_unit": this.state.Unit,
      "supplier_id": this.state.SupplierId,
      "min_stock": this.state.MinStock,
      "cost_price": this.state.Cost,
      "expired_date": this.state.Expired,
      "site_id": this.state.SiteId,
      "user_id" : SavedUserId,
      "part_notes" : this.state.PartNotes,
    };
    let sendMethod = 'PUT';
    let sendUrl = "/api/master/part/"+PartId;
    if(IsNew){      
      sendMethod = 'POST';
      sendUrl = "/api/master/part";
    }
    console.log(partData);
    const headers = {
      'Content-Type': 'application/json',   
    }    
    axios({
      method: sendMethod,    
      url: sendUrl,
      headers: headers, 
      data: partData
    })    
    .then(res => {
      const partupdated = res.data.Response;      
      console.log(partupdated);      
      this.componentDidMount();
    })        

  }

  handleDelete = () => {    
    const form = this.form;    
    this.setState({ModalDisplayStatus: false});        
    var PartId = this.state.PartId;
    const { user } = this.props.auth;  
    const SavedUserId =  user.Userid;            
    const headers = {
      'Content-Type': 'application/json',   
    }    
    axios({
      method: 'DELETE',    
      url: "/api/master/part/"+PartId,
      headers: headers,       
    })    
    .then(res => {
      const partupdated = res.data.Response;      
      console.log(partupdated);      
    })        

  }

  saveFormRef = (form) => {
      this.form = form;
      console.log(this.form);

  }

  render() {  
    //const { ModalDisplayStatus } = this.state.ModalDisplayStatus;     
    

    return (
      <div>                        
              <Modal show={this.state.ModalDisplayStatus} onHide={this.modCloseHandler}>                
                <form id="dataForm" ref={this.saveFormRef}>
                <Modal.Header closeButton>
                  <Modal.Title>Parts</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form.Label className="col-sm-3">Part ID</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="PartId" name="PartId" type="text" placeholder="Part ID" defaultValue={this.state.PartId} autoComplete="off" />                                                                
                  <div className="row">
                  <div className="col-sm-12">
                  <Form.Label className="col-sm-3">Category</Form.Label>
                  <SelectCategory className="col-sm-9" value={this.state.CatId} name="CatId" onChange={this.handleChange.bind(this)} />                            
                  </div>  
                  </div>
                  <Form.Label className="col-sm-3">Part Code</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="PartCode" name="PartCode" type="text" placeholder="Part Code" defaultValue={this.state.PartCode} autoComplete="off" />
                  <Form.Label className="col-sm-3">Part Name</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="PartName" name="PartName" type="text" placeholder="Part Name" defaultValue={this.state.PartName} autoComplete="off" />                          
                  <Form.Label className="col-sm-3">Unit</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="Unit" name="Unit" type="text" placeholder="Unit" defaultValue={this.state.Unit} autoComplete="off" />                                            
                  <div className="row">
                  <div className="col-sm-12">
                  <Form.Label className="col-sm-3">Supplier</Form.Label>
                  <SelectSupplier className="col-sm-9" value={this.state.SupplierId} name="SupplierId" onChange={this.handleChange.bind(this)} />
                  </div>  
                  </div>
                  <Form.Label className="col-sm-3">Min Stock</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="MinStock" name="MinStock" type="text" placeholder="Min Stock" defaultValue={this.state.MinStock} autoComplete="off" />                          
                  <Form.Label className="col-sm-12">Current Stock {this.state.Stock}</Form.Label>
                  <Form.Label className="col-sm-3">Cost</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="Cost" name="Cost" type="text" placeholder="Cost" defaultValue={this.state.Cost} autoComplete="off" />                          
                  <Form.Label className="col-sm-3">Expired</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="Expired" name="Expired" type="text" placeholder="Expired" defaultValue={this.state.Expired} autoComplete="off" />                          
                  <div className="row">
                  <div className="col-sm-12">
                  <Form.Label className="col-sm-3">Site Name</Form.Label>
                  <SelectSite className="col-sm-9" value={this.state.SiteId} name="SiteId" onChange={this.handleChange.bind(this)} />
                  </div>  
                  </div>
                  <div className="row">
                  <div className="col-sm-12">
                  <label>
                    Insert as new data
                    <input
                      name="IsNew"
                      type="checkbox"
                      checked={this.state.IsNew}                      
                      onChange={this.handleChange.bind(this)} />
                  </label>
                  </div>  
                  </div>
                </Modal.Body>       
                

                <Modal.Footer>
                  <Button variant="secondary" onClick={this.modCloseHandler}>
                    Close
                  </Button>
                  <Button type="button" onClick={this.handleDelete.bind(this)} class="btn btn-danger">
                    Delete
                  </Button>
                  <Button type="button" onClick={this.handleCreate.bind(this)} class="btn btn-primary">
                    Save Changes
                  </Button>
                </Modal.Footer>
                </form>

              </Modal>                      

          <DataTable
            title="Master Part Table"
            columns={columns}
            data={this.state.parts}            
            selectableRowsComponentProps={{ inkDisabled: true }}             
            onRowClicked={this.modOpenHandler} 
            responsive={true}           
          />
          
      </div>
    );
  }
}

Part.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Part);