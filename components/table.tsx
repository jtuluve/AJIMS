import { useEffect, useState, useTransition } from "react";

import styles from "@css/table.module.css"
import { getInput, getDataAny } from "@/lib/formFunctions";
export default function Table(
    {column, header_row, keys, type, formStatusMethod}
    :
    {column: number, header_row: Array<string>, keys: Array<string>, type:string, formStatusMethod: (status:any) => any}
) {
    const [values, setValues]:[values:boolean|Array<{}>|{}, setValues:any] = useState(false);
    useEffect(()=>{
        console.log("Started effect");
        try{
            (async()=>{
                let data = await getDataAny(type);
                setValues(data);
            })()
        }catch(e){
            setValues({error:e})
            console.error(e);
        }
    },[])
    if(values===false)
        return <p style={{color:"white"}}>Loading..</p>
    if((values as {error}).error)
        return <p style={{color:"white"}}>Internal Error Occured</p>

    return (
        <>
            <div className={styles["table"]}>
                <div className={styles["table-header"]} style={{ gridTemplateColumns: `repeat(1fr,${column}) 50px` }}>
                    {
                        header_row.map((e,i) => <h4 key={i}>{e}</h4>)
                    }
                </div>
                {/* Check if the "values" is array or just one object and render accordingly*/}
                {
                    Array.isArray(values)
                        ?
                        values.map((e) => {
                            return (
                                <div className={styles["table-row"]} key={e._id?.toString?.()} style={{ gridTemplateColumns: `repeat(1fr,${column}) 50px` }}>
                                    {keys.map((key,i) => {
                                        return key == "uploadUrl" ? <span key={key+i}>{e.uploadUrl ? "uploaded" : "Not uploaded"}</span> : <span key={key+i}>{e[key]}</span>
                                    })}
                                    <span>
                                        <button
                                            data-_id={e._id?.toString?.()}
                                            className={styles["edit"]}
                                            id="columnEditButton"
                                            onClick = {(ev)=>{formStatusMethod({type, _id:e._id?.toString?.()})}}
                                        >
                                            <i className="material-symbols-outlined">
                                                edit
                                            </i>
                                        </button>
                                        <button
                                            data-_id={e._id?.toString?.()}
                                            className={styles["remove"]}
                                            id="columnDeleteButton"
                                            defaultValue="delete"
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
                        <div className={styles["table-row"]} key={(values as {_id})?._id?.toString?.()} style={{ gridTemplateColumns: `repeat(1fr,${column}) 50px` }}>
                            {keys.map((key,i) => {
                                if(i>column-1) return <></>
                                return key == "uploadUrl" ? <span key={`uploadUrl`+i}>{(values as {uploadUrl})?.uploadUrl ? "uploaded" : "Not uploaded"}</span> : <span key={key+i}>{values?.[key]}</span>
                            })}
                            <span>
                                <button
                                    className={styles["edit"]}
                                    id="columnEditButton"
                                >
                                    <i data-_id={(values as {_id})?._id?.toString?.()} className="material-symbols-outlined">
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
                <div>
                <button onClick={()=>{formStatusMethod({type})}}>Add</button>
                </div>
            </div>
        </>
    )
}