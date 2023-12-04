type inputs = {
  label?: string,
  name?:string,
  required: boolean
} & (
    {
      type: 'select',
      options: Array<{ label?: string, value: string }>
    } | {
      type: string
      placeholder?: string,
    }
)
type otherInput = {
  type:string,
  label?: string,
  required: boolean,
  placeholder?: string,
}
type selectInput = {
  type: 'select',
  label?: string,
  required: boolean,
  options: Array<{ label?: string, value: string }>
}



interface formArgs {
  submitFunc: ((formdata: FormData) => void),
  inputs: inputs[]
}
export default function Form(props: formArgs) {

  function SelectComponent({ options, name }: { options: Array<{ label?: string, value: string }>,name:string}){
    return (
      <select name={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label||option.value}
          </option>
        ))}
      </select>
    );
  };

  return (
    <form action={props.submitFunc}>
      {props.inputs?.map(e => {
        return (
          <span key={e.label + "Key"}>
            <b><label htmlFor={e.label}>{e.label}</label></b>
            {
              e.type === "select" ?
                <SelectComponent name={e.name||e.label} options={(e as selectInput).options} /> :
                <input type={e.type || "text"} name={e.name||e.label} placeholder={(e as otherInput).placeholder || " "} required={e.required || false} />
            } 
          </span>
        )
      })}
      <input type="submit" value="Submit" />
    </form>
  )
}
