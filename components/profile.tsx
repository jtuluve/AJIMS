import { getProfile } from "@/lib/mongoose/functions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "./form";

export default function Profile() {
  let [profileData, updateProfileData]: [
    profileData: any,
    updateProfileData: any
  ] = useState(false);
  let router = useRouter();
  let [formState, setFormState]: [formState: any, setFormState: any] =
    useState(false);
  const { data: session } = useSession();
  if (!session) {
    router.push("/");
  }

  function formStatusUpdate(state) {
    setFormState(state);
  }
  useEffect(() => {
    (async () => {
      let profile = await getProfile();
      updateProfileData(profile);
    })();
  }, [formState]);
  if (profileData === false)
    return <div style={{ color: "black" }}>Loading...</div>;

  return (
    <>
      <div className="profileform">
        {formState===true && (
          <Form
          style={{ color: "black" }}
            type="profile"
            formStatusUpdate={formStatusUpdate}
            formState={formState}
            _id={profileData["_id"]||""}
          />
        )}
        <div>
          <label>
            <b>Name</b>
          </label>
          <p className="info-p">{profileData["name"]||"N/A"}</p>
          <label>
            <b>Designation</b>
          </label>
          <p className="info-p">{profileData["designation"]||"N/A"}</p>
          <label>
            <b>Department</b>
          </label>
          <p className="info-p">{profileData["department"]||"N/A"}</p>
        </div>
        <input type="submit" className="profileEditBtn" value={"EDIT"} onClick={(e)=>{
            e.preventDefault();
            setFormState(true);
        }}/>
      </div>
    </>
  );
}
