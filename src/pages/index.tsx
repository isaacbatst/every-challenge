import { NextPage } from "next";
import LoginForm from "../frontend/components/HomePage/LoginForm";
import RegisterForm from "../frontend/components/HomePage/RegisterForm";

const HomePage: NextPage = () => {
  return (
    <section className="min-h-screen bg-slate-800 text-white">
      <h1 className="text-3xl font-bold underline text-center mb-4">
        Every Todo App
      </h1>
      <RegisterForm />
      <LoginForm />
    </section>
  )
}

export default HomePage;