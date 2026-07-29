"use client";
import withAuth from "@/components/hoc/auth-guard";
import Delete from "@/components/profile/delete";
import EditProfile from "@/components/profile/edit-profile";
import EditSpecialty from "@/components/profile/edit-specialty";
import EditType from "@/components/profile/edit-type";
import EditInfo from "@/components/profile/editi-info";
import IdealPatientDescription from "@/components/profile/ideal-patient-description";
import ResetPasswordModal from "@/components/profile/reset-password-modal";
import { useGetProfilesQuery } from "@/services/profileApi";
import { User } from "@/services/types";
import { getSignedUrl } from "@/utils/getSignedUrl";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const intiialValues = {
  whatsapp_no: "",
  city: "",
  country: "",
  specialty: "",
  cedula: "",
  emphasis: null,
  bio: null,
  image_url: null,
  email: null,
  result_type: [],
  sex: "male",
  pronouns: "he",
  full_name: "",
  id: "",
  date_of_birth: "",
};

const Profile = () => {
  const { data: Doctors, isLoading } = useGetProfilesQuery("");
  const [open, setOpen] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [editSpecialty, setEditSpecialty] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [editType, setEditType] = useState(false);
  const [idealPatientDescription, setIdealPatientDescription] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const user = auth.user as User;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: intiialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLoading && Doctors) {
        const profile = Doctors.find((doctor) => doctor?.user_id == user?.id);
        setProfileData(profile);

        let signedUrl = null;
        if (profile?.picture) {
          signedUrl = await getSignedUrl(profile.picture);
        }

        formik.setValues({
          id: profile?.id || "",
          whatsapp_no: profile?.whatsapp_no || "",
          city: profile?.city || "",
          country: profile?.country || "",
          specialty: profile?.specialty || "",
          cedula: profile?.cedula || "",
          emphasis: profile?.emphasis || null,
          bio: profile?.bio || null,
          image_url: signedUrl || null,
          email: profile?.email || null,
          result_type: profile?.result_type || [],
          sex: profile?.sex || "male",
          pronouns: profile?.pronouns || "he",
          full_name: profile?.full_name || null,
          date_of_birth: profile?.date_of_birth || null,
        });
      }
    };

    fetchProfile();
  }, [Doctors]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-normal text-2xl">My Profile</h1>
      </div>

      <div className="grid xl:grid-cols-12 gap-5 mt-5">
        <div className="xl:col-span-8 ">
          <div className="grid xl:grid-cols-2 gap-5">
            <div className="relative bg-white rounded-2xl p-5 flex gap-5 items-center">
              <p
                onClick={() => setOpen(true)}
                className="absolute top-5 right-5 font-semibold text-sm text-[#8A38F5] underline cursor-pointer"
              >
                edit
              </p>

              <Image
                src={formik.values?.image_url || "/assets/png/profile_icon.png"}
                alt=""
                width={200}
                height={200}
                className="w-20 h-20 object-cover rounded-full object-top"
              />
              <div>
                <p className="font-semibold text-xl text-[#101828]">
                  {user?.name}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 relative">
              <p className="font-semibold text-sm text-[#98A2B3]">Email</p>
              <p className="font-normal text-base text-[#101828]">
                {formik.values?.email}
              </p>
              <ResetPasswordModal />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 mt-5 pb-14">
            <h2 className="font-semibold text-lg text-black">
              Medical Profile
            </h2>
            <div className="mt-5 grid md:grid-cols-2 gap-5 md:gap-20">
              <div className="space-y-5">
                <div>
                  <p className="font-semibold text-sm text-[#98A2B3]">Cedula</p>
                  <p className="font-normal text-base text-[#131313] mt-1">
                    {profileData?.cedula}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-sm text-[#98A2B3]">
                    Specialty
                  </p>
                  <p className="font-normal text-base text-[#131313] mt-1">
                    {profileData?.specialty}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-[#98A2B3]">
                      Emphasis
                    </p>
                    <p
                      onClick={() => setEditSpecialty(true)}
                      className="font-semibold text-sm text-[#8A38F5] underline cursor-pointer"
                    >
                      edit
                    </p>
                  </div>
                  {profileData?.emphasis || "-"}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-[#98A2B3]">
                      Result Type
                    </p>
                    <p
                      onClick={() => setEditType(true)}
                      className="font-semibold text-sm text-[#8A38F5] underline cursor-pointer"
                    >
                      edit
                    </p>
                  </div>
                  {profileData?.result_type}
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-[#98A2B3]">Bio</p>
                    <p
                      onClick={() => setIdealPatientDescription(true)}
                      className="font-semibold text-sm text-[#8A38F5] underline cursor-pointer"
                    >
                      edit
                    </p>
                  </div>
                  <p className="font-normal text-base text-[#131313] mt-1 lg:w-[70%]">
                    {profileData?.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-4">
          <div className="bg-white rounded-2xl p-5 relative">
            <p
              onClick={() => setEditInfo(true)}
              className="absolute top-5 right-5 font-semibold text-sm text-[#8A38F5] underline cursor-pointer"
            >
              edit
            </p>

            <div className="space-y-5">
              <div>
                <p className="font-semibold text-sm text-[#98A2B3]">Sex</p>
                <p className="font-normal text-base text-[#131313] mt-1">
                  {profileData?.sex}
                </p>
              </div>
              {/* <div>
                <p className="font-semibold text-sm text-[#98A2B3]">Pronouns</p>
                <p className="font-normal text-base text-[#131313] mt-1">
                  {formik.values?.pronouns}
                </p>
              </div> */}
              {/* <div>
                <p className="font-semibold text-sm text-[#98A2B3]">Country</p>
                <p className="font-normal text-base text-[#131313] mt-1">
                  {profileData?.country}
                </p>
              </div> */}
              <div>
                <p className="font-semibold text-sm text-[#98A2B3]">
                  Phone Number
                </p>
                <p className="font-normal text-base text-[#131313] mt-1">
                  {profileData?.whatsapp_no}
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#98A2B3]">
                  Date of Birth
                </p>
                <p className="font-normal text-base text-[#131313] mt-1">
                  {profileData?.date_of_birth}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 mt-5">
            <p className="font-normal text-sm text-black">Disclaimer</p>
            <p className="font-normal text-xs text-black mt-2">
              The information provided in your “ideal patient” profile will be
              used by Emma’s proprietary algorithm to assist in matching you
              with prospective patients. While every effort is made to align
              leads with your stated preferences, Emma does not guarantee that
              all leads will meet your exact criteria. You may receive
              additional qualified leads seeking procedures you provide, even if
              they do not fully correspond to your described profile.
            </p>
          </div>
        </div>
      </div>

      <EditProfile open={open} setOpen={setOpen} formik={formik} />
      {/* <EmailModal open={email} setOpen={setEmail} formik={formik} /> */}
      <EditInfo open={editInfo} setOpen={setEditInfo} formik={formik} />
      <EditSpecialty
        open={editSpecialty}
        setOpen={setEditSpecialty}
        formik={formik}
      />
      <EditType open={editType} setOpen={setEditType} formik={formik} />
      <IdealPatientDescription
        open={idealPatientDescription}
        setOpen={setIdealPatientDescription}
        formik={formik}
      />
      <Delete open={deleteProfile} setOpen={setDeleteProfile} />
    </>
  );
};
export default withAuth(Profile);
