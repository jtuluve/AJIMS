import styles from "@css/table.module.css";
import { handleDeleteAny } from "@/lib/mongoose/serverActions";
import { useFormStateContext } from "./formstateContext";

export default function Table({
  column,
  header_row,
  keys,
  type,
  values,
  readOnly
}: {
  column: number;
  header_row: Array<string>;
  keys: Array<string>;
  type: string;
  values: any;
  readOnly?: boolean;
}) {
  const filesKeys = ["uploadUrl", "clinicalDutyFile", "examDutyFile", "coordinatorDutyFile", "committeeFile", "conferenceFile", "guestLecturesFile", "certUpload", "regUpload", "residenceProof", "postHeldFile","patentcert"]
  const dateKeys = ["date","dateD","dob","from","to","dateOfJoining","dateL","startDate","endDate"]
  const {setFormState} = useFormStateContext()

  if (values === false) 
    return <p style={{ color: "white" }}>Loading..</p>;

  if (values?.error) {
    return <p style={{ color: "white" }}>Internal Error Occured</p>;
  }
  values = Array.isArray(values) ? values.filter(v=>!!v) : values

  return (
    <>
      <div className={styles["table"]}>
        {/* Check if the "values" is array or just one object and render accordingly*/}
        {Array.isArray(values) ? (
          <>
            <div
              className={styles["table-header"]}
              style={{
                gridTemplateColumns: `repeat(${column}, calc(100%/${column} - 50px/${column})) 50px`,
              }}
            >
              {header_row.map((e, i) => (
                <h4 key={i}>{e}</h4>
              ))}
            </div>
            {values?.length == 0 ? (
              <div>No data found!</div>
            ) : (
              values.map((e) => {
                return (
                  <div
                    className={styles["table-row"]}
                    key={e._id?.toString?.()}
                    style={{
                      gridTemplateColumns: `repeat(${column}, calc(100%/${column} - 50px/${column})) 50px`,
                    }}
                  >
                  {keys.map((key, i) => {
											return filesKeys.includes(key) ? (
												<span key={key + i}>
													{e[key] ? (
														<a
															href={
                                e[key]
															}
															target="_blank"
														>
															download
														</a>
													) : (
														"Not uploaded"
													)}
												</span>
											) : (
												<span key={key + i}>{dateKeys.includes(key) ? e[key]?.toString()?.slice?.(0, 10) : e[key]?.toString?.()}</span>
											);
										})}
                    <span id="onPrintHiddenButton" className={styles["table-buttons"]}>
                      <button
                        data-_id={e._id?.toString?.()}
                        className={styles["edit"]}
                        id="columnEditButton"
                        onClick={() => {
                          setFormState({
                            type,
                            _id: e._id?.toString?.() || e._id,
                            data: e
                          });
                        }}
                      >
                        <i className="material-symbols-outlined">edit</i>
                      </button>
                      <button
                        data-_id={e._id?.toString?.()}
                        className={styles["remove"]}
                        id="columnDeleteButton"
                        defaultValue="delete"
                        onClick={() => {
                          (async () =>
                            await handleDeleteAny(
                              type,
                              e._id?.toString?.() || e._id
                            ))();
                            setFormState({});
                        }}
                      >
                        <i className="material-symbols-outlined">delete</i>
                      </button>
                    </span>
                  </div>
                );
              })
            )}
            <div id="onPrintHiddenRow" className={styles["addRowBtnDiv"]}>
              <button
                onClick={() => {
                  setFormState({ type });
                }}
                style={{ gridColumn: `${Math.round(column / 2)}` }}
              >
                Add
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles["table-header"]+" "+styles["object"]}
              style={{
                gridTemplateColumns: `repeat(${column}, 1fr)`,
              }}
            >
              {header_row.map((e, i) => {
                return(
                  <h4 key={i} style={{ display: "block" }}>
                    {e}
                  </h4>
                )
              })}
            </div>
            <div
              className={styles["table-row"]}
              key={values?._id?.toString?.()}
              style={{
                gridTemplateColumns: `repeat(${column}, 1fr)`,
              }}
            >
              {keys.map((key, i) => {
                if (i > column - 1) return <></>;
                return filesKeys.find((k) => k == key) ? (
                  <span key={key + i} style={{ display: "block" }}>
                    {
                      values?.[key] ?
                        <a href={
                          values[key]
                        }
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }
                        }
                        >download</a>
                      : "Not uploaded"
                    }
                  </span>
                ) : (
                  <span key={key + i} style={{ display: "block" }}>{dateKeys.includes(values[key]) ? values[key]?.slice?.(0, 10) : values[key]?.toString?.()}</span>
                );
              })}
            </div>
            {values?.readonly ? (
              <></>
            ) : (
              !readOnly && 
              <div id="onPrintHideEdit" className={styles["editRowBtnDiv"]}>
                <button
                  id="onPrintHidden"
                  onClick={() => {
                    setFormState({ type, _id: values?._id?.toString?.(), data: values });
                  }}
                  style={{ gridColumn: `${Math.round(column / 2)}` }}
                >
                  Edit
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
