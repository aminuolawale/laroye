import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useImportDataMutation } from "../features/user/userApiSlice";

const SocialData = () => {
  const [importData, { isLoading }] = useImportDataMutation();
  const [soc, setSoc] = useState([]);
  const { id } = useParams();
  const importSocialData = async () => {
    const { success, errors, data } = await importData({ id }).unwrap();
    if (success) {
      setSoc(data);
    }
  };
  useEffect(() => {
    importSocialData();
  }, []);
  return (
    <div>
      {soc.map((p: any) => (
        <div className="socialData">
          <p>{p.id}</p>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  );
};

export default SocialData;
