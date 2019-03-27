import React, { FunctionComponent } from 'react';

const MessengerIcon: FunctionComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100.001%">
        <stop offset="0%" stopColor="#00B2FF" />
        <stop offset="100%" stopColor="#006AFF" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="url(#a)"
        d="M12 .012c-6.76 0-12 4.952-12 11.64 0 3.499 1.434 6.522 3.769 8.61.196.177.314.42.324.684l.065 2.134a.962.962 0 0 0 1.347.85l2.38-1.05a.958.958 0 0 1 .64-.049c1.094.302 2.26.462 3.475.462 6.76 0 12-4.953 12-11.64C24 4.963 18.76.012 12 .012z"
      />
      <path
        fill="#FFF"
        d="M4.795 15.057L8.32 9.465a1.802 1.802 0 0 1 2.603-.48l2.803 2.102a.72.72 0 0 0 .867-.002l3.786-2.873c.505-.384 1.166.222.826.758l-3.523 5.59a1.802 1.802 0 0 1-2.603.48l-2.803-2.103a.72.72 0 0 0-.867.002l-3.788 2.876c-.505.384-1.166-.222-.826-.758z"
      />
    </g>
  </svg>
);

export default MessengerIcon;
