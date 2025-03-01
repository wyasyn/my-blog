import ContactForm from "@/components/contactPage/contact-form";
import { GithubGlobe } from "@/components/homePage/globe-demo";
import PageTitle from "@/components/page-title";

export default function ContactPage() {
  return (
    <>
      <PageTitle subtitle="get in touch with me" title="contact me" />
      <div className="grid gap-12 md:grid-cols-2">
        <GithubGlobe />
        <ContactForm />
      </div>
    </>
  );
}
