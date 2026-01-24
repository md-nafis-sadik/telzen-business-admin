import Input from "@/components/shared/Input";
import RequestLoader from "@/components/shared/RequestLoader";
import Textarea from "@/components/shared/Textarea";
import { useContactSupport } from "@/hooks";

function ContactSupport() {
  const { handleSubmit, isSubmitting } = useContactSupport();

  return (
    <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">
      <div className="w-full bg-white rounded-2xl p-6">
        <div className="w-full">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-700">
              Contact Support
            </h2>
            <p className="text-sm text-gray-600">
              Having any issues? Let us know
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email and Subject Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Your Email"
                type="email"
                name="email"
                placeholder="Something@email.com"
                required
              />

              <Input
                label="Subject"
                type="text"
                name="subject"
                placeholder="Type subject here"
                required
              />
            </div>

            {/* Brief Textarea */}
            <div>
              <Textarea
                label="Brief"
                name="description"
                placeholder="Share brief about the issue"
                rows={6}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn_save"
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {isSubmitting && <RequestLoader />}
    </section>
  );
}

export default ContactSupport;
