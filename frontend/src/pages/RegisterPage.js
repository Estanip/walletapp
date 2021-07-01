import { Alert, Button, Col, Row, Container, Form, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import registerResolver from '../validations/registerResolver';
import useAuth from '../auth/useAuth';

const RegisterPage = () => {

    const auth = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: registerResolver })

    const onSubmit = (data) => {
        try {
            auth.createUser(data)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Container>
            <Row className="mt-5">
                <Col xs={{ span: 12 }} md={{ span: 4, offset: 4 }}>
                    <Card>
                        <Card.Header>
                            <h4 className="text-center">Crear Usuario</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese Usuario" name="username" {...register("username")} />
                                    {errors?.username && (
                                        <Form.Text>
                                            <Alert variant="danger">
                                                {errors.username.message}
                                            </Alert>
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingrese Contraseña" name="password" {...register("password")} />
                                    {errors?.password && (
                                        <Form.Text>
                                            <Alert variant="danger">
                                                {errors.password.message}
                                            </Alert>
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit" className="col-md-6" variant="success">Crear</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;
