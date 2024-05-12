import banner from '../../assets/banner.png'
const Home = () => {
  return (
    <div className='w-full'>
      <div className='w-full h-fit relative'>
        <img src={banner} alt='banner_land' className='w-full' />
        <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center'>
          <h1 className='text-5xl text-white'>Find Your Dream Home</h1>
          <p className='w-[60%] text-center text-white'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et pariatur eos sequi nisi consectetur, magnam rerum soluta autem a voluptatem necessitatibus, facilis nobis similique doloremque, nesciunt quam vel quisquam voluptas.
          </p>
        </div>
      </div>
      <div className='w-main mx-auto'>
        content
      </div>
    </div>
  )
}

export default Home