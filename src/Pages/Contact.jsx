import React, { useState } from 'react'
import { Link } from 'react-router'
import { FiArrowUpRight, FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import Container from '../Components/Container'

const faqs = [
  {
    question: 'How do I ask about an order?',
    answer: 'Use the message form and include your order number if you have it. That helps our team understand what you need.',
  },
  {
    question: 'How do I ask about a return?',
    answer: 'Contact us with your order number and the item you have in mind. Our team can help confirm the next steps before you send anything back.',
  },
  {
    question: 'Where can I ask about delivery?',
    answer: 'Send us your delivery location and item or order details, and our team can help with your delivery question.',
  },
]

const Contact = () => {
  const [mailDraftOpened, setMailDraftOpened] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const formData = new FormData(form)
    const subject = `[Exclusive] ${formData.get('topic')} - ${formData.get('name')}`
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nOrder number: ${formData.get('order') || 'Not provided'}\n\n${formData.get('message')}`
    window.location.href = `mailto:exclusive@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setMailDraftOpened(true)
  }

  return (
    <main className="pb-20">
      <Container className="px-4 sm:px-6 lg:px-0">
        <nav aria-label="Breadcrumb" className="py-10 text-sm text-gray-500">
          <Link to="/" className="hover:text-black">Home</Link><span className="mx-3">/</span><span className="text-black">Contact</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Here to help</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Let’s talk.</h1>
          <p className="mt-4 max-w-xl leading-7 text-gray-600">Questions about an order, a product, or anything else? Reach our Dhaka support team and we’ll point you in the right direction.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside className="divide-y divide-gray-200 border-y border-gray-200">
            <section className="py-7">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-xl text-white"><FiPhone /></span><h2 className="text-lg font-medium">Call us</h2></div>
              <p className="mt-5 leading-6 text-gray-600">Call our support team with questions about products, orders, or delivery.</p>
              <a href="tel:+88015888889999" className="mt-3 inline-flex items-center gap-2 font-medium hover:text-primary">+88015-88888-9999 <FiArrowUpRight aria-hidden="true" /></a>
            </section>
            <section className="py-7">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-xl text-white"><FiMail /></span><h2 className="text-lg font-medium">Write to us</h2></div>
              <p className="mt-5 leading-6 text-gray-600">Send us your question and we’ll get back to you as soon as we can.</p>
              <a href="mailto:exclusive@gmail.com" className="mt-3 inline-flex items-center gap-2 font-medium hover:text-primary">exclusive@gmail.com <FiArrowUpRight aria-hidden="true" /></a>
            </section>
            <section className="py-7">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-xl text-white"><FiMapPin /></span><h2 className="text-lg font-medium">Visit our office</h2></div>
              <p className="mt-5 leading-6 text-gray-600">111 Bijoy Sarani,<br />Dhaka 1515, Bangladesh.</p>
              <a href="https://www.google.com/maps/search/?api=1&query=111+Bijoy+Sarani%2C+Dhaka+1515%2C+Bangladesh" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-medium hover:text-primary">Open in Maps <FiArrowUpRight aria-hidden="true" /></a>
            </section>
            <p className="flex items-center gap-2 py-5 text-sm text-gray-500"><FiClock aria-hidden="true" /> Prefer email? Use the message form and include any useful order details.</p>
          </aside>

          <section>
            <h2 className="text-2xl font-medium">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">Complete the form and your email app will open with the message ready to send.</p>
            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium">Your name <span className="text-primary">*</span>
                  <input name="name" autoComplete="name" required maxLength="80" className="mt-2 w-full border border-gray-300 px-4 py-3 font-normal outline-none transition focus:border-black" placeholder="Jane Smith" />
                </label>
                <label className="block text-sm font-medium">Email address <span className="text-primary">*</span>
                  <input name="email" type="email" autoComplete="email" required maxLength="254" className="mt-2 w-full border border-gray-300 px-4 py-3 font-normal outline-none transition focus:border-black" placeholder="you@example.com" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium">What can we help with? <span className="text-primary">*</span>
                  <select name="topic" required defaultValue="Order support" className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 font-normal outline-none focus:border-black">
                    <option>Order support</option><option>Product question</option><option>Returns and refunds</option><option>Payments</option><option>Other</option>
                  </select>
                </label>
                <label className="block text-sm font-medium">Order number <span className="font-normal text-gray-500">(optional)</span>
                  <input name="order" maxLength="40" className="mt-2 w-full border border-gray-300 px-4 py-3 font-normal outline-none focus:border-black" placeholder="e.g. 00001234" />
                </label>
              </div>
              <label className="block text-sm font-medium">Message <span className="text-primary">*</span>
                <textarea name="message" required minLength="10" maxLength="2000" rows="6" className="mt-2 w-full resize-y border border-gray-300 px-4 py-3 font-normal outline-none focus:border-black" placeholder="Tell us a little about what you need..." />
              </label>
              {mailDraftOpened && <p className="text-sm leading-6 text-green-700" role="status">Your email app should open with the message details. Send the draft there to complete your request.</p>}
              <button type="submit" className="inline-flex min-h-12 items-center gap-3 bg-primary px-7 py-3 font-medium text-white transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Open email draft <FiSend aria-hidden="true" /></button>
            </form>
          </section>
        </div>

        <section className="mt-20 border-t border-gray-200 pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Quick answers</p>
          <h2 className="mt-3 text-3xl font-semibold">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
            {faqs.map((faq) => <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:hidden">{faq.question}<span aria-hidden="true" className="text-xl text-primary transition group-open:rotate-45">+</span></summary>
              <p className="max-w-3xl pt-3 leading-7 text-gray-600">{faq.answer}</p>
            </details>)}
          </div>
        </section>
      </Container>
    </main>
  )
}

export default Contact