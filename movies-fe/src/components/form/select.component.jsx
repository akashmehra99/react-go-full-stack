import { Form } from 'react-bootstrap';

export const Select = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={props.name} className="form-label">
                {props.title}
            </Form.Label>
            <Form.Select
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.onChange}
                required
            >
                <option value="">{props.placeholder}</option>
                {props.options.map(({ id, value }) => (
                    <option value={id} key={id}>
                        {value}
                    </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {props.errorMsg}
            </Form.Control.Feedback>
        </Form.Group>
    );
};
