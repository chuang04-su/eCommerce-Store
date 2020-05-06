import React from 'react'
import {Card} from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import { IoIosMenu } from 'react-icons/io';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom'
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            error: null
        }
    }

    componentDidMount(){

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

    sendCheckoutEmail(){
        let self = this
        const msg = {
            to: this.props.user.email,
            from: 'customService@resold.com',
            subject: 'Resold Checkout Message',
            text: 'This is an automatic message',
        };
        console.log(msg)
        sgMail.send(msg, (error, result) => {
            if (error) {
              console.log(error)
            }
            else {
              console.log(result)
              self.props.history.push("/home")
            }
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
                            <h1><strong>Your Shopping Bag</strong></h1>
                            <div className="border border-dark p-5 mb-4 text-center">
                                {this.props.shoppingCart.length > 0
                                ?
                                    <div className="border border-dark">
                                        {this.props.shoppingCart.map(item => {
                                        return(
                                            <Card style={{ width: '18rem', border: 'none'}}>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Img className="border border-dark" variant="top" src={item.url} />
                                            </Card>
                                        )})}
                                        <button className="btn btn-outline-dark" disabled={this.props.shoppingCart.length < 1} onClick={this.props.clearShoppingCart}>Clear Cart</button>
                                    </div>
                                :
                                    <h1>You don't have anything yet</h1>
                                }
                            </div>
                            <button className="btn btn-outline-dark" disabled={this.props.shoppingCart.length < 1} onClick={() => this.sendCheckoutEmail()}>Check Out</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}