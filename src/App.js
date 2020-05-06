import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';


import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ItemDetail from './pages/item-detail';
import Profile from './pages/profile';
import Upload from './pages/upload';
import ItemEdit from './pages/item-edit';
import UploadDetail from './pages/upload-detail';
import Checkout from './pages/checkout';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: false,
      ready: true,
      shoppingCart: [],
    }
  }
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Logged In");
        this.setState({user: user, ready: true})
      } else {
        console.log("Not Logged In")
        this.setState({user: false, ready: true})
      }
    })
    console.log(this.state.user)
  }

  addItemToShoppingCart = (item) => {
    let newCart = this.state.shoppingCart
    newCart.push(item)
    this.setState({shoppingCart: newCart})
    console.log(newCart)
    console.log(this.state.shoppingCart)
  }

  clearShoppingCart = () => {
    this.setState({shoppingCart: []})
  }

  render() {
    if (this.state.ready) {
      // https://hackernoon.com/create-react-modal-using-reactjs-popup-m24m231v1
      return (
        <Router>
            <Switch>
              <Route path="/login" render={props => 
                this.state.user ? <Redirect to="/home" /> : <Login firebase={this.props.firebase} user={this.state.user} {...props}/>
                } />
              <Route path="/register" render={props => 
                this.state.user ? <Redirect to="/home" /> : <Register firebase={this.props.firebase} user={this.state.user} {...props}/>
                } />
              <Route path="/home" render={props => <Home firebase={this.props.firebase} user={this.state.user} {...props} />} />
              <Route path="/profile" render={props => 
                this.state.user ? <Profile firebase={this.props.firebase} user={this.state.user} {...props} /> : <Redirect to="/login" /> 
                } />
              <Route path="/upload" render={props => 
                this.state.user ? (<Upload firebase={this.props.firebase} user={this.state.user} {...props} />) : <Redirect to="/login" /> 
                } />
              <Route path="/checkout" render={props => 
                this.state.user ? (<Checkout firebase={this.props.firebase} user={this.state.user} shoppingCart={this.state.shoppingCart} clearShoppingCart={this.clearShoppingCart} {...props} />) : <Redirect to="/login" /> 
                } />
              <Route path="/item-detail/:itemName" render={props => 
                this.state.user ? (<ItemDetail firebase={this.props.firebase} user={this.state.user} addItemToShoppingCart={this.addItemToShoppingCart} {...props} />) : <Redirect to="/login" /> 
                } />
              <Route path="/item-edit/:itemName" render={props => 
                this.state.user ? (<ItemEdit firebase={this.props.firebase} user={this.state.user} {...props} />) : <Redirect to="/login" /> 
                } />
              <Route path="/upload-detail/:itemName" render={props => 
                this.state.user ? (<UploadDetail firebase={this.props.firebase} user={this.state.user} {...props} />) : <Redirect to="/login" /> 
                } />
              <Route exact path="/">
                <Redirect to="/home" /> 
              </Route>
            </Switch>
          </Router>


      ) 
    } else {
      return (
        <p>Loading ... </p>
      )
    }
  }
}


export default App;