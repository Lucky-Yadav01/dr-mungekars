export default function PageWrapper({ children }) {
  return (
    <div className="w-full flex justify-center bg-[var(--bg-main)]">
      {/* HARD WIDTH CAP */}
      <div
        className="
          w-full
          max-w-[1680px]
          overflow-x-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}
