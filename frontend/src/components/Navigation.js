import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';

export default function Navigation() {

	const auth = useAuth();

	return (
		<Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
			<Navbar.Brand href={routes.home}>
				Wallet App
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				{auth.user === "" ?
					<Nav className="mr-auto">
						<Nav.Link as={NavLink} to={routes.register} >Crear Usuario</Nav.Link>
						<Nav.Link as={NavLink} to={routes.login}>Iniciar Sesion</Nav.Link>
					</Nav>
					:
					<>
						<div className="ml-auto text-white pt-2">
							<h5>Bienvenido {auth.user.username}!</h5>
						</div>
						<Nav className="ml-auto">
							<Nav.Link
								as={NavLink}
								to={routes.home}
								onClick={auth.logout}
							>Cerrar Sesion</Nav.Link>
						</Nav>
					</>
				}
			</Navbar.Collapse>
		</Navbar>
	);
}