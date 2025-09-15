import React, { useRef } from "react";
import {
  FaCalculator,
  FaFileAlt,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaPhoneAlt,
  FaRegEnvelope,
  FaUserAlt,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
const ContactInner = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // Please See Documentation for more information
    emailjs
      .sendForm(
        "service_yipk4xg", //YOUR_SERVICE_ID
        "template_71bgc2q", //YOUR_TEMPLATE_ID
        form.current,
        "cwf8kROl5o3__96Ti" //YOUR_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            toast.success("Massage Sent Successfully!");
            form.current[0].value = "";
            form.current[1].value = "";
            form.current[2].value = "";
            form.current[3].value = "";
          }
        },
        (error) => {
          if (error.text !== "OK") {
            toast.success("Massage Not Sent!");
          }
        }
      );
  };
  return (
    <>
      <Toaster position='bottom-center' reverseOrder={false} />
      {/* contact area start */}

      {/* contact area end */}

      <div className='contact-g-map'>
        <iframe  loading="lazy"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.687024804484!2d110.8416094!3d-7.3917363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a0f78ec018fc9%3A0x53552b3c0c044246!2sDusun%202%2C%20Pilangrejo%2C%20Gemolong%2C%20Sragen%20Regency%2C%20Central%20Java%2057274!5e0!3m2!1sen!2sid!4v1726059300000!5m2!1sen!2sid"
        />
      </div>
    </>
  );
};

export default ContactInner;
