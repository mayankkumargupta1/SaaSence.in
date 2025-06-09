import Head from "next/head";

export default function Home() {
  // This SVG is meticulously crafted based on the Vercel 404 page's icon source.
  const VercelLikeIcon = () => (
    <svg
      width="100" // Overall size of the SVG container
      height="100"
      viewBox="0 0 100 100" // Coordinate system
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-8" // Margin below the icon
    >
      {/* Dashed Triangle */}
      {/* Path data from Vercel's actual SVG for consistency */}
      <path
        d="M50 8.33333L91.6667 83.3333H8.33333L50 8.33333Z"
        stroke="url(#vercelGradient)" // References the linear gradient defined below
        strokeWidth="1.5"
        strokeDasharray="4 4" // Dashed line effect
      />
      {/* Dark background circle (actually a rounded rectangle for cleaner rendering) */}
      {/* Positioned at the top-right corner of the conceptual triangle */}
      <rect
        x="58.75"
        y="26.75"
        width="26.5"
        height="26.5"
        rx="13.25"
        fill="#111111"
        stroke="#333333"
        strokeWidth="1.5"
      />
      {/* White segment (a smaller rounded rectangle) */}
      {/* Positioned inside the dark circle to form the white quadrant */}
      <rect
        x="71.75"
        y="26.75"
        width="13.5"
        height="13.5"
        rx="6.75"
        fill="#FFFFFF"
      />

      {/* Define the linear gradient for the triangle's stroke */}
      <defs>
        <linearGradient
          id="vercelGradient"
          x1="50"
          y1="8.33333"
          x2="50"
          y2="83.3333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#444444" /> {/* Start color of the gradient */}
          <stop offset="1" stopColor="#333333" />{" "}
          {/* End color of the gradient */}
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <>
      <Head>
        <title>Under Development - Your Project</title>
        <meta
          name="description"
          content="Our project is currently under development. Stay tuned!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        {/* Main content wrapper with dashed border */}
        {/* The border's size and positioning are made to resemble the reference image.
            The `max-h-[85vh]` and `max-w-4xl` ensure it scales nicely on different screen sizes
            without taking up the entire screen, similar to the Vercel design. */}
        <div className="relative w-full max-w-4xl max-h-[85vh] h-full border border-dashed border-gray-800 flex flex-col items-center justify-center text-center p-8 sm:p-12 overflow-hidden">
          {/* Note: The small '+' signs in the corners of the Vercel border are complex
              to implement purely with Tailwind. For "somewhat like this" and simplicity,
              they are omitted here. Adding them would typically require more advanced
              CSS pseudo-elements or an SVG background for the border itself. */}

          {/* The Vercel-like icon */}
          <VercelLikeIcon />

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Under Development
          </h1>

          {/* Sub-text */}
          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-md">
            We're currently working on something amazing. Please check back soon
            for updates!
          </p>

          {/* Button */}
          <a
            href="mailto:contact@yourproject.com" // Replace with your actual contact email
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black font-medium text-base shadow-sm hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
}
