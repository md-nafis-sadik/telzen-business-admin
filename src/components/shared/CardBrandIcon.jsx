export const CardBrandIcon = ({ brand }) => {
  const icons = {
    visa: "https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg",
    mastercard:
      "https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg",
    amex: "https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg",
    discover:
      "https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg",
    diners:
      "https://js.stripe.com/v3/fingerprinted/img/diners-fbcbd3360f8e3f629cdaa80e93abdb8b.svg",
    jcb: "https://js.stripe.com/v3/fingerprinted/img/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg",
    unionpay:
      "https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg",
  };

  if (brand === "unknown" || !icons[brand]) {
    return (
      <svg
        className="w-7 h-5"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="27"
          rx="3.5"
          fill="white"
          stroke="#D1D5DB"
        />
        <rect x="3" y="9" width="34" height="3" rx="1.5" fill="#E5E7EB" />
        <rect x="3" y="15" width="14" height="3" rx="1.5" fill="#E5E7EB" />
      </svg>
    );
  }

  return (
    <img
      src={icons[brand]}
      alt={brand}
      width={28}
      height={20}
      className="object-contain"
    />
  );
};
