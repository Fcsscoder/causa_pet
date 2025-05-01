// Components

import Input from "../Input";
import Form from "../Form";

// Icons

import { MdEdit } from "react-icons/md";

import Photo from "../../assets/imgs/1745518404608753.jpg";

const Profile = () => {
  return (
    <div className="min-h-svh w-screen flex justify-center items-center bg-secondary-color">
      <div className="flex gap-15 flex-wrap justify-center my-20">
        <div className="h-90 w-70 bg-white outline-2 outline-primary-color px-7 py-7 rounded-2xl shadow-form flex flex-col items-center">
          <h2 className="text-2xl text-center text-primary-color">Perfil</h2>
          <img
            src={Photo}
            className="rounded-full w-30 my-5 outline-2 outline-primary-color"
            alt=""
          />
          <p className="text-primary-color text-1xl">Contatos</p>
        </div>
        <div className="min-h-90 min-w-80 flex justify-center">
          <Form title="Editar informações" submitText="Editar" onSubmit>
            <Input
              type="text"
              name="name"
              id="name"
              label="Nome"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              name="phone"
              id="phone"
              label="Celular"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              id="password"
              label="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              label="Confirmar senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
