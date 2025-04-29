import Carousel from "../Carousel";
import Modal from "../Modal";

const Home = () => {
  return (
    <main className="h-[5000]">
      <Carousel />
      <section className="flex flex-col h w-full justify-center mt-15 mb-10 p-5 sm:px-20 md:px-30 lg:px-60 xl:px-90 2xl:px-120 text-justify">
        <h1 className="text-2xl text-primary-color font-roboto text-center mb-5">
          Conheça a Causa Pet
        </h1>
        <p className="text-gray-800">
          Na Universidade da Integração Internacional da Lusofonia
          Afro-Brasileira (UNILAB), a Causa Pet nasceu do amor e do compromisso
          com o bem-estar animal. Nossa iniciativa visa transformar a vida de
          cães e gatos em situação de vulnerabilidade, oferecendo apoio por meio
          de vacinação, campanhas de adoção responsável, arrecadação de
          alimentos e cuidados especiais. Acreditamos que pequenos gestos podem
          gerar grandes mudanças. Ao conectar a comunidade acadêmica e local em
          prol dos animais, promovemos a conscientização, o respeito e a
          construção de um mundo mais justo para todos os seres vivos.
        </p>
        <Modal />
      </section>
    </main>
  );
};

export default Home;
