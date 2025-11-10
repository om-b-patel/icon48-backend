export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center mb-8">
          ICON48 Backend API
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Authentication
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            POST /api/auth/signup<br />
            POST /api/auth/login<br />
            GET /api/auth/profile
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Workflows
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            GET /api/workflows<br />
            POST /api/workflows<br />
            POST /api/workflows/[id]/run
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Agents
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            GET /api/agents<br />
            POST /api/agents<br />
            POST /api/agents/[id]/execute
          </p>
        </div>
      </div>
    </main>
  );
}


