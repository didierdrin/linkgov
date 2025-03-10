// src/app/about/page.tsx
export default function AboutPage() {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary-dark">About LinkGov</h1>
        
        <section className="bg-white p-6 rounded-lg shadow mb-8 bg-red-300">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4 text-green-200">
            A country is a vast entity, so large that the government cannot always be aware of everything 
            that is not working. Imagine a country where the government could see in real time the problems 
            encountered by citizens through their reports.
          </p>
          <p>
            LinkGov is a platform where each citizen can share the difficulties encountered in their city, 
            while proposing solutions. This allows authorities to target their actions better and improve governance.
          </p>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary-dark text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1 mr-3">1</div>
              <div>
                <h3 className="font-medium">Reporting Problems</h3>
                <p className="text-gray-600">Citizens submit their concerns (e.g., poor roads, insecurity, lack of infrastructure).</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-dark text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1 mr-3">2</div>
              <div>
                <h3 className="font-medium">Validation by a Representative</h3>
                <p className="text-gray-600">Each area has a representative who filters and validates the reports before sending them to the government.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-dark text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1 mr-3">3</div>
              <div>
                <h3 className="font-medium">Display and Follow-up</h3>
                <p className="text-gray-600">Approved reports are visible on the platform and citizens can follow the progress of the actions taken by the government.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-dark text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1 mr-3">4</div>
              <div>
                <h3 className="font-medium">Proposing Solutions</h3>
                <p className="text-gray-600">Citizens can also submit their own ideas to solve the reported problems.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">Target Audience & Beneficiaries</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-gray-700">
              <span className="font-medium text-primary-dark">Citizens:</span> They have a direct channel to express their concerns and contribute to improving their environment.
            </li>
            <li className="text-gray-700">
              <span className="font-medium text-primary-dark">The Government:</span> Receives accurate and reliable information on the country's problems, allowing it to act more effectively.
            </li>
            <li className="text-gray-700">
              <span className="font-medium text-primary-dark">The Country:</span> Better communication between the people and their leaders leads to more targeted actions and an overall improvement in public infrastructure and services.
            </li>
          </ul>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Project Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold">Innocent Nangah</h3>
              <p className="text-gray-600">Team Member</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold">Didier Nsengiyumva</h3>
              <p className="text-gray-600">Team Member</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold">Sougnabe Payang</h3>
              <p className="text-gray-600">Team Member</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold">Josue Byiringiro</h3>
              <p className="text-gray-600">Team Member</p>
            </div>
          </div>
        </section>
      </div>
    );
  }