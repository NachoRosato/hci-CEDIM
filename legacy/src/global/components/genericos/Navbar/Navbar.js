import {
  Avatar,
  Cross,
  Footer,
  Line,
  LogoutButton,
  Name,
  NavbarContainer,
  NavItem,
  NavItemText,
  NavMenu,
  Overlay,
  ProfileInfo,
  ProfileSection,
  Role,
} from "./localStyle";
import defaultPerfil from "../../../../global/assets/generico/defaultUserImage.png";
import NavExitIcon from "global/assets/generico/NavExitIcon";

const Navbar = ({
  showDropPerfil,
  setShowDropPerfil,
  itemList,
  userName,
  userEsp,
  onClickItem,
}) => {
  let path = window.location.pathname;

  return (
    <>
      <Overlay
        isOpen={showDropPerfil}
        onClick={() => setShowDropPerfil(false)}
      />

      <NavbarContainer isOpen={showDropPerfil}>
        <ProfileSection>
          <Avatar src={defaultPerfil} alt="Profile" />
          <ProfileInfo>
            <Name className="">{userName}</Name>
            <Role>{userEsp}</Role>
          </ProfileInfo>
          <Cross onClick={() => setShowDropPerfil(false)}>X</Cross>
        </ProfileSection>
        <Line></Line>
        <NavMenu>
          {showDropPerfil &&
            itemList?.map((item) => (
              <NavItem
                onClick={() => onClickItem(item.path)}
                key={item.id}
                active={
                  item.path.toLocaleLowerCase() === path.toLocaleLowerCase()
                }
              >
                {item.icon}
                <NavItemText>{item.descripcion}</NavItemText>
              </NavItem>
            ))}
        </NavMenu>

        <Footer>
        <Line></Line>
          <LogoutButton onClick={() => onClickItem("/")}>
            <NavExitIcon className={"ptur-dropDownAvatar-icons"} />
            <NavItemText>Salir</NavItemText>
          </LogoutButton>
        </Footer>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
