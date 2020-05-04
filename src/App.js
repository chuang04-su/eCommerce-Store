import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import {Navbar, Nav} from 'react-bootstrap'
import { IoIosMenu } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Checking from './pages/checking';
import Profile from './pages/profile';
import Upload from './pages/upload';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: false,
      ready: true
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
  }

  logout = (evt) => {
    var self = this;
    this.props.firebase.auth().signOut().then(function() {
      self.setState({user: false})
      window.location.reload(false);
    }).catch(function(error) {
      alert(error.message)
    })
  } 
  
  render() {
    console.log(this.state.user)

    if (this.state.ready) {
      // https://hackernoon.com/create-react-modal-using-reactjs-popup-m24m231v1
      return (
        <>

        <Navbar bg="light" variant="light" className="border-bottom border-dark">
          <IconContext.Provider value={{ size: "3em", className:"m-3" }}>
            <IoIosMenu/>
            <AiOutlineSearch/>
            <Nav className="mx-auto">
              <Nav.Link href="/#/home">RESOLD</Nav.Link>
            </Nav>
            <FiShoppingCart />
            {
              this.state.user ?
              <button className="btn btn-link nav-link" onClick={this.logout}>Logout</button>
              :
              <Nav.Link href="/#/login"><FaUserAlt /></Nav.Link>
            }
          </IconContext.Provider>

        </Navbar>
        <div className="container">
          
        
        <Router>
            <Switch>
              <Route path="/login">
                {this.state.user ? <Redirect to="/profile" /> : <Login firebase={this.props.firebase} user={this.state.user}/> }
              </Route>
              <Route path="/home">
                {this.state.user ? <Home firebase={this.props.firebase} user={this.state.user} />  : <Home firebase={this.props.firebase} user={this.state.user} /> }
              </Route>
              <Route path="/profile">
                {this.state.user ? <Profile firebase={this.props.firebase} user={this.state.user} />  : <Redirect to="/login" />  }
              </Route>
              <Route path="/upload">
                {this.state.user ? <Upload firebase={this.props.firebase} user={this.state.user} />  : <Redirect to="/login" /> }
              </Route>
              <Route path="/checking">
                {this.state.user ? <Checking firebase={this.props.firebase} user={this.state.user} />  : <Redirect to="/login" />  }
              </Route>
              <Route exact path="/">
                <Redirect to="/home" /> 
              </Route>
            </Switch>
          </Router>
          </div>
      </>
      ) 
    } else {
      return (
        <p>Loading ... </p>
      )
    }
  }
}


export default App;