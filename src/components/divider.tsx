interface DividerProps {
  children: React.ReactNode;
}

export default function Divider({ children }: DividerProps) {
  return (
    <div className="relative flex items-center w-full">
      <div className="flex-grow border-t border-black"></div>
      <span className="flex-shrink mx-4 text-b">{children}</span>
      <div className="flex-grow border-t border-black"></div>
    </div>
  );
}
