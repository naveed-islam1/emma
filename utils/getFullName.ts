export const getFullName = (values: any) => {
  const parts = [
    values.firstName,
    values.paternalLastName,
    values.maternalLastName,
  ].filter(Boolean);
  return parts.join(" ");
};

export const getNamePartsFromUser = (user: any) => {
  const meta = user?.user_metadata || {};

  const nombre =
    meta.first_name ||
    meta.firstName ||
    user?.first_name ||
    user?.firstName ||
    "";

  const paterno =
    meta.paternal_last_name ||
    meta.paternalLastName ||
    user?.paternal_last_name ||
    user?.paternalLastName ||
    "";

  const materno =
    meta.maternal_last_name ||
    meta.maternalLastName ||
    user?.maternal_last_name ||
    user?.maternalLastName ||
    "";

  return { nombre, paterno, materno };
};
