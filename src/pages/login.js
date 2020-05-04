import React from 'react'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            error: null
        }
    }


    loginHandler = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const user = {};
        var self = this;
        for (let pair of formData.entries()) {
            user[pair[0]] = pair[1];
        }
        console.log(self.props)
        this.props.firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            self.props.history.push('/profile')
        })
        .catch(function(error) {
            self.setState({error: error.message})
        });
    }

    render() {
        return(
            <>
            <div className="row h-100 align-items-center justify-content-center my-5">
              <div className="col-12 col-sm-8 d-flex flex-column align-items-center">
                <h1><strong>LOGIN</strong></h1>
                  <h1 className="sr-only">Login</h1>
                  {this.state.error &&
                      <p>{this.state.error}</p>
                  }
                  <form className="form border border-dark p-5 mb-4 text-center" onSubmit={this.loginHandler}>
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
            </>
        )
    }
}