"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { DoctorTable } from "@/components/doctors";
import { useGetProfilesQuery } from "@/services/profileApi";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Doctors = () => {
  const { data: Doctors, isLoading } = useGetProfilesQuery("");
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-xl font-bold mb-4 flex items-center gap-2 cursor-pointer">
          Doctors
        </h1>
        {Doctors?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No doctors found matching your criteria
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <DoctorTable doctors={Doctors} />
        )}
      </div>
    </div>
  );
};

export default Doctors;
