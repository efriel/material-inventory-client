import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import DataTable  from 'react-data-table-component';
import { Button, Form, Modal } from 'react-bootstrap';
import SelectWarehouse from "../select/Warehouse"
import SelectBuyer from "../select/Buyer"
import SelectOriginator from "../select/Originator"
import SelectParts from "../select/Parts";

const columns = [
  {name: 'ID', selector: 'purchase.purchase_id', width: '9em'},  
  {name: 'Cat Material', selector: 'warehouse.wh_name',},  
  {name: 'Part Name', selector: 'part.part_name',},
  {name: 'Qty', selector: 'purchase.qty', width: '7em'},
  {name: 'Curr Stock', selector: 'stock.quantity',},
  {name: 'Request Date', selector: 'purchase.purchase_date',},
  {name: 'Estimated', selector: 'purchase.estimated_cost',},    
  {name: 'Buyer Name', selector: 'buyer.name',},  
  {name: 'Originator Name', selector: 'originator.name',},  
  {name: 'User Name', selector: 'user.name',},  
  {name: 'Status Name', selector: 'status.status_name',},    
  {name: 'Updated', selector: 'purchase.update_date',},
];

class Request extends Component {  
  constructor(props){
    super(props);
    this.state = {
      purchase: [],   
      ModalDisplayStatus: false,
      IsNew: false,

      Purchaseid: "",
      Supplierid: "",
      Suppliername: "",
      WhId: "1",
      Whname: "",
      PartId: "",
      Partname: "",
      Qty: "",
      Stock: "",
      Purchasedate: "",
      Estimatedcost: "",
      Invoiceid: "",
      Invoicefile: "",
      Receiptid: "",
      Receiptfile: "",
      BuyerId: 0,
      Buyername: "",
      OriginatorId: 0,
      Originatorname: "",
      UserId: "",
      Username: "",
      Notes: "",
      Statusflag: "A",
      StatusName: "",
      Bidoutdate: "",
      Closeddate: "",
      Insertdate: "",
      Updatedate: "",
    };
    this.modOpenHandler = this.modOpenHandler.bind(this)    
  }
 

  componentDidMount() {
    axios.get("http://rumeh.com:9000/api/purchase/status/a")
    .then(res => {
      const purchase = res.data.Response;      
      this.setState({ purchase });            
    })          

  }  

  modOpenHandlerAdd = (purchase) => {
    this.setState({
      ModalDisplayStatus: true,
      IsNew: true,
    });
  }

  modOpenHandler = (purchase) => {    
    
    this.setState({
      ModalDisplayStatus: true,   
      IsNew: false,   
      Purchaseid: purchase.purchase.purchase_id,
      Supplierid: purchase.purchase.supplier_id,
      Suppliername: purchase.supplier.supplier_name,
      WhId: purchase.purchase.wh_id,
      Whname: purchase.warehouse.wh_name,
      PartId: purchase.purchase.part_id,
      Partname: purchase.part.part_name,
      Qty: purchase.purchase.qty,
      Stock: purchase.stock.quantity,
      Purchasedate: purchase.purchase.purchase_date,
      Estimatedcost: purchase.purchase.estimated_cost,
      Invoiceid: purchase.purchase.invoice,
      Invoicefile: purchase.docinvoice.file_name,
      Receiptid: purchase.purchase.receipt,
      Receiptfile: purchase.docreceipt.file_name,
      BuyerId: purchase.purchase.buyer_id,
      Buyername: purchase.buyer.name,
      OriginatorId: purchase.purchase.originator_id,
      Originatorname: purchase.originator.name,
      UserId: purchase.purchase.user_id,
      Username: purchase.user.name,
      Notes: purchase.purchase.notes,
      Statusflag: purchase.purchase.status_flag,
      StatusName: purchase.status.status_name,
      Bidoutdate: purchase.purchase.bidout_date,
      Closeddate: purchase.purchase.closed_date,
      Insertdate: purchase.purchase.purchase_id,
      Updatedate: purchase.purchase.purchase_id,
    });
  }

  modCloseHandler = parts => {
    this.setState({ModalDisplayStatus: false});    
  }

  handleChange (e) {    
    const target = e.target;        
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;    
    this.setState({
      [name]: value
    });        
  }

  handleCreate = () => {    
    const form = this.form;    
    this.setState({ModalDisplayStatus: false});        
    var Purchaseid = this.state.Purchaseid;    
    var IsNew = this.state.IsNew; 
    const { user } = this.props.auth;  
    const SavedUserId =  user.Userid;      
    let BuyerId = parseInt(this.state.BuyerId, 10);
    let OriginatorId = parseInt(this.state.OriginatorId, 10);
    let partData = {             
      "wh_id": this.state.WhId,
      "part_id": this.state.PartId,
      "qty": this.state.Qty,      
      "estimated_cost": this.state.Estimatedcost,      
      "buyer_id": BuyerId,
      "originator_id": OriginatorId,
      "user_id": SavedUserId,
      "notes": this.state.Notes,
      "status_flag": this.state.Statusflag      
    };
    
    let sendMethod = 'PUT';
    let sendUrl = "http://rumeh.com:9000/api/purchase/status/"+Purchaseid;
    if(IsNew){      
      sendMethod = 'POST';
      sendUrl = "http://rumeh.com:9000/api/purchase/status";
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
      this.componentDidMount();
    })        

  }

  handleDelete = () => {    
    const form = this.form;    
    this.setState({ModalDisplayStatus: false});        
    var Purchaseid = this.state.Purchaseid;
    const { user } = this.props.auth;  
    const SavedUserId =  user.UserId;            
    const headers = {
      'Content-Type': 'application/json',   
    }    
    axios({
      method: 'DELETE',    
      url: "http://rumeh.com:9000/api/purchase/status/"+Purchaseid,
      headers: headers,       
    })    
    .then(res => {
      const partupdated = res.data.Response;                
    })        

  }

  saveFormRef = (form) => {
      this.form = form;      

  }

  render() {  
    //const { ModalDisplayStatus } = this.state.ModalDisplayStatus;     
    

    return (
      <div>                        
              <Modal show={this.state.ModalDisplayStatus} onHide={this.modCloseHandler} dialogClassName="modal-80w" aria-labelledby="contained-modal-title-vcenter" centered>
                <form id="dataForm" ref={this.saveFormRef}>
                <Modal.Header closeButton>
                  <Modal.Title>RFM</Modal.Title>
                  <Form.Label className="col-sm-3"Request for Material></Form.Label>
                </Modal.Header>

                <Modal.Body>                  
                  <div className="col-sm-12">
                  <div className="row">
                  <Form.Label className="col-sm-4">Type of Material</Form.Label>
                  <SelectWarehouse className="col-sm-7" value={this.state.WhId} name="WhId" onChange={this.handleChange.bind(this)} />                            
                  </div>  
                  </div>
                  <div className="col-sm-12">
                  <div className="row">
                  <Form.Label className="col-sm-4">Part Name</Form.Label>
                  <SelectParts className="col-sm-7" value={this.state.PartId} name="PartId" onChange={this.handleChange.bind(this)} />                            
                  </div>  
                  </div>                    
                  <Form.Label className="col-sm-4">Estimated Cost</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-7" id="Estimatedcost" name="Estimatedcost" type="text" placeholder="Estimated Cost" defaultValue={this.state.Estimatedcost} autoComplete="off" />
                  <div className="col-sm-12">
                  <div className="row">
                  <Form.Label className="col-sm-4">Select Buyer</Form.Label>
                  <SelectBuyer className="col-sm-7" value={this.state.BuyerId} name="BuyerId" onChange={this.handleChange.bind(this)} />
                  </div>
                  </div>
                  <div className="col-sm-12">
                  <div className="row">
                  <Form.Label className="col-sm-4">Select Originator</Form.Label>
                  <SelectOriginator className="col-sm-7" value={this.state.OriginatorId} name="OriginatorId " onChange={this.handleChange.bind(this)} />
                  </div>
                  </div>
                  <div className="col-sm-12">
                  <div className="row">
                  <Form.Label className="col-sm-4">Quantity</Form.Label>
                  <input onChange={this.handleChange.bind(this)} className="col-sm-7" id="Qty" name="Qty" type="text" placeholder="Qty" defaultValue={this.state.Qty} autoComplete="off" />
                  </div>
                  </div>
                  <div className="col-sm-12">
                  
                  <input
                      name="IsAutomatic"
                      type="checkbox"
                      checked={false}
                      onChange={this.handleChange.bind(this)} />
                  <label>
                     -   Check to set Bidder Automatic Selection Mode                     
                  </label>
                  
                  </div>
                  <div className="col-sm-12">
                  <div className="row">
                  <Form.Label className="col-sm-12">Special Instruction</Form.Label>  
                  <textarea onChange={this.handleChange.bind(this)} className="col-sm-10 offset-sm-1" id="Notes" name="Notes">                  
                  {this.state.Notes} 
                  </textarea>                  
                  </div>
                  </div>
                </Modal.Body>       
                

                <Modal.Footer>
                  <Button variant="secondary" onClick={this.modCloseHandler}>
                    Close
                  </Button>                  
                  <Button type="button" onClick={this.handleCreate.bind(this)} class="btn btn-primary">
                    Submit
                  </Button>
                </Modal.Footer>
                </form>

              </Modal>                      
          <div className="row">
            <div className="col-sm-12"> 
              <hr className="hr"/>
              <Button type="button" variant="primary" onClick={this.modOpenHandlerAdd}>Add Request</Button>{' '}
            </div>    
          </div>    
          <DataTable
            title="List Of Request"
            columns={columns}
            data={this.state.purchase}            
            selectableRowsComponentProps={{ inkDisabled: true }}             
            onRowClicked={this.modOpenHandler}                        
          />
          
      </div>
    );
  }
}

Request.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Request);