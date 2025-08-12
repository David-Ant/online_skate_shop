export function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <div className="max-w-4xl mx-auto px-4">
        <p className="mb-2 text-sm">
          Contact me at{" "}
          <a
            href="mailto:david.a.ant@gmail.com"
            className="text-orange-400 hover:underline"
          >
            david.a.ant@gmail.com
          </a>{" "}
          or on{" "}
          <a
            href="https://instagram.com/waffle.wfl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:underline"
          >
            Instagram @waffle.wfl
          </a>
        </p>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Waffle’s Skate Shop — Personal Project
        </p>
      </div>
    </footer>
  );
}