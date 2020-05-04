import React from 'react'
import {Card} from 'react-bootstrap'
import { FaChevronLeft, FaChevronRight} from 'react-icons/fa';

export default class Checking extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            itemsDetail: {},
            imgs: [],
            onPage:0
        }
    }
    componentDidMount() {
        let self = this
        var itemsDetail = {
            brandName: "Brand Name" + i,
            productSize: "XS",
            productName: "Product Name",
        }
        self.setState({itemsDetail: itemsDetail})

        
        let imgs = []
        for (var i = 0; i < 16; i++) {
            var img = {
                url: "placeholder" + i,
            }
            imgs.push(img)
        }
        self.setState({imgs: imgs})
        console.log(imgs)

    }
    render() {
        return(
            <div>
                <div className="border-left border-right border-bottom border-dark row">
                    <strong className="mx-auto my-4">
                        Checking items
                    </strong>
                </div>
                <div>
                    <div className="row row-cols-4 row-cols-md-4 border border-dark" >
                            {this.state.imgs.slice(0 + this.state.onPage * 4,4 + this.state.onPage * 4).map(img => {
                                return (
                                <Card style={{ width: '18rem', border: 'none'}}>
                                    <Card.Img className="border border-dark" variant="top" src="https://via.placeholder.com/100px120" />
                                    
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
                                <FaChevronLeft />
                                {this.state.onPage + 1}
                                <FaChevronRight />
                            </div>
                            <div className="d-flex justify-content-center"> 
                                page
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <button type="button" className="float-right border border-dark btn-outline-dark">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}