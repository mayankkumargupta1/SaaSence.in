"use client";

import { motion, useInView } from "framer-motion";
import { Phone, MessageSquareText, Users, ArrowRight, Mail } from "lucide-react";
import { WavyBackground } from "../ui/wavy-background";
import { useRef } from "react";

// Helper component for InfoItem
interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-4"
  >
    <div className="flex-shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/70">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-md text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Helper component for FormInput
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, id, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <label
      htmlFor={id}
      className="block text-slate-300 font-medium mb-1.5 text-sm"
    >
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="w-full px-4 py-2.5 rounded-md bg-slate-700/40 border border-slate-600/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm"
    />
  </motion.div>
);

// Helper component for FormSelect
interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  options,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <label
      htmlFor={id}
      className="block text-slate-300 font-medium mb-1.5 text-sm"
    >
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        {...props}
        className="w-full px-4 py-2.5 rounded-md bg-slate-700/40 border border-slate-600/80 text-slate-100 placeholder-slate-500 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm"
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
            className="bg-slate-800 text-slate-200"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 9.5l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </motion.div>
);

// Helper component for FormTextarea
interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, id, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <label
      htmlFor={id}
      className="block text-slate-300 font-medium mb-1.5 text-sm"
    >
      {label}
    </label>
    <textarea
      id={id}
      {...props}
      className="w-full px-4 py-2.5 rounded-md bg-slate-700/40 border border-slate-600/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-colors duration-200 text-sm"
    ></textarea>
  </motion.div>
);

export function SalesContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index === 0 ? -100 : index === 2 ? 100 : 0,
      y: index === 1 ? 50 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="relative bg-slate-950 text-slate-200 antialiased selection:text-white">
      <WavyBackground
        backgroundFill="hsl(222, 47%, 11%)"
        waveWidth={80}
        waveOpacity={0.15}
        blur={8}
        className="min-h-screen"
      >
        <div
          className="absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(222, 47%, 15%, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(222, 47%, 15%, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            backgroundPosition: "top left",
            maskImage:
              "radial-gradient(ellipse at center, white 20%, transparent 70%)",
          }}
        />

        {[
          "top-0 left-0",
          "top-0 right-0",
          "bottom-0 left-0",
          "bottom-0 right-0",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} p-5 md:p-8 z-10 text-slate-700`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0V16M0 8H16"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        ))}

        <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <motion.div
            ref={ref}
            className="w-full max-w-6xl bg-slate-950/50 backdrop-blur-xl text-slate-100 rounded-2xl shadow-2xl border border-slate-700/70 overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1fr]"
          >
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              custom={0}
              className="p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-between"
            >
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-transparent bg-clip-text">
                  Let's Build the Future, Together.
                </h1>
                <p className="text-lg sm:text-xl text-slate-400 mb-10 sm:mb-12 lg:mb-16 leading-relaxed">
                  Connect with our Agentic AI experts to explore how SaaSence
                  can revolutionize your business operations and unlock new
                  potentials.
                </p>

                <div className="space-y-8">
                  <InfoItem
                    icon={<Phone size={22} className="text-purple-400" />}
                    title="Personalized Demo Request"
                    description="See Agentic AI in action. Discover how SaaSence can be tailored to transform your specific workflows and challenges."
                  />
                  <InfoItem
                    icon={<Users size={22} className="text-purple-400" />}
                    title="Enterprise Solutions"
                    description="Discuss a bespoke Agentic AI strategy designed for your unique business scale, complexity, and objectives."
                  />
                  <InfoItem
                    icon={
                      <MessageSquareText
                        size={22}
                        className="text-purple-400"
                      />
                    }
                    title="General Inquiries"
                    description="Have questions about Agentic AI or how SaaSence can help? Our team is ready to provide answers."
                  />
                </div>
              </div>

              <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-700/50">
                <blockquote className="text-slate-300 italic">
                  <p className="text-lg leading-relaxed">
                    SaaSence's Agentic AI has fundamentally changed our approach
                    to operations, leading to{" "}
                    <span className="font-semibold text-purple-300 not-italic">
                      unprecedented efficiency and innovation.
                    </span>
                  </p>
                  <footer className="mt-4 text-sm text-slate-500 not-italic">
                    — CEO, Alpha Innovations Ltd.
                  </footer>
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              custom={1}
              className="bg-slate-800/50 p-8 sm:p-10 md:p-12 lg:p-16 border-l border-slate-700/50"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-8 text-center md:text-left">
                Get in Touch
              </h2>
              <form className="space-y-6">
                <FormInput
                  label="Company Email"
                  id="companyEmail"
                  type="email"
                  placeholder="you@company.com"
                />
                <FormSelect
                  label="Primary Area of Interest"
                  id="productInterest"
                  options={[
                    {
                      value: "",
                      label: "Select a solution area",
                      disabled: true,
                    },
                    {
                      value: "customer_service_ai",
                      label: "Customer Service AI (SaaSence CX)",
                    },
                    {
                      value: "marketing_ai",
                      label: "Marketing Automation AI (SaaSence Marketing)",
                    },
                    {
                      value: "hr_ai",
                      label: "HR & Recruitment AI (SaaSence HR)",
                    },
                    {
                      value: "custom_enterprise_solution",
                      label: "Custom Enterprise AI Solution",
                    },
                    {
                      value: "general_inquiry",
                      label: "General Inquiry about Agentic AI",
                    },
                  ]}
                />
                <FormTextarea
                  label="How can we help you succeed?"
                  id="howCanWeHelp"
                  placeholder="Tell us about your business goals or challenges..."
                  rows={5}
                />

                <p className="text-xs text-slate-500 pt-2">
                  By submitting, I acknowledge I have read and agree to the{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                  >
                    Terms of Service
                  </a>
                  .
                </p>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-out text-base focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Connect with SaaSence
                  <ArrowRight size={20} className="inline ml-2 -mt-0.5" />
                </motion.button>
              </form>

              {/* Direct Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 pt-6 border-t border-slate-700/50"
              >
                <h3 className="text-base font-semibold text-slate-200 mb-4">
                  Reach Out Directly
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:contact@saasence.in"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-700/60 to-slate-600/40 border border-slate-600/50 hover:border-purple-500/60 hover:from-slate-700/80 hover:to-purple-900/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Mail size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="text-sm font-medium text-slate-100 group-hover:text-purple-300 transition-colors">
                        contact@saasence.in
                      </p>
                    </div>
                  </a>
                  <a
                    href="tel:+919142572977"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-700/60 to-slate-600/40 border border-slate-600/50 hover:border-purple-500/60 hover:from-slate-700/80 hover:to-purple-900/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Phone size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Phone</p>
                      <p className="text-sm font-medium text-slate-100 group-hover:text-purple-300 transition-colors">
                        +91 9142572977
                      </p>
                    </div>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </WavyBackground>
    </div>
  );
}
