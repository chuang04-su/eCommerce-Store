import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { IoIosMenu } from 'react-icons/io';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom'

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            error: null
        }
    }

    logout = (evt) => {
        var self = this;
        this.props.firebase.auth().signOut().then(function() {
          self.setState({user: false})
          window.location.href = "/";
            }).catch(function(error) {
          alert(error.message)
        })
    } 
      

    registerHandler = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const user = {};
        var self = this;
        for (let pair of formData.entries()) {
            user[pair[0]] = pair[1];
        }
        this.props.firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
            // Handle Errors here.
            self.setState({error: error.message})
        }).then(function(){
            self.props.history.push("/home")
        });
    }

    render() {
        return(
            <>
             <Navbar bg="light" variant="light" className="border-bottom border-dark">
                    <IconContext.Provider value={{ size: "3em", className:"m-3" }}>
                        <Link style={{ textDecoration: 'none', color: 'black'}} to="/"><IoIosMenu/></Link>
                        <Link style={{ textDecoration: 'none', color: 'black'}} to="/checkout"><FiShoppingCart /></Link>
                        <Nav className="mx-auto">
                             <Link style={{ textDecoration: 'none', color: 'gray'}} to="/home">RESOLD</Link>

                        </Nav>
                        <Link style={this.props.user ? { color: 'black' } : { color: 'gray'} } onClick={this.logout} disabled={!this.props.user}><FiLogOut /></Link>
                        <Link style={{ textDecoration: 'none', color: 'black'}} to="/profile"><FaUserAlt /></Link>
                    </IconContext.Provider>
                </Navbar>
                <div className="container">
                    <div className="row h-100 align-items-center justify-content-center my-5">
                        <div className="col-12 col-sm-8 d-flex flex-column align-items-center">
                            <h1><strong>Register</strong></h1>
                            <h1 className="sr-only">Login</h1>
                            {this.state.error &&
                                <p>{this.state.error}</p>
                            }
                            <form className="form border border-dark p-5 mb-4 text-center" onSubmit={this.registerHandler}>
                                <div className="form-group">
                                    <input type="text" style={{textAlign:"center"}} className="form-control" placeholder="Email" name="email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" style={{textAlign:"center"}} className="form-control" placeholder="password" name="password" />
                                </div>
                                <button className="btn-outline-dark mx-auto" type="submit"><h3>ENTER</h3></button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}