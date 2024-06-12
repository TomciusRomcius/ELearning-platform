import { useRef } from "react";

type UploadFileProps = {
  setFile: (file: File) => void;
}

export function UploadFile(props: UploadFileProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadFile = () => {
    if (!fileInput?.current?.files) return;
    props.setFile(fileInput.current.files[0]);
  }

  return (
    <form action={uploadFile}>
      <label>
        <span>Upload file</span>
        <input onChange={uploadFile} ref={fileInput} type="file" name="file"/>
      </label>
    </form>
  )
}