'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { getDataAny, getInput } from '@/lib/formFunctions'
import { handleAddAny, handleUpdateAny } from '@/lib/mongoose/serverActions'
import styles from '@css/form.module.css'
import { useEffect, useState } from 'react'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../app/firebase'

type otherInput = {
  type: string
  name: string
  label?: string
  required: boolean
  default?: string
  placeholder?: string
}
type selectInput = {
  type: 'select'
  name: string
  label?: string
  required: boolean
  default?: string
  options: Array<{ label?: string; value: string }>
}

type input = selectInput | otherInput

export default function Form({
  formStatusUpdate,
  type,
  _id,
}: {
  formStatusUpdate: (status: any) => void
  type: string
  _id?: string
}) {
  //Cannot create form without type
  if (!type) return <></>

  const [inputs, setInputs] = useState<{ status?: string; inputs?: input[] }>({
    status: 'loading',
  })
  const [formData, setFormData] = useState<any>({})
  let initialState = { submitted: false, error: false }
  const [state, formAction] = useFormState(handleAddAny, initialState)

  // form upload
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  // console.log(file)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log(progress);
        setFilePerc(Math.round(progress))
      },
      (error) => {
        console.log(error)
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
        })
      }
    )

  }

  useEffect(() => {
    (async () => {
      try {
        const inputs = await getInput(type)
        setInputs({ status: 'loaded', inputs })
        let formData = await getDataAny(type, _id)
        setFormData(formData)
      } catch (e) {
        setInputs({ status: 'error' })
        console.error(e)
      }
    })()
  }, [type, _id || ''])

  /* Select component */
  function SelectComponent({
    options,
    name,
    defaultValue,
  }: {
    options: Array<{ label?: string; value: string }>
    name: string
    defaultValue: string
  }) {
    return (
      <select name={name} defaultValue={defaultValue || ''}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
    )
  }

  /* Submit Button component */
  function SubmitButton() {
    const { pending } = useFormStatus()
    return (
      <input
        formAction={formAction}
        className={styles.submit}
        type="submit"
        aria-disabled={pending}
        value={pending ? 'Submitting..' : 'SUBMIT'}
      />
    )
  }

  if (state.submitted) return <></>
  if (inputs.status === 'loading') return <p color="white">Loading form...</p>

  if (inputs.status === 'error' || state.error)
    return <p>Error... Please try again later.</p>

  return (
    <div className={styles.formWrapper}>
      <form>
        <span>
          <input type="hidden" name="_id" value={_id || ''} />
          <input type="hidden" name="type" value={type} />
        </span>
        {inputs?.inputs?.map((e) => {
          return (
            <span key={(e.name || e.label || Math.random()) + 'Key'}>
              <b>
                <label htmlFor={e.name || e.label}>{e.label || e.name}</label>
              </b>
              {e.type === 'select' ? (
                <SelectComponent
                  name={e.name}
                  options={(e as selectInput).options}
                  defaultValue={
                    formData?.[e.name] || formData?.[e.label] || e.default || ''
                  }
                />
              ) : e.type === 'file' ? (
                <input
                  type="file"
                  accept="*/*"
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    console.log(e.target.files[0])
                  }}
                  name={e.name}
                  placeholder={(e as otherInput).placeholder || ' '}
                  required={e.required || false}
                  defaultValue={
                    formData?.[e.name] || formData?.[e.label] || e.default || ''
                  }
                />
              ) : (
                <input
                  type={e.type || 'text'}
                  name={e.name}
                  placeholder={(e as otherInput).placeholder || ' '}
                  required={e.required || false}
                  defaultValue={
                    formData?.[e.name] || formData?.[e.label] || e.default || ''
                  }
                />
              )}
            </span>
          )
        })}
        <span>
          <SubmitButton />
          <button
            className={styles.cancel}
            onClick={(e) => {
              e.preventDefault()
              formStatusUpdate({})
            }}
          >
            CANCEL
          </button>
        </span>
      </form>
    </div>
  )
}
