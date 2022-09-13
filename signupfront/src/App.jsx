import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

class App extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:''
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    changePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const registered = {
            email: this.state.email,
            password: this.state.password,
        }

        axios.post("http://localhost:4000/app/signup", registered)
        .then(res => console.log(res.data))

        this.setState({
            email:'',
            password:''
        })
    }

  render() {
    return(
    <div>
        <div className="container">
            <div className='form-div'>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Email" onChange={this.changeEmail} value={this.state.email} className='form-control form-group'/>
                    <input type="password" placeholder="Password" onChange={this.changePassword} value={this.state.password} className='form-control form-group'/>

                    <input type="submit" className="btn btn-danger btn-block" value='submit'/>
                </form>
            </div>
        </div>
    </div>
    )
  }
}



export default App