import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    tentrance: yup.string("El concepto debe ser un texto").required("Debes ingresar un Concepto"),
    entrance: yup.number("Debe ser un numero").required("Debes ingresar un nombre de usuario"),
    concept: yup.string("El concepto debe ser un texto").required("Debes ingresar un Concepto").max(10, "No puede contener mas de 10 caracteres")
})

export default yupResolver(schema);