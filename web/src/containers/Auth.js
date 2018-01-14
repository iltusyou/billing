import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';

class Auth extends Component {   
    static defaultProps = {
        userInfo: {
            isAuthenticated:false
        }
    }

    render(){
        return(
            <div>
                {!this.props.userInfo.isAuthenticated ? <Redirect to='/login' /> : null}
            </div>
        );
    }
}
const mapStateToProp = (state) => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch) => {
    return { }
}
Auth = connect(mapStateToProp, mapDispatchToProps)(Auth);
export default Auth;
