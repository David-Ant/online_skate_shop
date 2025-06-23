export function AnimatedButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent border-none text-white cursor-pointer p-2 transition duration-300 ease-in-out hover:scale-110 hover:opacity-90"
    >
      {children}
    </button>
  );
}
