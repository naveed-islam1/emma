"use client";
import { getSignedUrl } from "@/utils/getSignedUrl";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Doctor {
  id: string;
  full_name: string;
  specialty: string;
  emphasis?: string;
  cedula: string;
  image?: string;
  image_url?: string;
  rating?: number;
  reviewCount?: number;
  country: string;
  city: string;
  experience?: number;
  availability?: string;
  phone?: string;
  email?: string;
  languages?: string[];
  result_type?: string[];
  is_verified: boolean;
  whatsapp_no?: string;
}

interface DoctorTableProps {
  doctors: Doctor[];
}

export function DoctorTable({ doctors }: DoctorTableProps) {
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    if (!doctors?.length) return;

    const loadImages = async () => {
      const entries = await Promise.all(
        doctors.map(async (doctor) => {
          const url = doctor.image_url
            ? await getSignedUrl(doctor.image_url)
            : "/assets/png/no-image.jpg";

          return [doctor.id, url];
        }),
      );

      setImageMap(Object.fromEntries(entries));
    };

    loadImages();
  }, [doctors]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1200px] rounded-lg border">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-medium text-gray-700">
              <th className="p-3">Doctor</th>
              <th className="p-3">Cedula</th>
              <th className="p-3">Location</th>
              <th className="p-3">Speciality</th>
              <th className="p-3">Emphasis</th>
              <th className="p-3">Whatsapp Number</th>
              <th className="p-3">Email</th>
              <th className="p-3">Type Preferences</th>
            </tr>
          </thead>

          <tbody>
            {doctors?.map((doctor) => {
              return (
                <tr key={doctor.id} className="border-t text-sm">
                  {/* Doctor */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={imageMap[doctor.id] || "/assets/png/no-image.jpg"}
                        alt="doctor"
                        width={100}
                        height={100}
                        className="rounded-full h-14 w-14 object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 w-[200px]">
                          <span className="font-semibold">
                            {doctor.full_name || "Doctor Name"}
                          </span>
                          {doctor.is_verified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {doctor.specialty}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">{doctor.cedula}</td>
                  <td className="p-3 w-[150px]">
                    {doctor.country}, {doctor.city}
                  </td>

                  <td className="p-3">{doctor.specialty || "-"}</td>
                  <td className="p-3">{doctor.emphasis || "-"}</td>
                  <td className="p-3 w-[200px]">{doctor.whatsapp_no || "-"}</td>
                  <td className="p-3">{doctor.email || "-"}</td>

                  <td className="p-3 w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {doctor.result_type?.slice(0, 2).map((type) => (
                        <span
                          key={type}
                          className="text-xs bg-white px-2 py-1 rounded"
                        >
                          {type}
                        </span>
                      ))}
                      {doctor.result_type && doctor.result_type.length > 2 && (
                        <span className="text-xs bg-white px-2 py-1 rounded">
                          +{doctor?.result_type.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
