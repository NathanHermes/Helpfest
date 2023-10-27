export const Login = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black">HELPFEST</h1>

      <section>
        <h2>Login</h2>

        <fieldset>
          <span>Email*</span>
          <input type="email" required />
        </fieldset>
      </section>
    </main>
  )
}