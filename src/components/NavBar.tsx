import { HStack, Image } from '@chakra-ui/react'
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import LoginModal from './LoginModal';



const NavBar = () => {
  return (
    <HStack padding='10px'>
      <Image src={logo} boxSize='60px' />
      <LoginModal />
      <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar