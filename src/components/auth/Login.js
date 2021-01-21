import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };

this.props.loginUser(userData); 

  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col-sm-6 offset-sm-2 _toppm">
            <Link to="/" className="btn-flat waves-effect">
              Back to
              home
            </Link>
            <div className="col-sm-12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> to MIS
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group input-field col-sm-12">
                 
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"                  
                  className={classnames("form-control", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />                
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="form-group input-field col-sm-12">
                
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"                  
                  className={classnames("form-control", {
                    invalid: errors.password || errors.passwordincorrect
                    })}  
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>                
              </div>
              <div className="col-sm-12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-lg btn-info waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);