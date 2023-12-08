import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Kullanıcı adı zorunlu'),
    email: Yup.string().email('Geçersiz email').required('Email girmek zorunlu'),
    password: Yup.string().required('Şifre girmek zorunlu').min(6, 'Şifre en az 6 karakter uzunluğunda olmalıdır'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Şifreler aynı değil'),
  });

export default validationSchema