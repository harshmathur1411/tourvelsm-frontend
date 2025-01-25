import React, { useState } from "react";
import "./FAQsAccordion.css";

const FAQsAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Tourvelsm?",
      answer:
        "Tourvelsm is a premier travel and tour company dedicated to creating unforgettable travel experiences for our clients.",
    },
    {
      question: "How can I book a trip with Tourvelsm?",
      answer:
        "You can book a trip by visiting our website, browsing available packages, and completing the booking form. Alternatively, you can contact our support team.",
    },
    {
      question: "What destinations do you offer?",
      answer:
        "We offer a wide range of destinations, from popular tourist attractions to hidden gems around the world.",
    },
    {
      question: "Do you provide customized travel packages?",
      answer:
        "Yes, we specialize in creating tailor-made travel experiences to suit your preferences and budget.",
    },
    {
      question: "What safety measures do you follow?",
      answer:
        "We prioritize your safety by partnering with reliable vendors, following health guidelines, and providing 24/7 support during your travels.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqs-accordion">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`accordion-item ${activeIndex === index ? "active" : ""}`}
        >
          <div
            className="accordion-question"
            onClick={() => toggleAccordion(index)}
          >
            <h3>{faq.question}</h3>
            <span>{activeIndex === index ? "-" : "+"}</span>
          </div>
          <div
            className="accordion-answer"
            style={{
              maxHeight: activeIndex === index ? "200px" : "0",
              opacity: activeIndex === index ? "1" : "0",
            }}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQsAccordion;
