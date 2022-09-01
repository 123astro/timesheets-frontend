import React from "react";
import Container from "../common/Container";
import Form from '../common/Form'
import InlineInputContainer from '../common/InlineInputContainer'
import Input from '../common/Input'
import Button from "../common/Button";


const LoginForm = (props) => {

    const handleChange = (e) => {
        props.updateForm(e.target.id, e.target.value)
    }
    return (
        <Container>
            <Form onSubmit={props.onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="id"
                        id="id"
                        value={props.query.id}
                        onChange={handleChange}
                        placeholder="Attorney ID"
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="password"
                        id="password"
                        value={props.query.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        type="password"
                    />
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}


export default LoginForm;