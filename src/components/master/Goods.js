import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import DataTable  from 'react-data-table-component';
import { Button, Form, Modal } from 'react-bootstrap';
import SelectCategory from "../select/Categories"
import SelectSite from "../select/Sites"
//import SelectSupplier from "../select/Supplier"

const columns = [
  {name: 'FG ID', selector: 'goods.fg_id', sortable: true, width: '7em'},
  {name: 'Category', selector: 'category.mg_cat_name',},
  {name: 'Code', selector: 'goods.fg_code',},
  {name: 'Name', selector: 'goods.fg_name',},
  {name: 'Unit', selector: 'goods.fg_unit',},  
  {name: 'Min Stock', selector: 'goods.min_stock', width: '7.5em'},
  {name: 'Cost', selector: 'goods.production_cost', sortable: true, right: true, width: '7em'},
  {name: 'Net Price', selector: 'goods.net_price',},
  {name: 'Expired', selector: 'goods.expired_date',},
  {name: 'Site Name', selector: 'site.site_name',},
  {name: 'User', selector: 'user.name',},
  {name: 'Stock', selector: 'stock.quantity', width: '5em'},
  {name: 'Updated', selector: 'goods.update_date',},    
];

class Goods extends Component {  
  constructor(props){
    super(props);
    this.state = {
      goods: [],   
      ModalDisplayStatus: false,
      Fgid: "",
      CatId: "",      
      FgCode: "",
      FgName: "",
      Unit: "",           
      MinStock: "",
      Cost: "",
      Markup: "",
      Discount: "",
      NetPrice: "",
      Expired: "",
      SiteId: "",
      UserId: "",      
      Stock: 0,
      FgNotes: "",
      IsNew: false,
    };
    this.modOpenHandler = this.modOpenHandler.bind(this)    
  }
 

  componentDidMount() {
    axios.get("/api/master/goods")
    .then(res => {
      const goods = res.data.Response;      
      this.setState({ goods });      
    })          

  }  

  modOpenHandler = (goods) => {
    this.setState({
      ModalDisplayStatus: true,
      Fgid: goods.goods.fg_id,
      CatId: goods.goods.mg_cat_id,
      FgCode: goods.goods.fg_code, 
      FgName: goods.goods.fg_name, 
      Unit: goods.goods.fg_unit,       
      MinStock: goods.goods.min_stock, 
      Cost: goods.goods.production_cost, 
      Markup: goods.goods.percent_markup, 
      Discount: goods.goods.percent_discount, 
      NetPrice: goods.goods.net_price, 
      Expired: goods.goods.expired_date, 
      SiteId: goods.goods.site_id,
      Stock: goods.stock.quantity, 
      FgNotes:  goods.goods.fg_notes,
    });
  }

  modCloseHandler = goods => {
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
    var Fgid = this.state.Fgid;
    var IsNew = this.state.IsNew;    
    const { user } = this.props.auth;  
    const SavedUserId =  user.Userid;    
    const goodsData = {
      "fg_id": Fgid,   
      "mg_cat_id": this.state.CatId,
      "fg_code": this.state.FgCode,
      "fg_name": this.state.FgName,
      "fg_unit": this.state.Unit,      
      "min_stock": this.state.MinStock,
      "production_cost": this.state.Cost,
      "percent_markup": this.state.Markup,
      "percent_discount": this.state.Discount,
      "net_price": this.state.NetPrice,
      "expired_date": this.state.Expired,
      "site_id": this.state.SiteId,
      "user_id" : SavedUserId,
      "fg_notes" : this.state.FgNotes,
    };
    let sendMethod = 'PUT';
    let sendUrl = "/api/master/goods/"+Fgid;
    if(IsNew){      
      sendMethod = 'POST';
      sendUrl = "/api/master/goods";
    }
    console.log(goodsData);
    const headers = {
      'Content-Type': 'application/json',   
    }    
    axios({
      method: sendMethod,    
      url: sendUrl,
      headers: headers, 
      data: goodsData
    })    
    .then(res => {
      const goodsupdated = res.data.Response;      
      console.log(goodsupdated);            
      this.componentDidMount();
    })                
  }

  handleDelete = () => {    
    const form = this.form;    
    this.setState({ModalDisplayStatus: false});        
    var Fgid = this.state.Fgid;
    const { user } = this.props.auth;  
    const SavedUserId =  user.Userid;        
    const headers = {
      'Content-Type': 'application/json',   
    }    
    axios({
      method: 'DELETE',    
      url: "/api/master/goods/"+Fgid,
      headers: headers,       
    })    
    .then(res => {
      const goodsupdated = res.data.Response;      
      console.log(goodsupdated);      
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
                  <Modal.Title>Goods</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form.Label className="col-sm-3">Fg ID</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="Fgid" name="Fgid" type="text" placeholder="Fg ID" defaultValue={this.state.Fgid} autoComplete="off" />                                                                
                  <div className="row">
                  <div className="col-sm-12">
                  <Form.Label className="col-sm-3">Category</Form.Label>
                  <SelectCategory className="col-sm-9" value={this.state.CatId} name="CatId" onChange={this.handleChange.bind(this)} />                            
                  </div>  
                  </div>
                  <Form.Label className="col-sm-3">Fg Code</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="FgCode" name="FgCode" type="text" placeholder="Fg Code" defaultValue={this.state.FgCode} autoComplete="off" />
                  <Form.Label className="col-sm-3">Fg Name</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="FgName" name="FgName" type="text" placeholder="Fg Name" defaultValue={this.state.FgName} autoComplete="off" />                          
                  <Form.Label className="col-sm-3">Unit</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-9" id="Unit" name="Unit" type="text" placeholder="Unit" defaultValue={this.state.Unit} autoComplete="off" />                                                              
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
            title="Master Fg Table"
            columns={columns}
            data={this.state.goods}            
            selectableRowsComponentProps={{ inkDisabled: true }}             
            onRowClicked={this.modOpenHandler} 
            responsive={true}           
          />
          
      </div>
    );
  }
}

Goods.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Goods);