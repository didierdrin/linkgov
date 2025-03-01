// src/components/layout/Footer.tsx
export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-primary-dark text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {currentYear} LinkGov. All rights reserved.</p>
        </div>
      </footer>
    );
  }