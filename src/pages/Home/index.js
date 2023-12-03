import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleRecipeClick = () => {
    router.push('/Recipes');
  };

  return (
    <div className="home">
      <h1>Yemek Tarifleri Sitesine Hoş Geldiniz</h1>

      <button onClick={handleRecipeClick}>Yemek Tariflerini Gör</button>
    </div>
  );
};

export default Home;
