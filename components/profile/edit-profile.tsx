"use client";
import { useUpdateProfileMutation } from "@/services/profileApi";
import { createClient } from "@/utils/supabaseClient";
import { FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";

export default function EditProfile({
  open,
  setOpen,
  formik,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  formik: FormikProps<any>;
}) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState("/assets/png/dp.png");
  const [imageFile, setImageFile] = useState(null);

  const handleChangePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePicture(URL.createObjectURL(file));

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("Emma_images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      const { data, error: urlError } = await supabase.storage
        .from("Emma_images")
        .createSignedUrl(filePath, 60 * 60);

      if (urlError) throw urlError;
      setProfilePicture(data.signedUrl);
      setImageFile(filePath);

      toast.success("Profile picture uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload profile picture");
      setProfilePicture("/assets/png/dp.png");
    }
  };

  const handleDeletePicture = async () => {
    try {
      const supabase = createClient();
      const user = supabase.auth.getUser();
      const folder = `${(await user).data.user?.id}`;

      if (folder) {
        const { data: files, error: listError } = await supabase.storage
          .from("Emma_images")
          .list(folder);

        if (listError) throw listError;

        const paths = files.map((f) => `${folder}/${f.name}`);

        if (paths.length) {
          const { error } = await supabase.storage
            .from("Emma_images")
            .remove(paths);

          if (error) throw error;
        }
      }

      setImageFile(null);
      setProfilePicture("/assets/png/dp.png");
      formik.setFieldValue("image_url", null);

      await updateProfile({
        profileId: formik.values.id,
        picture: null,
      }).unwrap();

      toast.success("Profile picture deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete profile picture");
    }
  };

  const handleSubmit = () => {
    if (formik.dirty || imageFile) {
      updateProfile({
        profileId: formik.values.id,
        full_name: formik.values.full_name,
        ...(imageFile && { picture: imageFile }),
      })
        .unwrap()
        .then(() => {
          setOpen(false);
          toast.success("Profile updated successfully");
        })
        .catch(() => {
          toast.error("Failed to update profile");
        });
    }
  };

  useEffect(() => {
    if (formik.values.image_url) {
      setProfilePicture(formik.values.image_url);
    }
  }, [formik.values.image_url]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[700px]">
          <DialogHeader className={undefined}>
            <DialogTitle
              className={"text-start font-normal text-lg text-[#98A2B3]"}
            >
              Your Profile
            </DialogTitle>
          </DialogHeader>

          <div className="md:px-10 mt-5 md:w-[80%]">
            <div className="space-y-4 md:space-y-0 md:flex gap-4 items-center">
              <img
                src={profilePicture}
                alt="Profile Picture"
                width={80}
                height={80}
                className="w-[100px] h-[100px] object-cover rounded-full object-top mx-auto md:mx-0"
              />

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                className={"py-2.5 text-sm w-full md:w-auto"}
                variant={undefined}
                size={undefined}
                onClick={handleChangePictureClick}
              >
                Change picture
              </Button>
              <Button
                className={
                  " py-2.5 text-sm w-full md:w-auto text-[#F52F2F] bg-[#FFDDD1]"
                }
                variant={undefined}
                size={undefined}
                onClick={handleDeletePicture}
              >
                Delete picture
              </Button>
            </div>

            <div className="mt-8">
              <p className="font-medium text-sm text-[#202224]">Full Name</p>
              <Input
                type="text"
                className={
                  "mt-2 py-3! rounded-xl disabled:opacity-80 disabled:cursor-not-allowed"
                }
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className={"py-2.5"}
              size={undefined}
            >
              Cancel
            </Button>
            <Button
              className={"py-2.5"}
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
