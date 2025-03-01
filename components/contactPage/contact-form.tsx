"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AlertDestructive } from "../danger-alert";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { MailCheck } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset, // Add reset function here
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      console.log("Form submitted:", data);
      setFormStatus("success");
      reset();
    } catch {
      setFormStatus("error");
    }
  };

  const handleClear = () => {
    reset(); // Reset form fields
    setFormStatus(null); // Optionally clear the form status
  };

  return (
    <div className="max-w-lg shadow-md rounded-lg mb-[5rem]">
      {formStatus === "success" && (
        <Alert className="mb-4">
          <MailCheck className="w-4 h-4" />
          <AlertTitle>Email sent!</AlertTitle>
          <AlertDescription className="text-teal-500">
            Your message has been sent successfully.
          </AlertDescription>
        </Alert>
      )}
      {formStatus === "error" && (
        <AlertDestructive message="Something went wrong. Please try again." />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              placeholder="Name"
              {...register("name")}
              type="text"
              className="bg-secondary"
            />
            {errors.name && (
              <AlertDestructive
                message={errors.name?.message || "An error occurred"}
              />
            )}
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Email address"
              {...register("email")}
              type="email"
              className="bg-secondary"
            />
            {errors.email && (
              <AlertDestructive
                message={errors.email?.message || "An error occurred"}
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Subject"
            {...register("subject")}
            className="bg-secondary"
            type="text"
          />
          {errors.subject && (
            <AlertDestructive
              message={errors.subject?.message || "An error occurred"}
            />
          )}
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Message"
            {...register("message")}
            rows={5}
            className="bg-secondary"
          ></Textarea>
          {errors.message && (
            <AlertDestructive
              message={errors.message?.message || "An error occurred"}
            />
          )}
        </div>

        <div className="flex space-x-4 justify-between gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          <Button type="button" onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
