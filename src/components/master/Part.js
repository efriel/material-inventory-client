import React, { Component } from "react";
import axios from "axios";
import DataTable  from 'react-data-table-component';
import { Button, Form, Modal } from 'react-bootstrap';
import SelectCategory from "../select/Categories"
import SelectSite from "../select/Sites"
import SelectSupplier from "../select/Supplier"

const columns = [
  {name: 'Part ID', selector: 'part.part_id', sortable: true,},
  {name: 'Category', selector: 'category.mg_cat_name',},
  {name: 'Code', selector: 'part.part_code',},
  {name: 'Name', selector: 'part.part_name',},
  {name: 'Unit', selector: 'part.part_unit',},
  {name: 'Supplier', selector: 'supplier.supplier_name',},
  {name: 'Min Stock', selector: 'part.min_stock',},
  {name: 'Cost', selector: 'part.cost_price', sortable: true, right: true,},
  {name: 'Expired', selector: 'part.expired_date',},
  {name: 'Site Name', selector: 'site.site_name',},
  {name: 'User', selector: 'user.name',},
  {name: 'Updated', selector: 'part.update_date',},    
];

class Part extends Component {  
  constructor(props){
    super(props);
    this.state = {
      parts: [],   
      ModalDisplayStatus: false,
      SelectedPartId: "",
      SelectedCatId: "",
      SelectedCatName: "",
      SelectedPartCode: "",
      SelectedPartName: "",
      SelectedUnit: "",
      SelectedSupplierId: "",
      SelectedSupplierName: "",
      SelectedMinStock: "",
      SelectedCost: "",
      SelectedExpired: "",
      SelectedSiteID: "",
      SelectedSiteName: "",
    };
    
  }
 

  componentDidMount() {
    axios.get("/api/master/part")
    .then(res => {
      const parts = res.data.Response;      
      this.setState({ parts });      
    })      
  }  

  modOpenHandler = parts => {
    this.setState({ModalDisplayStatus: true}); 
    console.log(parts)    
    this.setState({ 
      SelectedPartId: parts.part.part_id,
      CategoriId: parts.part.mg_cat_id,
      PartCode: parts.part.part_code, 
      PartName: parts.part.part_name, 
      PartUnit: parts.part.part_unit, 
      SupplierId: parts.part.supplier_id, 
      MinStock: parts.part.min_stock, 
      CostPrice: parts.part.cost_price, 
      ExpiredDate: parts.part.expired_date, 
      SiteId: parts.part.site_id,
    });       
  }

  modCloseHandler = parts => {
    this.setState({ModalDisplayStatus: false});    
  }

  handleChange (e) {
    console.log('handle change called')
  }

  render() {  
    const { ModalDisplayStatus } = this.state;
    return (
      <div>                        
              <Modal show={ModalDisplayStatus} onHide={this.modCloseHandler}>                
                <Modal.Header closeButton>
                  <Modal.Title>Parts</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <form id="dataForm">
                  <Form.Label className="col-sm-3">Part ID</Form.Label>
                  <input className="col-sm-9" id="part_id" name="part_id" type="text" placeholder="Part ID" defaultValue={this.state.SelectedPartId} autoComplete="off" />                                                                
                  <div className="row">
                  <div className="col-sm-12">
                  <Form.Label className="col-sm-3">Category</Form.Label>
                  <SelectCategory className="col-sm-9" value={this.state.CategoriId}/>                            
                  </div>  
                  </div>
                  <Form.Label className="col-sm-3">Part Code</Form.Label>
                  <input onChange={this.handleChange} className="col-sm-9" id="part_code" name="part_code" type="text" placeholder="Part Code" defaultValue={this.state.PartCode} autoComplete="off" />
                  <Form.Label className="col-sm-3">Part Name</Form.Label>
                  <input onChange={this.handleChange} className="col-sm-9" id="part_name" name="part_name" type="text" placeholder="Part Name" defaultValue={this.state.PartName} autoComplete="off" />                          
                  <Form.Label className="col-sm-3">Unit</Form.Label>
                  <input className="col-sm-9" id="part_unit" name="part_unit" type="text" placeholder="Unit" defaultValue={this.state.PartUnit} autoComplete="off" />                                            
                  <div className="row">
                  <div className="col-sm-12">
                  <Form.Label className="col-sm-3">Supplier</Form.Label>
                  <SelectSupplier className="col-sm-9" value={this.state.SupplierId}/>
                  </div>  
                  </div>
                  <Form.Label className="col-sm-3">Min Stock</Form.Label>
                  <input className="col-sm-9" id="min_stock" name="min_stock" type="text" placeholder="Min Stock" defaultValue={this.state.MinStock} autoComplete="off" />                          
                  <Form.Label className="col-sm-3">Cost</Form.Label>
                  <input className="col-sm-9" id="cost_price" name="cost_price" type="text" placeholder="Cost" defaultValue={this.state.CostPrice} autoComplete="off" />                          
                  <Form.Label className="col-sm-3">Expired</Form.Label>
                  <input className="col-sm-9" id="expired_date" name="expired_date" type="text" placeholder="Expired" defaultValue={this.state.ExpiredDate} autoComplete="off" />                          
                  <div className="row">
                  <div className="col-sm-12">
                  <Form.Label className="col-sm-3">Site Name</Form.Label>
                  <SelectSite className="col-sm-9" value={this.state.SiteId}/>
                  </div>  
                  </div>
                  </form>
                </Modal.Body>       
                

                <Modal.Footer>
                  <Button variant="secondary" onClick={this.modCloseHandler}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.modCloseHandler}>
                    Save Changes
                  </Button>
                </Modal.Footer>

              </Modal>                      

          <DataTable
            title="Master Part Table"
            columns={columns}
            data={this.state.parts}            
            selectableRowsComponentProps={{ inkDisabled: true }}             
            onRowClicked={this.modOpenHandler}            
          />
      </div>
    );
  }
}

export default Part;