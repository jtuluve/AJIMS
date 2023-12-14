import { useTransition } from "react";
import styles from "@css/table.module.css"
export default async function Table(
    {column, header_row, keys, getMethod, formStatusMethod, formInput}
    :
    {column: number, header_row: Array<string>, keys: Array<string>, getMethod: () => any, formStatusMethod: (status:any) => any, formInput:Array<any>}
) {
    const values = await getMethod();
    return (
        <>
            <div className={styles["table"]}>
                <div className={styles["table-header"]} style={{ gridTemplateColumns: `repeat(1fr,${column}) 50px` }}>
                    {
                        header_row.map(e => <h4>{e}</h4>)
                    }
                </div>
                {/* Check if the "values" is array or just one object and render accordingly*/}
                {
                    Array.isArray(values)
                        ?
                        values.map(e => {
                            return (
                                <div className={styles["table-row"]} key={JSON.stringify(e._id)} style={{ gridTemplateColumns: `repeat(1fr,${column}) 50px` }}>
                                    {keys.map(key => {
                                        return key == "uploadUrl" ? <span>{e.uploadUrl ? "uploaded" : "Not uploaded"}</span> : <span>{e[key]}</span>
                                    })}
                                    <span>
                                        <button
                                            data-_id={JSON.stringify(e._id)}
                                            className={styles["edit"]}
                                            id="columnEditButton"
                                            onClick = {(e)=>{formStatusMethod(formInput)}}
                                        >
                                            <i className="material-symbols-outlined">
                                                edit
                                            </i>
                                        </button>
                                        <button
                                            data-_id={JSON.stringify(e._id)}
                                            className={styles["remove"]}
                                            id="columnDeleteButton"
                                            defaultValue="delete"
                                            {/* TODO: add remove method here */}
                                            onClick={()=>{}}
                                        >
                                            <i className="material-symbols-outlined">
                                                delete
                                            </i>
                                        </button>
                                    </span>
                                </div>
                            )
                        })
                        :
                        <div className={styles["table-row"]} key={JSON.stringify(e._id)} style={{ gridTemplateColumns: `repeat(1fr,${column}) 50px` }}>
                            {keys.map(key => {
                                return key == "uploadUrl" ? <span>{values.uploadUrl ? "uploaded" : "Not uploaded"}</span> : <span>{values[key]}</span>
                            })}
                            <span>
                                <button
                                    className={styles["edit"]}
                                    id="columnEditButton"
                                >
                                    <i data-_id={JSON.stringify(values._id)} className="material-symbols-outlined">
                                        edit
                                    </i>
                                </button>
                                <button
                                    className={styles["remove"]}
                                    id="columnDeleteButton"
                                    defaultValue="delete"
                                >
                                    <i className="material-symbols-outlined">
                                        delete
                                    </i>
                                </button>
                            </span>
                        </div>
                }
            </div>
        </>
    )
}