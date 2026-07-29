import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProfileMutation } from "@/services/profileApi";
import { FormikProps } from "formik";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function EditInfo({
  open,
  setOpen,
  formik,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  formik: FormikProps<any>;
}) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = () => {
    updateProfile({
      profileId: formik.values.id,
      sex: formik.values.sex,
      pronouns: formik.values.pronouns,
      country: formik.values.country,
      whatsapp_no: formik.values.whatsapp_no,
      date_of_birth: formik.values.date_of_birth,
    })
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[370px] ">
          <div className="space-y-5">
            <div>
              <p className="font-medium text-sm text-[#98A2B3] pb-1">Sex</p>
              <Select
                value={formik.values.sex}
                onValueChange={(value) => formik.setFieldValue("sex", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">male</SelectItem>
                    <SelectItem value="female">female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="font-medium text-sm text-[#98A2B3]">
                Phone Number (with Country Code)
              </p>

              <div className="mt-2">
                <PhoneInput
                  country={"pk"}
                  value={formik.values.whatsapp_no}
                  onChange={(phone) =>
                    formik.setFieldValue("whatsapp_no", phone)
                  }
                  inputClass="!w-full !py-6 !rounded-xl"
                  containerClass="!w-full"
                  inputStyle={{
                    width: "100%",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </div>

            <div>
              <p className="font-medium text-sm text-[#98A2B3]">
                Date of Birth
              </p>
              <Input
                type="date"
                name="date_of_birth"
                placeholder="11/15/2024"
                className={"mt-2 py-3! rounded-xl"}
                value={formik.values.date_of_birth}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-5">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className={"py-2.5 w-full"}
              size={undefined}
            >
              Cancel
            </Button>
            <Button
              className={"py-2.5 w-full"}
              onClick={() => {
                handleSubmit();
              }}
              variant={undefined}
              size={undefined}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
