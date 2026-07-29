"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFullName } from "@/utils/getFullName";
import useScrapDoctorStore from "@/zustand/scrapDoctorText";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { toast } from "sonner";
import * as Yup from "yup";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();
  const { addSearchText, addValues } = useScrapDoctorStore();

  const SignupSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().optional(),
    paternalLastName: Yup.string().required("Paternal last name is required"),
    maternalLastName: Yup.string().required("Maternal last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const fullName = getFullName(values);
      addSearchText(fullName);
      addValues(values);

      // const result = await SignupUser({
      //   email: values.email,
      //   password: values.password,
      //   name: fullName,
      //   first_name: values.firstName,
      //   middle_name: values.middleName || null,
      //   paternal_last_name: values.paternalLastName,
      //   maternal_last_name: values.maternalLastName,
      //   status: "inactive",
      // }).unwrap();

      // dispatch(authuser(result?.user));
      // localStorage.setItem("user", JSON.stringify(result?.user));

      router.push("/on-boarding");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <section
      className="min-h-screen pt-4 bg-linear-gradient(to bottom, #ffffff, #EDE0FF)"
      // style={{ background: "linear-gradient(to bottom, #ffffff, #EDE0FF)" }}
    >
      <div className="max-w-7xl mx-5 md:mx-8 lg:mx-auto">
        {/* Logo */}
        <Image
          src="/assets/svg/Emma-logo.svg"
          alt="Emma Logo"
          width={100}
          height={50}
        />

        <div className="my-14 w-full max-w-lg flex flex-col items-center md:justify-center text-center space-y-8 mx-auto">
          <Formik
            initialValues={{
              firstName: "",
              middleName: "",
              paternalLastName: "",
              maternalLastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="w-full space-y-6">
                {/* First Name - Required */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm md:text-xl font-normal text-[#424242]">
                      First name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Field
                    as={Input}
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full bg-[#F1F4F9] py-3! rounded-xl"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Middle Name - Optional */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm md:text-xl font-normal text-[#424242]">
                      Middle name{" "}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                  </div>
                  <Field
                    as={Input}
                    name="middleName"
                    type="text"
                    placeholder="Enter your middle name"
                    className="w-full bg-[#F1F4F9] py-3! rounded-xl"
                  />
                  <ErrorMessage
                    name="middleName"
                    component="p"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Paternal Last Name - Required */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm md:text-xl font-normal text-[#424242]">
                      Paternal last name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Field
                    as={Input}
                    name="paternalLastName"
                    type="text"
                    placeholder="Enter your paternal last name"
                    className="w-full bg-[#F1F4F9] py-3! rounded-xl"
                  />
                  <ErrorMessage
                    name="paternalLastName"
                    component="p"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Maternal Last Name - Required */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm md:text-xl font-normal text-[#424242]">
                      Maternal last name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Field
                    as={Input}
                    name="maternalLastName"
                    type="text"
                    placeholder="Enter your maternal last name"
                    className="w-full bg-[#F1F4F9] py-3! rounded-xl"
                  />
                  <ErrorMessage
                    name="maternalLastName"
                    component="p"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Email */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm md:text-xl font-normal text-[#424242]">
                      Email address <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#F1F4F9] py-3! rounded-xl"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Password */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm md:text-xl font-normal text-[#424242]">
                      Password <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="relative">
                    <Field
                      as={Input}
                      name="password"
                      type={showPassword ? "password" : "text"}
                      placeholder="Enter your password"
                      className="w-full bg-[#F1F4F9] py-3! rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? (
                        <Image
                          src={"/assets/svg/eyes.svg"}
                          alt=""
                          width={17}
                          height={8}
                        />
                      ) : (
                        <MdOutlineVisibility size={20} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Submit */}
                <Button
                  size={""}
                  variant={""}
                  type="submit"
                  className="py-2! px-8!"
                >
                  {"Start"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Footer */}
          <p className="text-[#424242] text-base">
            Already have an account?
            <Link
              href="/signin"
              className="text-[#5A8CFF] ml-2 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
