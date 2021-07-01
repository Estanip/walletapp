import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    username: yup.string("El usuario debe ser un texto").required("Debes ingresar un nombre de usuario"),
    password: yup.string("La contraseña debe ser un texto").required("Debes ingresar una contraseña")/* .min(8, "La contraseña debe contener al menos 8 caracteres") */
})

export default yupResolver(schema);