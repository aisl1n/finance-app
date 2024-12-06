import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
});

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-28">
      <div className="flex items-center justify-center gap-2 text-center">
        <Image
          src="/logo.svg"
          width={60}
          height={39}
          alt="Logo da marca Finance AI"
        />
        <h1 className={`${kanit.className} neon-text text-5xl text-white`}>
          Finance App
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="p-8">
          <h2 className="mb-2 text-2xl font-bold">Bem vindo(a)!</h2>
          <p className="text-justify text-muted-foreground">
            A Finance App é uma solução para sua vida financeira. Com ela, você
            poderá controlar suas finanças de forma simples e eficiente.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <SignInButton>
            <Button variant="outline">
              <LogInIcon />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        </div>
      </div>
      <div className="flex flex-col text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Finance App. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
