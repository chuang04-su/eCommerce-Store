import React from 'react'
import { Card } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import { IoIosMenu } from 'react-icons/io';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: []
        }
    }
    
    componentDidMount() {
        const storageRef = this.props.firebase.storage().ref()
        var listRef = storageRef.child(this.props.user.uid)
        let items = []
        var self = this;
        listRef.listAll().then((res) => {
            res.prefixes.forEach(function(res) {
                //
            })
            res.items.forEach((itemRef) => {
                itemRef.getDownloadURL().then(function(url) {
                    var myitem = {
                        url: url,
                        ref: itemRef
                    }
                    items.push(myitem)
                    self.setState({items: items})
                })
            })
        }).catch(function(error) {
            //error message
        })
    }
    placeholder() {
        let placeholderItems = []
        for (let i = 0; i < 16 - this.state.items.length; i++){
            placeholderItems.push(
            <Card style={{ width: '18rem', border: 'none'}}>
                <Link to="/upload"><Card.Img className="border border-dark" variant="top" src="https://via.placeholder.com/100px120" /></Link>
                <Card.Body>
                    <Card.Text><strong>Brand Name</strong></Card.Text>
                    <Card.Title><strong>Product Name</strong></Card.Title>
                    <Card.Text>$Price</Card.Text>
                </Card.Body>
            </Card>
            )
        }
        return placeholderItems
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
                    <div className="border-left border-right border-bottom-3 border-dark row">
                            <strong className="mx-auto my-4">
                                {this.props.user.email}
                            </strong>    
                    </div>
                    <div>
                        {this.state.items.length > 0 
                        ?
                        <div>
                            {this.state.items.length < 16
                                ?
                                <div className="row row-cols-4 row-cols-md-4 border border-dark" >
                                        {this.state.items.map(item => {
                                            let link = "/item-edit/" + item.ref.name
                                            return (
                                            <Card style={{ width: '18rem', border: 'none'}}>
                                                <Link to={link}><Card.Img className="border border-dark" variant="top" src={item.url} /></Link>
                                                <Card.Body>
                                                    <Card.Text><strong>Brand Name</strong></Card.Text>
                                                    <Card.Title><strong>Product Name</strong></Card.Title>
                                                    <Card.Text>$Price</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            )
                                        })}
                                        {this.placeholder()}
                                </div>
                                :
                                <div className="row row-cols-4 row-cols-md-4 border border-dark" >
                                        {this.state.items.map(item => {
                                            let link = "/item-edit/" + item.ref.name
                                            return (
                                            <Card style={{ width: '18rem', border: 'none'}}>
                                                <Link to={link}><Card.Img className="border border-dark" variant="top" src={item.url} /></Link>
                                                <Card.Body>
                                                    <Card.Text><strong>Brand Name</strong></Card.Text>
                                                    <Card.Title><strong>Product Name</strong></Card.Title>
                                                    <Card.Text>$Price</Card.Text>
                                                </Card.Body>
                                            </Card>
                                            )
                                        })}
                                </div>
                            }
                        </div>
                        :
                        <div>
                            <div className="row row-cols-4 row-cols-md-4 border border-dark" >
                                        {this.placeholder()}
                                </div>
                        </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}