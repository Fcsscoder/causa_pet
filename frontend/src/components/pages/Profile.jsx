import api from "../../utils/api";
import { useState, useEffect } from "react";

// Components

import Input from "../Input";
import Form from "../Form";

// Icons

import { FaImages } from "react-icons/fa";

// Hooks

import useFlashMessages from "../../hooks/useFlashMessages";

import Photo from "../../assets/imgs/1746310716476653.jpg";

const Profile = () => {
  const { setFlashMessage } = useFlashMessages();

  const [token] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});

  useEffect(() => {
    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.patch("/users/me", user, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
      });

      setFlashMessage(response.data.message);
    } catch (error) {
      setFlashMessage(
        error.response?.data?.message || "Erro ao atualizar usuário."
      );
    }
  };

  return (
    <div className="min-h-svh w-screen flex justify-center items-center bg-secondary-color">
      <div className="flex gap-15 flex-wrap justify-center my-20">
        <div className="h-75 w-70 bg-white outline-2 outline-primary-color px-7 py-7 rounded-2xl shadow-form flex flex-col items-center">
          <h2 className="text-2xl text-center text-primary-color">
            Foto de perfil
          </h2>

          <img
            src={Photo}
            className="rounded-full w-30 my-5 outline-2 outline-primary-color"
            alt="Sua Foto"
          />

          <form>
            <div class="grid gap-2">
              <div class="flex items-center justify-center">
                <label>
                  <input type="file" hidden />
                  <div class="flex gap-2 flex-row w-35 h-9 px-2 outline-2 duration-200 bg-primary-color rounded-full text-white text-xs font-semibold items-center justify-center cursor-pointer hover:bg-white outline-primary-color hover:text-primary-color">
                    <FaImages className="text-white text-lg" />
                    Alterar imagem
                  </div>
                </label>
              </div>
            </div>
            <input className="hidden" type="file" name="image" id="image" />
          </form>
        </div>
        <div className="min-h-90 min-w-80 flex justify-center">
          <Form
            title="Editar informações"
            submitText="Editar"
            handleOnSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              id="name"
              label="Nome"
              value={user.name || ""}
              handleOnChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              value={user.email || ""}
              handleOnChange={handleChange}
            />
            <Input
              type="text"
              name="phone"
              id="phone"
              label="Telefone"
              value={user.phone || ""}
              handleOnChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              id="password"
              label="Senha"
            />
            <Input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              label="Confirmar senha"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
