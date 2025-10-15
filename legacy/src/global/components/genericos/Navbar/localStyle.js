import styled from "styled-components";

export const NavbarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background: var(--color-latex10);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  border-left: 1px solid var(--color-primary);
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
`;

export const ToggleButton = styled.button`
  position: fixed;
  right: 20px;
  top: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  backdrop-filter: blur(4px);
  z-index: 900;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  /* border-bottom: 1px solid var(--color-primary); */
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Role = styled.span`
  font-size: 0.8em;
`;

export const Cross = styled.button`
  padding: 4px 6px;
  font-size: 0.8em;
  cursor: pointer;
  margin-left: auto;
  background-color: transparent;
  border: none;
  color: white;
  border-radius: 4px;
  transition: background-color 0.2s;
  user-select: none;
  &:hover {
    background-color: var(--color-latex30);
    color: white;
  }
`;

export const NavMenu = styled.nav`
  padding: 20px;
`;

export const Line = styled.div`
  position: relative;
  height: 1px;
  width: 90%;
  margin: 6px auto;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      var(--color-primary),
      rgba(0, 0, 0, 0)
    );
    transform: translateY(-50%);
  }
`;

export const NavItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  background-color: ${(props) =>
    props.active ? "var(--color-latex30)" : "transparent"};
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 8px;
  color: white;
  &:hover {
    background-color: var(--color-latex30);
    /* color: black; */
  }
`;

export const NavItemText = styled.span`
  margin-left: 10px;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  /* border-top: 1px solid var(--color-primary); */
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: var(--color-white);
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 8px;
  margin-top: 16px;
  &:hover {
    background-color: var(--color-danger);
    color: white;
    path {
      stroke: white;
    }
  }
`;
