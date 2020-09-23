import React, { Component } from 'react'
import axios from 'axios'
import '../css/ContactUs.css';

class ContactUs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             email: '',
             birthDate: '',
             emailConsent: false,
             disableSubmitButton: true
        }
    }

    changeHandler = e => {
        const nameSelect = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [nameSelect]: value
        })
        this.checkValidation()
    }

    checkValidation = e => {
        
        const { name, email, birthDate, emailConsent, disableSubmitButton } = this.state
        const validCharacters = /^[a-zA-Z ]+$/
        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const today = new Date();
        const birthdate = new Date(birthDate);
        if (
            !(name.length === 0) &&
            name.match(validCharacters) &&
            !(email.length === 0) &&
            validEmail.test(email) &&
            emailConsent === true &&
            birthdate < today
        ) {
            this.setState({
            disableSubmitButton: false
        }, () => console.log('passed'))}
    }

    clearHandler = e => {
        this.setState({
             name: '',
             email: '',
             birthDate: '',
             emailConsent: false
        })
        console.log('clicked clear')
    }

    handleSubmit = e => {
        const { name, email, birthDate, emailConsent } = this.state
        e.preventDefault()
        console.log(this.state);
        axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', JSON.stringify({name : name, email: email, birthDate: birthDate, emailConsent: emailConsent }))
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const { name, email, birthDate, emailConsent, disableSubmitButton } = this.state
        
        return (
            <div className="container">
                <h1>Contact Us</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input 
                            className="text"
                            name="name"
                            type="text"
                            value={name}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Email
                        <input 
                            className="text"
                            name="email"
                            type="email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Birth Date
                        <input 
                            className="text"
                            name="birthDate"
                            type="date"
                            value={birthDate}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label className="checkbox">
                        <input 
                            
                            name="emailConsent"
                            type="checkbox"
                            checked={emailConsent}
                            onChange={this.changeHandler}
                        />
                        I agree to be contact via email.
                    </label>
                    <div className="float-right">
                        <button className="clear" type="button" onClick={this.clearHandler}>Clear</button>
                        <input disabled={disableSubmitButton} className={disableSubmitButton ? 'submit-inactive' : 'submit'} type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default ContactUs
