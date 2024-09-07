import ArrowDown from "@/assets/icons/ArrowDownIcon";
import React, { FC, useState } from "react";

const faqs: { text: string; value: string }[] = [
  {
    text: "How can I find the best flight deals?",
    value: `Search for flights, but don’t enter a departure date. Instead, hit ‘Whole month', then select ‘Cheapest month’. You’ll see exactly which days are cheapest to fly out and then return back to Armenia.

Be spontaneous and bag a flight deal anywhere! If you know when you want to travel but you're flexible on where, Everywhere Search shows you the best airfare deals from your chosen location. Simply enter your departure city or airport, select your dates and search ‘Everywhere’.

If you already have a destination and dates in mind, get notified whenever fares rise or fall by setting up a Price Alert.

Sign up to get the best weekly flight deals straight in your inbox.`,
  },
  {
    text: "What happens after I've booked my flight?",
    value: `Once you select your flight, you’ll book directly with one of our airline or travel partners, usually on their site. Your flight booking confirmation email and all the other info you'll need will come from them.

Or if you book directly with Skyscanner, we'll send you your booking confirmation via email. If you've booked directly, you can check your account on our website or app to see the details of your booking. You can also get in touch with our dedicated Customer Care team if you need any help.`,
  },
  {
    text: "Where should I book a flight to right now?",
    value: `Moscow is trending among travellers right now. But if you want more inspiration, search Everywhere to find the best flight deal to anywhere.
`,
  },
];

const FAQItem: FC<{ text: string; value: string }> = ({ text, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-md font-bold">{text}</div>
        <div
          className="flex"
          style={{
            transform: `rotate(${!isOpen ? 0 : 180}deg)`,
            transition: "0.5s",
          }}
        >
          <ArrowDown />
        </div>
      </div>
      {isOpen && <div className="pt-4">{value}</div>}
    </div>
  );
};

const HomeFAQ: FC = () => {
  return (
    <div className="flex max- flex-col gap-5 container pt-[40px]   m-auto">
      <div className="text-2xl font-bold">
        Finding flight deals: frequently asked questions
      </div>
      <div className="flex flex-col gap-3 max-w-[50%]">
        {faqs.map((e) => {
          return <FAQItem key={e.text} text={e.text} value={e.value} />;
        })}
      </div>
    </div>
  );
};

export default HomeFAQ;
