


// pages/faq.tsx
import { useState } from 'react';
import "../component/CSS/faq.css"

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqData: FAQItem[] = [
    { question: 'Question 1', answer: 'Answer 1' },
    { question: 'Question 2', answer: 'Answer 2' },
    // Add more questions and answers as needed
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="m-5">
      <h1 className="text-base ml-5 tracking-widest font-semibold">
        Frequetly Asked Questions
      </h1>
      <div className="bg-[#e2e2f0] p-5 rounded-2xl ">
        <ul className="text-sm font-semibold ">
          {faqData.map((faq: FAQItem, index: number) => (
            <li key={index} className="ml-3">
              <div
                className={`question ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleQuestion(index)}
              >
                {faq.question}
              </div>
              {activeIndex === index && <div className="answer">{faq.answer}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default FAQ;
