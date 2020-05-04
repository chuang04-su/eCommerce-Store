import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: []
        }
    }
    
    componentDidMount() {
        const storageRef = this.props.firebase.storage().ref()
        var listRef = storageRef.child("images")
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


    render() {
        return(
            <>
            <div className="border-left border-right border-bottom-3 border-dark row">
                    <strong className="mx-auto my-4">
                        Start Browsing
                    </strong>    
            </div>
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

            </div>
            </>
        )
    }
}