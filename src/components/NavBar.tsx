import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import LoginModal from './LoginModal';
import { Button } from 'antd';

interface Props {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const NavBar = ({ user, setUser }: Props) => {
  const onClick = () => {
    localStorage.removeItem('username');
    setUser(null);
  }

  return (
    <HStack padding='10px'>
      <Image src={logo} boxSize='60px' />
      {user ?
        <>
          <Text > {user}</Text>
          <Button type='primary' onClick={onClick}>注销</Button>
        </> : <LoginModal setUser={setUser} />}

      <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar