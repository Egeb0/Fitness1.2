export default function ContactPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 font-sans">
        <h1 className="text-5xl font-extrabold text-center text-gray-100 mb-8 tracking-wide">
          Contact Me
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 text-center">
          Got questions, feedback, or just want to connect? Feel free to reach out using the information below. I look forward to hearing from you!
        </p>
        <div className="space-y-6 text-center">
          <p className="text-xl text-white">
            📧 Email:{" "}
            <a
              href="mailto:egebere01@gmail.com"
              className="text-blue-300 font-semibold hover:underline"
            >
              egebere01@gmail.com
            </a>
          </p>
          <p className="text-xl text-white">
            📞 Phone:{" "}
            <a
              href="tel:+66839314667"
              className="text-blue-300 font-semibold hover:underline"
            >
              +66 83 931 4667
            </a>
          </p>
          <p className="text-xl text-white">
            📍 Address:{" "}
            <span className="text-blue-300 font-semibold">
              Phuket, Kathu, Prince of Songkla University
            </span>
          </p>
        </div>
      </div>
    );
  }
  