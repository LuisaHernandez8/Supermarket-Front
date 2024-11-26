export default function Registrarse() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <header className="bg-[#5F6F65] text-white py-6 text-center text-3xl">
        <h1>Sistema de Gestión de Ventas e Inventario</h1>
      </header>
      <main className="flex flex-1 justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#597445]">Regístrate</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-[#658147] mb-2">
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-3 py-2 border border-[#9CA986] rounded-md focus:outline-none focus:ring-2 focus:ring-[#729762]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#658147] mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-[#9CA986] rounded-md focus:outline-none focus:ring-2 focus:ring-[#729762]"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-[#658147] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-[#9CA986] rounded-md focus:outline-none focus:ring-2 focus:ring-[#729762]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#597445] text-white rounded-md hover:bg-[#729762] focus:outline-none focus:ring-2 focus:ring-[#729762]"
            >
              Registrarse
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#808D7C]">
            ¿Ya tienes una cuenta?{' '}
            <a href="/" className="text-[#597445] hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </main>
      <footer className="bg-[#C9DABF] text-center py-4 text-sm text-[#5F6F65]">
        &copy; 2024 Sistema de Gestión de Ventas e Inventario. Todos los derechos reservados.
      </footer>
    </div>
  );
}
