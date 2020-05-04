import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

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
            console.log(res)
            res.prefixes.forEach(function(res) {
                //
            })
            res.items.forEach((itemRef) => {
                console.log(itemRef)
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


    render() {
        return(
            <>
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
                                    return (
                                    <Card style={{ width: '18rem', border: 'none'}}>
                                        <Link to="/checking"><Card.Img className="border border-dark" variant="top" src={item.url} /></Link>
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
                                {this.state.items.map(items => {
                                    return (
                                    <Card style={{ width: '18rem', border: 'none'}}>
                                        <Link to="/checking"><Card.Img className="border border-dark" variant="top" src="https://via.placeholder.com/100px120" /></Link>
                                        <Card.Body>
                                            <Card.Text><strong>{items.brandName}</strong></Card.Text>
                                            <Card.Title><strong>{items.productName}</strong></Card.Title>
                                            <Card.Text>{items.price}</Card.Text>
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
            </>
        )
    }
}