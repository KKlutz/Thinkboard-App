const Loader = () => {
  const dots = [1, 2, 3];
  return (
    <div className="flex justify-center items-center space-x-1.5">
      {dots.map((i) => (
        <span
          key={i}
          className="size-1.5 bg-slate-300 rounded-full"
          style={{
            animation: "jump 2s ease-in-out infinite",
            animationDelay: `${i * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
