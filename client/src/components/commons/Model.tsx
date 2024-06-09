import { useModelStore } from "../../store/useModelStore"

const Model = () => {

  const { isShowModel, setModel, contentModel } : any = useModelStore();

  return (
    <>
    {
      isShowModel && <div onClick={() => setModel(false, null)} className='absolute top-0 z-[1000] flex justify-center items-center left-0 w-screen h-screen bg-overlay-50'>
        {
          contentModel
        }
      </div>
    }
    </>
  )
}

export default Model