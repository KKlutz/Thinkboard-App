const Jumbotron = () => {
  return (
    <section className="py-5 px-10">
      <header className="flex flex-col max-w-[50ch] sm:max-w-[60ch] md:max-w-[64ch] mx-auto text-center space-y-6">
        <h1 className="font-mono text-[40px] text-4xl sm:text-5xl ">
          Personal <span className="text-accent">Space</span> for Organized Thoughts and Ideas
        </h1>
        <p className="max-w-[56ch] md:max-w-[64ch] mx-auto">
          Your thoughts matter — keep them safe and accessible anytime, anywhere. Start creating
          your first note now and stay organized every day.
        </p>
      </header>
    </section>
  );
};

export default Jumbotron;
