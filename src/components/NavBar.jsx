import TMDB_navbar from '../assets/TMDB_navbar.svg';
import OnCart from './OnCart';

function NavBar(prop) {
  
  return (<div className="w-full h-[60px] bg-[#0d253f] flex justify-start">
    <img className='h-[40px] my-[10px] mx-[100px]' src={TMDB_navbar} alt="TMDB navbar logo" />
    <OnCart cartItems={prop} />
  </div>)
}
export default NavBar;
