import * as Yup from 'yup';

const RecipeSchema = Yup.object().shape({
    title: Yup.string().required('Başlık gereklidir'),
    category: Yup.string().required('Kategori seçmek zorunludur'),
    difficulty: Yup.string().required('Zorluk seçmek zorunludur'),
    ingredients: Yup.array()
        .of(Yup.string().required('Malzeme gereklidir'))
        .min(1, 'En az 1 malzeme eklemelisiniz'),
    instructions: Yup.array()
        .of(Yup.string().required('Malzeme gereklidir'))
        .min(1, 'En az 1 malzeme eklemelisiniz'),
    rating: Yup.string().required('Değerlendirme yapmak zorunludur'),
});
export default RecipeSchema