


// pages/faq.tsx
import { useState } from 'react';
import "../component/CSS/faq.css"

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqData: FAQItem[] = [
    { question: 'What is QuizWiz?', answer: 'QuizWiz is an innovative online platform designed for quiz enthusiasts. It allows users to create and participate in quiz-based contests and engage in friendly competition.' },
    { question: 'How can I get started on QuizWiz?', answer: 'Getting started on QuizWiz is easy! Simply create an account, explore available quizzes, or even create your own contest. Participate and enjoy the quiz experience.' },
    {question: 'Is QuizWiz free to use?', answer: 'Yes, QuizWiz is free to use. You can sign up, participate in contests, and enjoy various features without any subscription fees.'},
    {question: 'Is QuizWiz available on mobile devices?', answer: 'Yes, QuizWiz is designed to be accessible on both desktop and mobile devices. You can enjoy the quiz experience on your smartphone or tablet.'},
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
              {activeIndex === index && <div className="answer text-base">{faq.answer}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default FAQ;
