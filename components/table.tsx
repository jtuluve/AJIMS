import { useEffect, useState } from "react";

import styles from "@css/table.module.css";
import { getDataAny } from "@/lib/mongoose/serverActions";
import { handleDeleteAny } from "@/lib/mongoose/serverActions";


export default function Table({
  column,
  header_row,
  keys,
  type,
  formStatusMethod,
  formState,
}: {
  column: number;
  header_row: Array<string>;
  keys: Array<string>;
  type: string;
  formStatusMethod?: (status: any) => any;
  formState?: any;
}) {
  const [values, setValues]: [values: any, setValues: any] = useState(false);
  //effect to retrieve data
  useEffect(() => {
    // console.log("Started effect");
    try {
      (async () => {
        let data = await getDataAny(type);
        setValues(data);
      })();
    } catch (e) {
      setValues({ error: e });
      console.error(e);
    }
  }, [formState]);
  if (values === false) return <p style={{ color: "white" }}>Loading..</p>;
  if (values?.error) {
    return <p style={{ color: "white" }}>Internal Error Occured</p>;
  }

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
                      return key == "uploadUrl" ? (
                        <span key={key + i}>
                          {e.uploadUrl ? (
                            <a href={e.uploadUrl} target="_blank">
                              download
                            </a>
                          ) : (
                            "Not uploaded"
                          )}
                        </span>
                      ) : (
                        <span key={key + i}>{e[key]}</span>
                      );
                    })}
                    <span id="onPrintHiddenButton" className={styles["table-buttons"]}>
                      <button
                        data-_id={e._id?.toString?.()}
                        className={styles["edit"]}
                        id="columnEditButton"
                        onClick={() => {
                          formStatusMethod({
                            type,
                            _id: e._id?.toString?.() || e._id,
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
                          formStatusMethod({});
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
                  formStatusMethod({ type });
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
              {header_row.map((e, i) => (
                <h4 key={i} style={{ display: "block" }}>
                  {e}
                </h4>
              ))}
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
                return key == "uploadUrl" ? (
                  <span key={`uploadUrl` + i} style={{ display: "block" }}>
                    {values?.uploadUrl ? "uploaded" : "Not uploaded"}
                  </span>
                ) : (
                  <span key={key + i} style={{ display: "block" }}>{values?.[key]}</span>
                );
              })}
            </div>
            {values?.readonly ? (
              <></>
            ) : (
              <div id="onPrintHideEdit" className={styles["editRowBtnDiv"]}>
                <button
                  id="onPrintHidden"
                  onClick={() => {
                    formStatusMethod({ type, _id: values?._id?.toString?.() });
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
