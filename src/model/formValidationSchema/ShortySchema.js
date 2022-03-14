import * as yup from 'yup'

export const initialShortyValues = {
    name:"",
    longUrl:""
}

export const shortySchema = yup.object({
    name: yup.string().trim().required('Name Your Link!'),
    longUrl : yup.string().required('Give Link to Shrink'),
    user: yup.string()
})