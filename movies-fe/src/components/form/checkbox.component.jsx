import { Form } from 'react-bootstrap';

export const Checkbox = (props) => {
    return (
        <Form.Check
            type="checkbox"
            id={props.name}
            label={props.name}
            value={props.value}
            onChange={props.onChange}
            checked={props.checked}
        ></Form.Check>
    );
};
