import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    question: "",
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (
    e
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl ">
        {/* Left: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg flex flex-col justify-start gap-6 p-6 shadow-lg" 
        >
          {/* Dropdown */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-600 text-sm">
              How can we help you? <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.question}
              onValueChange={(value) =>
                setFormData({ ...formData, question: value })
              }
            >
              <SelectTrigger className="w-full h-12 rounded-md border border-gray-300">
                <SelectValue placeholder="Select a Question" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admission">Admission Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="general">General Query</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-600 text-sm">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-12 text-base rounded-md border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-gray-600 text-sm">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 text-base rounded-md border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-gray-600 text-sm">
              Mobile Number <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="h-12 text-base rounded-md border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-gray-600 text-sm">
              Type text <span className="text-red-500">*</span>
            </Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="h-28 text-base rounded-md border border-gray-300 resize-none"
            />
          </div>

          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white rounded-md px-6 py-3 text-base font-medium w-fit"
          >
            Submit feedback
          </Button>
        </form>

        {/* Right: Notice Card */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Report a Safety Emergency
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              We are committed to the safety of everyone using our platform.
            </p>
            <button className="text-red-500 font-medium text-sm hover:underline">
              Report here
            </button>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Issue with your live order?
            </h3>
            <p className="text-gray-600 text-sm">
              Click on the section in your
              app to connect to our customer support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
