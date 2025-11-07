import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function GreenlightApprovalsLanding() {
  const features = [
    {
      id: "routing",
      title: "Smart Approval Routing",
      desc: "Automate the flow of approvals with precision. Route transactions instantly based on roles, limits, and policies—no manual chasing or bottlenecks.",
    },
    {
      id: "audit",
      title: "Audit-Ready Compliance",
      desc: "Be audit-ready at any moment. Every action is logged and traceable, providing instant compliance visibility and easy audit exports.",
    },
    {
      id: "budget",
      title: "Budget Intelligence",
      desc: "Approvals that understand your spend. Tie approvals to budget thresholds and real-time spend insights—ensuring every approval aligns with your financial plan.",
    },
  ];

  return (
    <div className='min-h-screen bg-white text-gray-800 flex flex-col scroll-smooth'>
      <header className='bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#10b981] text-white py-24 px-6 text-center relative'>
        <motion.img
          src='/logo-circle.png'
          alt='Greenlight Approvals Logo'
          className='mx-auto w-32 h-32 mb-8 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.25)]'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        <h1 className='text-4xl font-bold mb-4'>Greenlight Approvals</h1>
        <p className='text-lg max-w-xl mx-auto mb-8'>
          Streamline approvals in NetSuite with intelligent routing, audit-ready compliance, and budget-aware insights.
        </p>
        <Button className='bg-white text-[#667eea] font-semibold hover:scale-105 transition-transform'>
          Request Demo
        </Button>
      </header>

      <section className='py-20 px-8 bg-[#f9fafb] grid md:grid-cols-3 gap-8'>
        {features.map((f) => (
          <a key={f.id} href={`#feature-${f.id}`} className='no-underline cursor-default'>
            <Card className='shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow'>
              <CardContent className='p-6 text-center'>
                <CheckCircle className='w-10 h-10 text-[#10b981] mx-auto mb-4' />
                <h3 className='font-semibold text-xl mb-2 text-[#111827]'>{f.title}</h3>
                <p className='text-gray-600'>{f.desc}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </section>

      <div className='hidden'>
        {features.map((f) => (
          <section
            id={`feature-${f.id}`}
            key={f.id}
            className='py-24 px-6 md:px-20 bg-white border-t border-gray-100 text-center'
          >
            <h2 className='text-3xl font-bold text-[#111827] mb-4'>{f.title}</h2>
            <p className='text-gray-600 max-w-2xl mx-auto mb-8'>{f.desc}</p>
            <Button className='bg-gradient-to-r from-[#667eea] to-[#10b981] text-white font-medium'>
              Learn More
            </Button>
          </section>
        ))}
      </div>

      <section className='py-20 px-8 text-center bg-[#f9fafb]'>
        <h2 className='text-3xl font-bold mb-6 text-[#111827]'>Get in Touch</h2>
        <p className='text-gray-600 mb-8 max-w-lg mx-auto'>
          Want to learn more or see Greenlight Approvals in action? Fill out the form below and we’ll reach out.
        </p>
        <div className='max-w-xl mx-auto bg-gray-100 rounded-xl p-8 shadow-inner'>
          <p className='text-gray-500 italic'>[HubSpot form embed goes here]</p>
        </div>
      </section>

      <footer className='bg-[#111827] text-gray-400 py-6 text-center'>
        <motion.img
          src='/flatcolor.png'
          alt='Greenlight Approvals Flat Logo'
          className='mx-auto w-24 h-24 mb-4 opacity-80'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <p>© {new Date().getFullYear()} Greenlight Software. All rights reserved.</p>
      </footer>
    </div>
  );
}
