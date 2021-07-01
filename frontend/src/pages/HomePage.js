import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../helpers/routes';

const HomePage = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
                    <h2 >Bienvenido a Wallet App</h2>
                    <p>Maneja tu presupuesto personal!</p>
                    <div>
                        <Button as={Link} size="sm" className="mr-1" variant="outline-success" to={routes.login}>Inicia Sesion</Button> o
                        <Button as={Link} size="sm" className="ml-2" variant="info" to={routes.register}>
                            Crea tu usuario</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
