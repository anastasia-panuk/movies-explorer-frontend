import React from "react";
import icon from "../../images/login_icon.svg";

function AccountButton({ name }) {
  return (
    <>
      <button className={`${name} account-button`}>
        Аккаунт
        <div className="account-button__container">
          <img className="account-button__icon" src={icon} alt="Иконка" />
        </div>
      </button>
    </>
  );
}

export default AccountButton;
