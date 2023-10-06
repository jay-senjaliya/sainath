import React from 'react';

function FAQ() {
  const faqItems = [
    {
      question: 'How do I book a tour?',
      answer:
        "You can easily book a tour by visiting our website and selecting your desired destination and tour package. Follow the booking instructions, and you'll be all set. If you have any questions during the booking process, feel free to contact our customer support.",
    },
    {
      question: 'What types of tours do you offer?',
      answer:
        'We offer a wide range of tour options, including adventure tours, cultural tours, family vacations, and more. You can explore our tour categories on our website to find the perfect option for your interests and preferences.',
    },
    {
      question: 'Is travel insurance included in the tour package?',
      answer:
        'Travel insurance is not automatically included in our tour packages, but we strongly recommend purchasing it for your peace of mind. You can inquire about travel insurance options when booking your tour.',
    },
    {
      question: 'How can I contact your customer support?',
      answer:
        'You can reach our customer support team by calling our toll-free number at 1-800-123-4567 or by sending an email to support@example.com. Our team is available to assist you with any questions or concerns.',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        "Our cancellation policy may vary depending on the tour package you've selected. Please refer to the specific tour details on our website for information about cancellation fees and deadlines. We recommend reviewing this information before booking.",
    },
  ];

  return (
    <div className="faq-list container-xxl">
      <h2 className="text-center pt-3">Frequently Asked Questions</h2>
      <ul>
        {faqItems.map((faq, index) => (
          <div key={index}>
            <details>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FAQ;
