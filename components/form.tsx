"use client";
import { getDataAny } from "@/lib/mongoose/serverActions";
import { getInput } from "@/lib/formFunctions";
import { handleUpsertAny } from "@/lib/mongoose/serverActions";
import styles from "@css/form.module.css";
import { startTransition, useEffect, useState } from "react";

type otherInput = {
  type: string;
  name: string;
  label?: string;
  required: boolean;
  default?: string;
  placeholder?: string;
};
type selectInput = {
  type: "select";
  name: string;
  label?: string;
  required: boolean;
  default?: string;
  options: Array<{ label?: string; value: string }>;
};

type input = selectInput | otherInput;

export default function Form({
  formStatusUpdate,
  type,
  formState,
  _id,
  style
}: {
  formStatusUpdate: (status: any) => void;
  type: string;
  formState: any;
  _id?: string;
  style:any;
}) {
  //Cannot create form without type
  if (!type) return <p>Error: Form type not provided</p>;

  const [inputs, setInputs] = useState<{ status?: string; inputs?: input[] }>({
    status: "loading",
  });
  const [formData, setFormData] = useState<any>({ loading: true });

  const [formStatus, setFormStatus]: [
    FormStatus: {
      error: boolean;
      status: "none" | "submitted" | "submitting" | "error";
    },
    setFormStatus: any
  ] = useState({
    error: false,
    status: "none",
  });

  useEffect(() => {
    (async () => {
      try {
        const inputs = await getInput(type);
        setInputs({ status: "loaded", inputs });
        if (_id) {
          setFormData({ loading: true });
          let formData = await getDataAny(type, _id);
          setFormData(formData);
        } else setFormData({ loading: false });
      } catch (e) {
        setInputs({ status: "error" });
        console.error(e);
      }
    })();
  }, [type, _id || ""]);

  /* Select component */
  function SelectComponent({
    options,
    name,
    defaultValue,
  }: {
    options: Array<{ label?: string; value: string }>;
    name: string;
    defaultValue: string;
  }) {
    return (
      <select name={name} defaultValue={defaultValue || ""}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
    );
  }

  if (formStatus.status === "submitted") return <></>;
  if (inputs.status === "loading" || formData.loading === true)
    return <p style={{color:style["color"]||"white"}}>Loading form...</p>;

  if (inputs.status === "error") return <p style={{color:style["color"]||"white"}}>Error... Please try again later.</p>;

  return (
    <div className={styles.formWrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setFormStatus({status:"submitting"})
          startTransition(() => {
            handleUpsertAny(formData)
              .then(() => {
                setFormStatus({ status:"submitted", error: false });
                formStatusUpdate({});
              })
              .catch(() => {
                setFormStatus({ status:"submitted", error: true });
                formStatusUpdate({});
              });
          });
        }}
      >
        <h2 className={styles.title}>
          Submit Form
        </h2>
        <span>
          {_id && <input type="hidden" name="_id" value={_id || ""} />}
          <input type="hidden" name="type" value={type} />
        </span>
        {inputs?.inputs?.map((e) => {
          return (
            <span key={(e.name || e.label || Math.random()) + "Key"}>
              <b>
                <label htmlFor={e.name || e.label}>{e.label || e.name}</label>
              </b>
              {e.type === "select" ? (
                <SelectComponent
                  name={e.name}
                  options={(e as selectInput).options}
                  defaultValue={
                    formData?.[e.name] || formData?.[e.label] || e.default || ""
                  }
                />
              ) : (
                <input
                  type={e.type || "text"}
                  name={e.name}
                  placeholder={(e as otherInput).placeholder || " "}
                  required={e.required || false}
                  defaultValue={
                    formData?.[e.name] || formData?.[e.label] || e.default || ""
                  }
                />
              )}
            </span>
          );
        })}
        <span>
          <input className={styles.submit} type="submit" value={formStatus.status==="submitting"?"SUBMITTING..":"SUBMIT"} />
          <button
            className={styles.cancel}
            onClick={(e) => {
              e.preventDefault();
              formStatusUpdate({});
            }}
            style={{marginLeft: "10px"}}
          >
            CANCEL
          </button>
        </span>
      </form>
    </div>
  );
}
