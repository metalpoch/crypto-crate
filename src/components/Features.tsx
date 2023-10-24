import { FaLink, FaEthereum } from 'react-icons/fa'
import { BsQrCode, BsBoundingBox } from 'react-icons/bs'
import { MdMoneyOff, MdOutlineHistory } from 'react-icons/md'

export default function Features() {
    return <>
        <section className='mb-32 flex flex-col justify-center items-center mx-4'>
            <h1 className='text-4xl mb-5 font-bold'>Discover our features</h1>
            <h3 className='mb-20 text-2xl'>
                Our features are designed to enhance your productivity and streamline
                your workflow.
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-20'>
                <div className='flex flex-col items-center gap-y-2'>
                    <FaLink size={40} className="mb-5" />
                    <h3 className='font-bold text-2xl'>Cryptografically secure</h3>
                    <p>Using Etherium blockchain technology</p>
                </div>

                <div className='flex flex-col items-center gap-y-2'>
                    <FaEthereum size={40} className="mb-5" />
                    <h3 className='font-bold text-2xl'>Guard by a smart contract</h3>
                    <p>Following ERC-721 standard</p>
                </div>

                <div className='flex flex-col items-center gap-y-2'>
                    <BsQrCode size={40} className="mb-5" />
                    <h3 className='font-bold text-2xl'>Share with others</h3>
                    <p>Show it to your clients</p>
                </div>

                <div className='flex flex-col items-center gap-y-2'>
                    <MdMoneyOff size={40} className="mb-5" />
                    <h3 className='font-bold text-2xl'>Low fees</h3>
                    <p>Low entry barrier for adding a product to the collection</p>
                </div>

                <div className='flex flex-col items-center gap-y-2'>
                    <BsBoundingBox size={40} className="mb-5" />
                    <h3 className='font-bold text-2xl'>Unique</h3>
                    <p>Give uniqueness to your product</p>
                </div>

                <div className='flex flex-col items-center gap-y-2'>
                    <MdOutlineHistory size={40} className="mb-5" />
                    <h3 className='font-bold text-2xl'>Leave a trace</h3>
                    <p>Have a item record at your hand</p>
                </div>
            </div>
        </section>

    </>
}