import { Alert, Container, Row, Col, Button, Form, Card, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import useAuth from '../auth/useAuth';
import entranceResolver from '../validations/entraceResolver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';


const WalletPage = () => {

    const { register, reset, formState: { errors }, handleSubmit, setValue, getValues } = useForm({ resolver: entranceResolver })

    const apiUrl = 'http://localhost:4000/api';
    const auth = useAuth();
    const id = auth.user.id;
    const token = auth.user.token


    const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: token
        }
    })



    const [ingresos, setIngresos] = useState([]);
    const [egresos, setEgresos] = useState([]);
    const [totalEgr, setTotalEgr] = useState(0);
    const [totalIng, setTotalIng] = useState(0);
    const [total, setTotal] = useState(0);
    const [movId, setMovId] = useState()
    const [isEditing, setIsEditing] = useState(false)

    const getIngresos = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/wallet/ingresos/' + id)
            const result = res.data
            if (result === null) {
                setIngresos(0)
            } else {
                setIngresos(result)
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    const getEgresos = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/wallet/egresos/' + id)
            const result = res.data;
            if (result === null) {
                setEgresos(0)
            } else {
                setEgresos(result)
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    const getTotalIng = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/wallet/totalingresos/' + id)
            if (res.data === null) {
                setTotalIng(0)
            } else {
                setTotalIng(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    };

    const getTotalEgr = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/wallet/totalegresos/' + id)
            if (res.data === null) {
                setTotalEgr(0)
            } else {
                setTotalEgr(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    };

    const getTotal = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/wallet/total/' + id)
            if (res.data === null) {
                setTotal(0)
            } else {
                setTotal(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    };

    const onSubmit = async (data) => {
        isEditing ? editMov(movId, data) : createMov(data)
    };

    const createMov = async (data) => {
        try {
            if (data.tentrance !== "ingreso" && data.tentrance !== "egreso") {
                return toast.error("No se ingreso tipo de entrada")
            }
            await authAxios.post('http://localhost:4000/api/wallet/' + id, data)
            getIngresos();
            getEgresos();
            getTotalIng();
            getTotalEgr();
            getTotal();
            toast.success("Creado con exito")
            reset()
        } catch (error) {
            if (error.response.status === 500) {
                auth.logout()
                toast.warning("Token Expirado");
            }
        }
    }

    const editMov = async (movId) => {
        const editedMov = {
            tentrance: getValues("tentrance"),
            entrance: getValues("entrance"),
            concept: getValues("concept")
        }
        console.log(editedMov)
        try {
            await axios.put('http://localhost:4000/api/wallet/update/' + movId, editedMov)
            getIngresos();
            getEgresos();
            getTotalIng();
            getTotalEgr();
            getTotal();
            toast.success("Editado con Exito")
            reset()
            setIsEditing(false);
            setMovId("")
        } catch (error) {
            if (error.response.status === 500) {
                auth.logout()
                toast.warning("Token Expirado");
            }
        }
    }

    const handleRemove = async (movId) => {
        try {
            await axios.delete(`http://localhost:4000/api/wallet/delete/${movId}`)
            getIngresos();
            getEgresos();
            getTotalIng();
            getTotalEgr();
            getTotal();
            toast.warning("Borrado con exito")
        } catch (err) {
            console.log(err)
        }
    };

    const handleEdit = (movId, tentrance, entrance, concept) => {
        setValue("entrance", entrance);
        setValue("tentrance", tentrance);
        setValue("concept", concept);
        setMovId(movId);
        setIsEditing(true);
    }

    useEffect(() => {
        getIngresos();
        getEgresos();
        getTotalIng();
        getTotalEgr();
        getTotal();
    }, []);

    return (
        <Container fluid>
            <Row className="mt-5">
                <Col className="ml-5" xs={{ span: 12 }} lg={{ span: 3 }}>
                    <Card>
                        <Card.Header>
                            <h4 className="text-center">Tus Movimientos</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        {...register("tentrance")}
                                        defaultValue="1"
                                    >
                                        <option value="1" disabled="disabled">Seleccione Ingreso o Egreso</option>
                                        <option
                                            disabled={isEditing ? "disabled" : null}
                                        >ingreso
                                        </option>
                                        <option
                                            disabled={isEditing ? "disabled" : null}
                                        >egreso</option>
                                    </Form.Control>
                                    {errors?.tentrance && (
                                        <Form.Text>
                                            <Alert variant="danger">
                                                {errors.tentrance.message}
                                            </Alert>
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ingrese Monto</Form.Label>
                                    <Form.Control
                                        placeholder="Ingrese Importe"
                                        maxLength="7"
                                        min="1"
                                        max="1000000"
                                        {...register("entrance")} />
                                    {errors?.entrance && (
                                        <Form.Text>
                                            <Alert variant="danger">
                                                {errors.entrance.message}
                                            </Alert>
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Concepto</Form.Label>
                                    <Form.Control
                                        placeholder="Ingrese Concepto"
                                        maxLength="10"
                                        {...register("concept")} />
                                    {errors?.concept && (
                                        <Form.Text>
                                            <Alert variant="danger">
                                                {errors.concept.message}
                                            </Alert>
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit" className="col-lg-6" variant={isEditing ? "info" : "success"}>{isEditing ? "Editar" : "Crear"}</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 3 }}>
                    <Card>
                        <Card.Header className="text-light bg-dark">
                            <h5 className="text-center">ULTIMOS INGRESOS</h5>
                        </Card.Header>
                        <Table striped hover variant="light" size="sm" className="text-center">
                            <thead>
                                <tr>
                                    <th scope="col">TIPO</th>
                                    <th scope="col">IMPORTE</th>
                                    <th scope="col">CONCEPTO</th>
                                    <th scope="col">FECHA</th>
                                    <th scope="col">ACCIONES</th>
                                </tr>
                            </thead>
                            {ingresos.map(ingreso => (
                                <tbody key={ingreso.id}>
                                    <tr>
                                        <td>{ingreso.tentrance}</td>
                                        <td>{ingreso.entrance}</td>
                                        <td>{ingreso.concept}</td>
                                        <td>{new Date(ingreso.date).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEdit(ingreso.id, ingreso.tentrance, ingreso.entrance, ingreso.concept)}
                                                className="mr-1"><FontAwesomeIcon icon={faEdit} /></button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(ingreso.id)}
                                            ><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>

                        <Card.Footer className="text-light bg-dark">
                            <div>
                                <label>Total Ingreos</label>
                                <input
                                    onChange={totalIng}
                                    value={totalIng}
                                    className="float-right text-center"
                                ></input>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 3 }}>
                    <Card>
                        <Card.Header className="text-light bg-dark">
                            <h5 className="text-center">ULTIMOS EGRESOS</h5>
                        </Card.Header>
                        <Table striped hover variant="light" size="sm" className="text-center">
                            <thead>
                                <tr>
                                    <th scope="col">TIPO</th>
                                    <th scope="col">IMPORTE</th>
                                    <th scope="col">CONCEPTO</th>
                                    <th scope="col">FECHA</th>
                                    <th scope="col">ACCIONES</th>
                                </tr>
                            </thead>
                            {egresos.map(egreso => (
                                <tbody key={egreso.id}>
                                    <tr>
                                        <td>{egreso.tentrance}</td>
                                        <td>{egreso.entrance}</td>
                                        <td>{egreso.concept}</td>
                                        <td>{new Date(egreso.date).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEdit(egreso.id, egreso.tentrance, egreso.entrance, egreso.concept)}
                                                className="mr-1"><FontAwesomeIcon icon={faEdit} /></button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(egreso.id)}
                                            ><FontAwesomeIcon icon={faTrash} />
                                            </button>

                                        </td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            ))

                            }
                        </Table>
                        <Card.Footer className="text-light bg-dark">
                            <div>
                                <label>Total Egresos</label>
                                <input
                                    onChange={totalEgr}
                                    value={totalEgr}
                                    className="float-right text-center"></input>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col className="mt-1" lg={{ span: 2 }}>
                    <Card >
                        <Card.Header >
                            <h5 className="text-center">Total Disponible</h5>
                        </Card.Header>
                        <Card.Body>
                            <input
                                onChange={total}
                                value={total}
                                className="text-center" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default WalletPage;
