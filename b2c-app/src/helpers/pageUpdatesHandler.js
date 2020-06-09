export function onError(errors) {
    Object.keys(this.state.errors).forEach((key) => {
        const found = errors.some(el => {
            return el.id === this.state.errors[key].id;
        });
        if (!found) {
            errors.push(this.state.errors[key]);
        }
    });
}

export function onChange(valuesToSet) {
    //after changes, hide B2C errors until next submit
    this.setState({ showB2CErrors: false });
    //set input values in state
    Object.keys(valuesToSet).forEach((key) => {
        this.setState({ [key]: valuesToSet[key] });
    });
}