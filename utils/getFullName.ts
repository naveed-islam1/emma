 export  const getFullName = (values: any) => {
    const parts = [
      values.firstName,
      values.paternalLastName,
      values.maternalLastName,
    ].filter(Boolean);
    return parts.join(" ");
  };
