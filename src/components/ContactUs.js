import React, { Component } from 'react'
import axios from 'axios'

class ContactUs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             email: '',
             birthday: '',
             contactViaEmail: false
        }
    }

    changeHandler = e => {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [name]: value
        })
    }

    clearHandler = e => {
        this.setState({
             name: '',
             email: '',
             birthday: '',
             contactViaEmail: false
        }, () => console.log(this.state))
    }

    handleSubmit = e => {
        const { name, email, birthday, contactViaEmail } = this.state
        const validCharacters = /^[a-zA-Z ]+$/
        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        e.preventDefault()
        if (name.length === 0) {
            alert('The NAME input field is missing.')
        } else if (!name.match(validCharacters)) {
            alert('The NAME input field can only contains alphabet characters and space')
        } else if (email.length === 0) {
            alert('The EMAIL input field is missing.')
        } else if (!validEmail.test(email)) {
            alert('Invalid EMAIL input')
        } else if (contactViaEmail === false) {
            alert('You must agree to be contact via email in order to submit.')
        } else {
            console.log(this.state);
            axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    render() {
        const { name, email, birthday, contactViaEmail } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input 
                            name="name"
                            type="text"
                            value={name}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Email
                        <input 
                            name="email"
                            type="email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Birthday
                        <input 
                            name="birthday"
                            type="date"
                            value={birthday}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        <input 
                            name="contactViaEmail"
                            type="checkbox"
                            checked={contactViaEmail}
                            onChange={this.changeHandler}
                        />
                        I agree to be contact via email.
                    </label>
                    <button type="button" onClick={this.clearHandler}>Clear</button>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }
}

export default ContactUs
