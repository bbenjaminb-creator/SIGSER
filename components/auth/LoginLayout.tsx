import Image from "next/image";
import Logo from "../ui/Logo";
import LoginCard from "./LoginCard";

export default function LoginLayout() {
  return (
    <main className="min-h-screen bg-slate-100 flex">

      {/* Panel izquierdo */}
<section
  className="hidden lg:flex w-1/2 bg-[#2399d6] text-white items-center justify-center"
>
      <div className="text-center -mt-20 px-12">

  <div className="ml-9">
  <Image
    src="/images/serben-logo.png"
    alt="SERBEN"
    width={320}
    height={95}
    priority
  />
  <div className="flex justify-center my-8">
  <div className="w-64 h-px bg-white/40 relative">
    <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-12 h-1 rounded-full bg-cyan-300"></div>
  </div>
</div>

</div>

  <h1 className="mt-10 text-6xl font-bold tracking-wide">
    SIGSER
  </h1>

  <p className="mt-4 text-2xl font-light">
    Sistema Integral de Gestión SERBEN
  </p>
  
  <div className="flex justify-center my-8">
  <div className="w-40 h-px bg-white/40 relative">
    <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-10 h-1 rounded-full bg-cyan-300"></div>
  </div>
</div>

  <p className="mt-12 text-lg font-medium tracking-wide">
    Certificados ISO 9001
  </p>

</div>

      </section>

      {/* Panel derecho */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <LoginCard />
      </section>

    </main>
  );
}