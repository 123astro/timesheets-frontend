import React from "react";
import Container from "../common/Container";
import InlineInputContainer from '../common/InlineInputContainer'
import Input from "../common/Input";
import Form from "../common/Form";
import Button from "../common/Button";
import Splash from "../common/Splash";
import books from "../../assets/books.jpg"

const AddMatterForm = (props) => {
    const handleChange = (e) => {
        props.updateForm(e.target.id, e.target.value)
    }

    return (
        
        <Container>
            <Splash image={books}>
            <Form onSubmit={props.onSubmit} style={{ marginTop: '1em' }}>
                <InlineInputContainer>
                    <Input
                        matterName="matterName"
                        id="matterName"
                        placeholder="Matter Name"
                        value={props.query.matterName}
                        onChange={handleChange}
                        required
                        type="letter"
                    />
                     <Input
                        clientId="clientId"
                        id="clientId"
                        placeholder="Client ID"
                        value={props.query.clientId}
                        onChange={handleChange}
                        required
                        type="number"
                    />
                </InlineInputContainer>
                <Button disabled={props.submitting}>
                    submit
                </Button>
            </Form>
            </Splash>
        </Container>
          
        
    )

}

export default AddMatterForm;