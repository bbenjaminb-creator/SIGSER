import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-12 w-full max-w-lg">

      <div className="flex justify-center mb-10">

  <Image
    src="/images/serben-isotipo.png"
    alt="SERBEN"
    width={120}
    height={120}
    priority
  />

</div>

      <LoginForm />

    </div>
  );
}