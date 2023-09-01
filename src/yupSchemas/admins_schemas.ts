import { object, string } from 'yup';

const adminSchema = object({
  name: string().required(),
  password: string().required(),
  accountType: string().required(),
});

export { adminSchema };