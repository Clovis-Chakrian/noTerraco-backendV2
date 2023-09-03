import { boolean, number, object, string } from 'yup';

const productSchema = object({
  name: string().required('O campo nome do produto é obrigatório.'),
  type: string().required('O campo tipo do produto é obrigatório.'),
  price: number().required('O campo preço é obrigatório.'),
  //availability: boolean().required('O campo disponibilidade é obrigatório.')
});

export {
  productSchema
};