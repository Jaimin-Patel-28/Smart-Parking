import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import supportService from "../Services/supportService";

const getInitialFormData = (user) => ({
  name: user?.fullName || user?.name || "",
  email: user?.email || "",
  category: "Booking issue",
  subject: "",
  message: "",
});

const useSupportForm = (selectedContext = null) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => getInitialFormData(user));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      name: user?.fullName || user?.name || current.name,
      email: user?.email || current.email,
    }));
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(getInitialFormData(user));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all support fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await supportService.sendMessage({
        userId: user?._id || user?.id || localStorage.getItem("userId") || null,
        category: formData.category,
        name,
        email,
        subject: `[${formData.category}] ${subject}`,
        message: `${message}\n\nCategory: ${formData.category}`,
        bookingContext:
          selectedContext?.type === "booking" ? selectedContext.raw : null,
        transactionContext:
          selectedContext?.type === "transaction" ? selectedContext.raw : null,
      });

      toast.success("Message sent successfully. Our team will reply soon.");
      resetForm();
    } catch (error) {
      console.error("Support form error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to send your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
  };
};

export default useSupportForm;