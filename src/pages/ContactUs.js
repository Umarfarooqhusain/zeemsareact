import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const serviceId = process.env.REACT_APP_SERVICE_ID || "";
    const templateId = process.env.REACT_APP_TEMPLATE_ID || "";
    const userId = process.env.REACT_APP_USER_ID || "";

    if (!serviceId || !templateId || !userId) {
      setErrorMessage("Email configuration is missing.");
      setLoading(false);
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    emailjs.send(serviceId, templateId, formData, userId).then(
      () => {
        setSuccessMessage("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      },
      (error) => {
        setErrorMessage(`Failed to send your message. Error: ${error.text}`);
        setLoading(false);
      }
    );
  };

  return (
    <div className="md:mt-28 container mx-auto py-8">
      <h1
        className="text-3xl font-bold mb-4 text-center"
        aria-label="Contact Us Title"
      >
        Contact Us
      </h1>

      {successMessage && (
        <p
          className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4"
          role="alert"
        >
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p
          className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
            aria-label="Name Input Label"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-gray-300 border-gray-300"
            placeholder="Your name"
            required
            aria-label="Name Input"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
            aria-label="Email Input Label"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-gray-300 border-gray-300"
            placeholder="Your Email Address"
            required
            aria-label="Email Input"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
            aria-label="Message Input Label"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-gray-300 border-gray-300"
            placeholder="Write your message"
            rows={4}
            required
            aria-label="Message Input"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded font-semibold hover:bg-gray-600 transition duration-300"
          disabled={loading}
          aria-label="Submit Button"
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
