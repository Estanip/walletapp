import { Alert, Container, Col, Row, Button, Form, Card } from 'react-bootstrap';
import useAuth from '../auth/useAuth';
import { useForm } from 'react-hook-form';
import loginResolver from '../validations/loginResolver';
import { toast } from 'react-toastify';


const LoginPage = () => {

    const auth = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: loginResolver });

    const onSubmit = (data) => {
        auth.login(data)
        if (auth.message) return toast.error(auth.message)
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col xs={{ span: 12 }} md={{ span: 4, offset: 4 }}>
                    <Card>
                        <Card.Header>
                            <h4 className="text-center">Iniciar Sesion</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <input
                                        className="form-control"
                                        name="username"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Ingrese Usuario"
                                        {...register("username")}
                                    />
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
                                    <input
                                        className="form-control"
                                        name="password"
                                        type="password"
                                        placeholder="Ingrese Contraseña"
                                        autoComplete="off"
                                        {...register("password")}
                                    />
                                    {errors?.password && (
                                        <Form.Text>
                                            <Alert variant="danger">
                                                {errors.password.message}
                                            </Alert>
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit" className="col-md-6" variant="success">Ingresar</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
