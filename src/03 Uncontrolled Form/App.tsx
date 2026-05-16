const defaultData = {
  email: "john@example.com",
  name: "John Doe",
  country: "USA",
};

export default function App() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    alert(formData.get("name") + " " + formData.get("email") + " " + formData.get("country"));
  }

  return (
    <main className="py-24 min-h-dvh bg-gray-100 p-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-xl mx-auto shadow-2xl p-8 bg-white rounded-2xl">
        <h1 className="text-4xl font-bold text-center">Uncontrolled form</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 min-w-sm"
          aria-label="user form"
        >
          <Input label="Name" name="name" type="text" defaultValue={defaultData.name} />
          <Input label="Email" name="email" type="email" defaultValue={defaultData.email} />
          <Input label="Country" name="country" type="text" defaultValue={defaultData.country} />

          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-2 rounded-xl hover:bg-teal-600 transition-colors self-end cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <label className="block text-sm font-medium text-gray-600">
      <span className="font-semibold mb-2 block">{label}</span>
      <input
        {...props}
        className="w-full font-light rounded-xl border-gray-300 border shadow-sm px-4 py-2"
      />
    </label>
  );
}
