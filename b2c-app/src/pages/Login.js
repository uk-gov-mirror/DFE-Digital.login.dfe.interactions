import React from 'react';
import components from '../components';
import { ACTIONS } from '../constants/actions';
import { onChange } from '../helpers/pageUpdatesHandler';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            showErrors: false,
            showB2CErrors: true,
            errors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = onChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //update error messages
        this.state.errors.forEach((error) => {
            error.visible.text = error.current.text;
            error.visible.showSummaryText = true;
        });
        //do something to validate and decide if we submit or show errors
        if (this.state.email &&
            this.state.password) {
            //hide our validation errors and prepare to show B2C ones (in case there are any)
            this.setState({ showErrors: false });
            this.setState({ showB2CErrors: true });
            //everything is valid, set data and submit B2C form
            this.setDataAndSubmit();
        }
        else {
            //show errors in each component
            this.setState({ showErrors: true });
        }
    }

    setDataAndSubmit() {
        //retrieve all elements we will need and set their values
        let b2cEmail = document.getElementById('email');
        let b2cPassword = document.getElementById('password');
        let b2cSubmitButton = document.getElementById('next');

        if (b2cEmail && b2cPassword && b2cSubmitButton) {
            b2cEmail.value = this.state.email;
            b2cPassword.value = this.state.password;
            //submit B2C form
            b2cSubmitButton.click();
        }
    }

    render() {

        const cannotAccessAccountLink = <components.Link action={ACTIONS.RESET_PASSWORD} text="I cannot access my account" key="resetPassword" />;

        const formContent = [
            <components.InputField
                type='email'
                inputId='email'
                inputLabel='Email address'
                onChange={this.onChange}
                errorMessagePlaceholder='email address'
                showErrors={this.state.showErrors}
                errors={this.state.errors}
                key='email'
            />,
            <components.InputField
                type='password'
                inputId='password'
                inputLabel='Password'
                onChange={this.onChange}
                errorMessagePlaceholder='password'
                showErrors={this.state.showErrors}
                errors={this.state.errors}
                key='password'
            />,
            <components.Paragraph text={cannotAccessAccountLink} errors={this.state.errors} key='paragraph' />
        ];

        const createNewAccountParagraph = [
            <components.Link action={ACTIONS.SIGNUP} text="Creating an account" key="signup" />,
            " allows you to access and save your skills health check reports."
        ];

        const additionalColumnContent =
            <div className="govuk-grid-column-one-half">
                <components.PageTitle size='l' title='Create an account' key='columnTitle' />
                <components.Paragraph text={createNewAccountParagraph} key='paragraph' />
            </div>
            ;

        return (
            <div id="login">
                <components.PageContainer
                    pageTitle='Sign in'
                    formContent={formContent}
                    submitButtonText='Sign in'
                    submitHandler={this.handleSubmit}
                    errors={this.state.errors}
                    showB2CErrors={this.state.showB2CErrors}
                    additionalColumn={additionalColumnContent}
                    errorSummaryContent={<components.Paragraph text="Your sign in details are incorrect" />}
                />
            </div>
        )
    }
}

export default Login;
