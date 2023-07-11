import React from "react";

const MenuBtn = ({
  handleMenu,
  menu,
  menuDropDownFullScreen,
  setMenuDropDownFullScreen,
}) => {
  return (
    <div
      className=" cursor-pointer cursor-pointer menu-button p-4 mr-2 d-flex align-items-center justify-content-center"
      onClick={() => {
        handleMenu();

        setMenuDropDownFullScreen({
          ...menuDropDownFullScreen,
          name: "dashboard",
          toggle: !menuDropDownFullScreen.toggle,
        });
      }}
    >
      <i class={`${!menu ? "fa-solid fa-bars" : "fa fa-times"}`}></i>
    </div>
  );
};

export default MenuBtn;
