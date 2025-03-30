export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Professor Abolaji</h1>
      <p className="text-xl mb-6">
        Welcome to my professional portfolio. I am a biochemist specializing in neurosciences and toxicology.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Research</h2>
          <p>
            My research focuses on understanding oxidative stress mechanisms in neurodegenerative disorders.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Publications</h2>
          <p>
            I have published over 50 peer-reviewed articles in international journals.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Teaching</h2>
          <p>
            I teach biochemistry and molecular biology to undergraduate and graduate students.
          </p>
        </div>
      </div>
    </div>
  );
} 