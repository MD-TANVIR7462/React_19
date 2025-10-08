const features = [
  {
    img: "/Img/features/Package.png",
    title: "Nationwide Shipping",
    desc: "Shipping for all orders over 100 countries",
  },
  {
    img: "/Img/features/guarantee.png",
    title: "30 Days Return",
    desc: "100% money back guarantee",
  },
  {
    img: "/Img/features/CreditCard.png",
    title: "Secure Payment",
    desc: "Your money is safe",
  },
  {
    img: "/Img/features/Headphones.png",
    title: "Support 24/7",
    desc: "Live contact / message",
  },
];

// Animation variants

const FeatureSummary = () => {
  return (
    <div className=" border border-gray-100 rounded-md w-full grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 my-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 col-span-12 md:col-span-6 lg:col-span-3 border bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
        >
          <img src={feature.img} alt={feature.title} className="object-contain w-10 h-10" />
          <div>
            <h2 className="text-sm font-semibold text-custom-black uppercase">{feature.title}</h2>
            <p className="text-sm text-graish font-thin pr-5">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureSummary;
