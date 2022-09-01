import React from "react";
import Container from "../common/Container";
import InlineInputContainer from '../common/InlineInputContainer'
import Input from "../common/Input";
import Form from "../common/Form";
import Button from "../common/Button";

const AddCLientForm = (props) => {
    const handleChange = (e) => {
        props.updateForm(e.target.id, e.target.value)
    }

    return (

        <Container>
            <Form onSubmit={props.onSubmit} style={{ marginTop: '1em' }}>
                <InlineInputContainer>
                    <Input
                        clientName="companyName"
                        id="companyName"
                        placeholder="companyName"
                        value={props.query.companyName}
                        onChange={handleChange}
                        required
                        type="letter"
                    />
                    <Input
                        contactName="contactName"
                        id="contactName"
                        placeholder="contactName"
                        value={props.query.contactName}
                        onChange={handleChange}
                        required
                        type="letter"
                    />
                    <Input
                        phoneNumber="phoneNumber"
                        id="phoneNumber"
                        placeholder="phoneNumber"
                        value={props.query.phoneNumber}
                        onChange={handleChange}
                        required
                        type="letter"
                    />
                </InlineInputContainer>
                <Button disabled={props.submitting}>
                    submit
                </Button>
            </Form>
        </Container>
    )

}

export default AddCLientForm;