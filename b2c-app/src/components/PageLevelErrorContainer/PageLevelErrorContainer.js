import React from 'react';
import { Link, animateScroll } from "react-scroll";
import * as B2CErrorParserService from '../../services/B2CErrorParserService';

class PageLevelErrorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b2cErrors: []
        };
        this.showSummaryText = this.showSummaryText.bind(this);
        this.pageLevelErrorCallback = this.pageLevelErrorCallback.bind(this);
        this.hasErrorItems = this.hasErrorItems.bind(this);
        this.hasB2CErrorItems = this.hasB2CErrorItems.bind(this);
    }

    pageLevelErrorCallback(mutationsList, observer) {
        //flag to see if we have to refresh page level errors
        let refreshErrorsRequired = false;

        //define function here temporarily to make it work
        //function to refresh the page level errors in our govuk container with the right format
        let refreshErrors = () => {

            //get all page level error elements
            let pageErrors = document.getElementsByClassName('error pageLevel');

            // find out how many of these errors are visible
            let numVisibleItems = Array.from(pageErrors).filter((item) => {
                return item.style.display !== 'none';
            }).length;

            // add the visible errors if there are any
            if (numVisibleItems > 0) {
                let errors = Array.from(pageErrors).reduce((result, error) => {
                    if (error.style.display !== 'none') {
                        result.push(B2CErrorParserService.parseB2CErrors(error.innerText));
                    }
                    return result;
                }, []);

                //set them in the state
                this.setState({ b2cErrors: Array.from(errors) });
                //scroll to the top of the page to show the errors
                animateScroll.scrollToTop({ duration: 500 });
            } else {
                this.setState({ b2cErrors: [] });
            }
        }

        //loop through mutated objects to run crazy logic and update the UI accordingly
        for (let mutation of mutationsList) {

            //Determine if we will need to refresh the page level errors after the loop
            if (!refreshErrorsRequired &&
                mutation.target.classList.contains('error') &&
                mutation.target.classList.contains('pageLevel')
            ) {
                refreshErrorsRequired = true;
            }
        }

        //refresh the page level errors if there was at least one included
        if (refreshErrorsRequired) {
            refreshErrors();
        }
    }

    componentDidMount() {
        const targetNode = document.getElementById('api');

        if (targetNode) {
            const obs = new MutationObserver(this.pageLevelErrorCallback);
            const observerConfig = { attributes: true, childList: true, subtree: true };
            obs.observe(targetNode, observerConfig);
        }
    }

    showSummaryText(errorArray) {
        //show error summary if there are errors (not considering B2C errors as they don't show/hide summary text)
        return this.hasErrorItems() &&
            errorArray.some(item => {
                return item.showSummaryText;
            });
    }

    hasErrorItems(errorArray) {
        let hasErrors = errorArray && errorArray.some(errorItem => {
            return !!errorItem.text;
        });
        return hasErrors;
    }

    hasB2CErrorItems() {
        return this.props.showB2CErrors && this.state.b2cErrors.length > 0;
    }

    render() {
        let errorItems;
        let errorArray = [];
        if (this.props.errorItems) {

            //turn errors passed in into an array to then map it into link components
            Object.keys(this.props.errorItems).forEach((key) => {
                errorArray.push(this.props.errorItems[key]);
            });

            errorItems = errorArray.map(error => {
                //render links if there is an id that the link will take user to
                if (error.id) {
                    return (
                        <li key={error.id}>
                            <Link
                                href='#'
                                to={error.id}
                                spy={false}
                                smooth={true}
                                offset={-80}
                                duration={500}>
                                {error.text}
                            </Link>
                        </li>
                    )
                }
                //if there is no id then render as a normal paragraph
                else {
                    return (
                        <li key={error.text}>
                            <p>{error.text}</p>
                        </li>
                    )
                }
            });
        }

        let b2cErrorItems;
        if (this.props.showB2CErrors && this.state.b2cErrors) {
            b2cErrorItems = this.state.b2cErrors.map(error => {
                if (error) {
                    return (
                        <li key={error}>
                            {error}
                        </li>
                    )
                }
                return null;
            });
        }

        let errorSummary;
        if (this.props.summaryTextContent && this.showSummaryText(errorArray)) {
            errorSummary =
                <div id="errorSummaryText">
                    {this.props.summaryTextContent}
                </div>
        }

        const containerClassName = `pageLevelErrorContainer ${this.hasErrorItems(errorArray) || this.hasB2CErrorItems() ? "show" : "hide"}`;

        return (
            <div className={containerClassName}>
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                    <h2 className="govuk-error-summary__title" id="error-summary-title">
                        There is a problem
                    </h2>
                    {errorSummary}
                    <div className="govuk-error-summary__body">
                        <ul id="errorSummaryItems" className="govuk-list govuk-error-summary__list">
                            {errorItems}
                            {b2cErrorItems}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default PageLevelErrorContainer;