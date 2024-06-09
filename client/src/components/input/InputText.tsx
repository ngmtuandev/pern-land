import { Editor } from '@tinymce/tinymce-react';

const InputText = ({height = 500, register, errors, validate, id, setValue, label} : any) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
        {label && <label className="font-medium text-gray-700" htmlFor={id}>{label}</label>}
        <Editor
        apiKey={import.meta.env.VITE_API_KEY_TINYCME}
        // onInit={(_evt, editor) => editorRef.current = editor}
        // initialValue="<p>This is the initial content of the editor.</p>"
        {...register(id, validate)}
        onChange={e => setValue(id, e.target.getContent())}
        init={{
          height: height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
        {errors && errors[id] && <small className="text-red-600 font-semibold">{errors[id]?.message}</small>}
    </div>
  )
}

export default InputText