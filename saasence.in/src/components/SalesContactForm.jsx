// src/components/SalesContactForm.tsx
import Image from "next/image";
import { WavyBackground } from "./ui/wavy-background"; // Assuming this component is available

export function SalesContactForm() {
  return (
    // The outermost div now just sets global styles and position context
    <div className="relative bg-black text-white pb-96">
      {/* WavyBackground now acts as the container for the background and applies overall vertical padding.
          Removed 'flex items-center justify-center' so content flows naturally from top to bottom. */}
      <WavyBackground className="min-h-screen py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Grid Background Overlay */}
        <div
          className="absolute inset-0 bg-repeat z-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
            backgroundSize: "48px 48px",
            backgroundPosition: "top left",
          }}
        ></div>

        {/* Corner Crosses (absolute positioning) - Ensure they have z-index to be above the grid */}
        <div className="absolute top-0 left-0 p-4 z-10">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 0L6 12" stroke="white" strokeWidth="1" />
            <path d="M0 6L12 6" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 p-4 z-10">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 0L6 12" stroke="white" strokeWidth="1" />
            <path d="M0 6L12 6" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 p-4 z-10">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 0L6 12" stroke="white" strokeWidth="1" />
            <path d="M0 6L12 6" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 p-4 z-10">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 0L6 12" stroke="white" strokeWidth="1" />
            <path d="M0 6L12 6" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Main Content Wrapper - Centers horizontally, provides overall horizontal padding, and ensures it's above the background grid. */}
        {/* The 'mx-auto' on this div will center the container that limits the width of the max-w-7xl card. */}
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 mx-auto">
          {/* Main content card: max-width, background, rounded corners, shadow, and grid layout */}
          <div
            className="max-w-7xl mx-auto bg-black text-white rounded-lg shadow-2xl overflow-hidden
                          grid grid-cols-1 md:grid-cols-[1fr_0.8fr] md:gap-12 lg:gap-24"
          >
            {/* Left Column - Content */}
            {/* Unified padding for all screen sizes within the column */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                Connect with our{" "}
                <span className="text-white">Agentic AI Experts.</span>
              </h1>

              <div className="space-y-6 mb-8 sm:mb-10 lg:mb-12">
                <div className="flex items-start">
                  {/* Phone icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white mr-3 mt-1 flex-shrink-0"
                  >
                    <path
                      d="M17 19.5C17 20.3284 16.3284 21 15.5 21H8.5C7.67157 21 7 20.3284 7 19.5V4.5C7 3.67157 7.67157 3 8.5 3H15.5C16.3284 3 17 3.67157 17 4.5V19.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 8L14 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 16L14 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base sm:text-lg text-neutral-400">
                    <span className="font-semibold text-white">
                      Request a personalized demo.
                    </span>{" "}
                    See Agentic AI in action and discover how SaaSence.in can
                    transform your operations.
                  </p>
                </div>

                <div className="flex items-start">
                  {/* Clock icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white mr-3 mt-1 flex-shrink-0"
                  >
                    <path
                      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 7V12L15 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base sm:text-lg text-neutral-400">
                    <span className="font-semibold text-white">
                      Explore custom enterprise solutions.
                    </span>{" "}
                    Let's discuss a tailor-made Agentic AI strategy for your
                    unique business needs.
                  </p>
                </div>
              </div>

              {/* Stats Section - Updated for Agentic AI benefits and SaaSence.in */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 my-8 sm:my-10 lg:my-12">
                <div className="flex flex-col">
                  <p className="text-3xl sm:text-4xl font-bold text-white">
                    40% reduction
                  </p>
                  <p className="text-neutral-400 mb-4">
                    in customer service costs.*
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-3xl sm:text-4xl font-bold text-white">
                    2x faster
                  </p>
                  <p className="text-neutral-400 mb-4">
                    marketing campaign execution.*
                  </p>
                </div>
              </div>

              {/* Quote Section - Updated for Agentic AI and SaaSence.in */}
              <div className="mt-8 pt-8 sm:mt-10 sm:pt-10 lg:mt-12 lg:pt-12 border-t border-neutral-800">
                <p className="text-lg sm:text-xl font-medium text-neutral-200 mb-4">
                  "SaaSence's Agentic AI has fundamentally changed our approach
                  to operations, leading to{" "}
                  <span className="font-bold text-white">
                    unprecedented efficiency and innovation.
                  </span>
                  "
                </p>
              </div>
              <p className="text-xs text-neutral-600 mt-4">
                *Based on aggregated data from early adopter clients. Individual
                results may vary.
              </p>
            </div>

            {/* Right Column - Form */}
            {/* Unified padding, removed invalid mb-50 class */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="companyEmail"
                    className="block text-neutral-200 font-medium mb-2 text-sm sm:text-base"
                  >
                    Company email
                  </label>
                  <input
                    type="email"
                    id="companyEmail"
                    placeholder="Email address"
                    className="w-full p-3 rounded-md bg-transparent border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ring-1 ring-inset ring-neutral-800 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="productInterest"
                    className="block text-neutral-200 font-medium mb-2 text-sm sm:text-base"
                  >
                    Primary Solution Interest
                  </label>
                  <div className="relative">
                    <select
                      id="productInterest"
                      className="w-full p-3 rounded-md bg-transparent border border-neutral-700 text-white placeholder-neutral-500 appearance-none pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 ring-1 ring-inset ring-neutral-800 text-sm sm:text-base"
                    >
                      <option
                        value=""
                        disabled
                        className="bg-neutral-900 text-neutral-500"
                      >
                        Select a solution area
                      </option>
                      <option
                        value="customer_service_ai"
                        className="bg-neutral-900 text-white"
                      >
                        Customer Service AI (SaaSence CX)
                      </option>
                      <option
                        value="marketing_ai"
                        className="bg-neutral-900 text-white"
                      >
                        Marketing Automation AI (SaaSence Marketing)
                      </option>
                      <option
                        value="hr_ai"
                        className="bg-neutral-900 text-white"
                      >
                        HR & Recruitment AI (SaaSence HR)
                      </option>
                      <option
                        value="custom_enterprise_solution"
                        className="bg-neutral-900 text-white"
                      >
                        Custom Enterprise AI Solution
                      </option>
                      <option
                        value="general_inquiry"
                        className="bg-neutral-900 text-white"
                      >
                        General Inquiry about Agentic AI
                      </option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 9.5l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="howCanWeHelp"
                    className="block text-neutral-200 font-medium mb-2 text-sm sm:text-base"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="howCanWeHelp"
                    placeholder="Tell us about your business needs or challenges..."
                    rows={5}
                    className="w-full p-3 rounded-md bg-transparent border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none ring-1 ring-inset ring-neutral-800 text-sm sm:text-base"
                  ></textarea>
                </div>

                <p className="text-xs text-neutral-500 mt-6 sm:mt-8">
                  By clicking "Talk to SaaSence", I acknowledge I have read and
                  understand the{" "}
                  <a
                    href="/privacy-notice"
                    className="text-blue-500 hover:underline"
                  >
                    Privacy Notice.
                  </a>
                </p>

                <button
                  type="submit"
                  className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 text-base sm:text-lg"
                >
                  Talk to SaaSence
                </button>
              </form>
            </div>
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}
