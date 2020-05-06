import React from 'react'
import {Card} from 'react-bootstrap'
import { FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import { Navbar, Nav } from 'react-bootstrap'
import { IoIosMenu } from 'react-icons/io';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom'

export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            itemsDetail: {},
            imgs: [],
            onPage:1
        }
    }
    componentDidMount() {
        const storageRef = this.props.firebase.storage().ref()
        var listRef = storageRef.child("images/" + this.props.match.params.itemName)
        let imgs = []
        var self = this;
        console.log(listRef)
        listRef.listAll().then((res) => {
            res.prefixes.forEach(function(res) {
                //
            })
            res.items.forEach((itemRef) => {
                itemRef.getDownloadURL().then(function(url) {
                    var myImg = {
                        url: url,
                        ref: itemRef
                    }
                    imgs.push(myImg)
                    self.setState({imgs: imgs})
                })
            })
        }).catch(function(error) {
            //error message
        })
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
      
    nextPage(){
        if( this.state.onPage < this.state.imgs.length/4 ) {
            this.setState(state => ({
                onPage: state.onPage + 1
            }))
        }
    }

    previousPage(){
        if(this.state.onPage > 1) {
            this.setState(state => ({
                onPage: state.onPage - 1
              }))
        }
    }

    addToShoppingCart(){
        this.props.addItemToShoppingCart({
            name: this.props.match.params.itemName,
            url: this.state.imgs.length > 0 ? this.state.imgs[0].url : null
        })
        this.props.history.push("/checkout")
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
                    <div>
                        <div className="border-left border-right border-bottom border-dark row">
                            <strong className="mx-auto my-4">
                            {this.props.match.params.itemName.slice(0,-4)}
                            </strong>
                        </div>
                        <div>
                            <div className="row row-cols-4 row-cols-md-4 border border-dark" >
                                    {this.state.imgs.slice(0 + (this.state.onPage -1) * 4,4 + (this.state.onPage - 1) * 4).map(img => {
                                        return (
                                        <Card style={{ width: '18rem', border: 'none'}}>
                                            <Card.Img className="border border-dark" variant="top" src={img.url} />
                                        </Card>
                                        )
                                    })}
                            </div>
                            <div className="d-flex justify-content-between my-3">
                                <div className="col-sm-5">
                                    <h4><strong>{this.state.itemsDetail.brandName}</strong></h4>
                                    <h1><strong>{this.state.itemsDetail.productName}</strong></h1>
                                    <h4>{this.state.itemsDetail.price}</h4>
                                </div>
                                <div className="align-self-center col-sm-2">
                                    <div className="d-flex justify-content-center">
                                        <div onClick={() => this.previousPage()}><FaChevronLeft /></div>
                                            {this.state.onPage}
                                        <div onClick={() => this.nextPage()}><FaChevronRight /></div>
                                    </div>
                                    <div className="d-flex justify-content-center"> 
                                        page
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <button type="button" className="float-right border border-dark btn-outline-dark" onClick={() => this.addToShoppingCart()}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}