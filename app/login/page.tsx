import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin-ext"],
});

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }
  return (
    <div className="mx-auto flex max-w-[550px] flex-col justify-center p-8">
      <div className="mb-8 flex items-center justify-center gap-4 text-center">
        <Image
          src="/logo.svg"
          width={60}
          height={39}
          alt="Logo da marca Finance AI"
        />
        <h1
          className={`${dancingScript.className} neon-text text-5xl font-bold text-white`}
        >
          Finance App
        </h1>
      </div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <div>
          <h2 className="mb-3 text-2xl font-bold">Bem vindo(a)!</h2>
          <p className="mb-8 text-muted-foreground">
            A Finance App é uma solução para sua vida financeira. Com ela, você
            poderá controlar suas finanças de forma simples e eficiente.
          </p>
        </div>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      <div className="mt-12 flex h-96 flex-col justify-end text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Finance App. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
