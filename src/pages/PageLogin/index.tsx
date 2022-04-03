import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputLogin } from "providers/api/LoginProvider/types";
import { LocationState } from "types";
import useRouterHistory from "hooks/useRouterHistory";
import useLoginRegister from "hooks/useLoginRegister";
import { routePath } from "router/consts";
import EmailPasswordForm from "components/EmailPasswordForm";
import ErrorMessageModal from "components/ErrorMessage";
import BasePage from "UI/BasePage";
import BaseMain from "UI/BaseMain";
import "./style.scss";

/* todo:
 *  [-] добавить вылидацию email
 *  [-] добавить глобальную обработку ошибок
 *  */
export default function PageLogin() {
  const { getLocation, fromPath } = useRouterHistory();
  const { login, errorMessage, setErrorMessage } = useLoginRegister();

  const history = useHistory<LocationState>();
  const [loading, setLoading] = useState(false);
  const handleSubmitForm = async (loginFormData: InputLogin): Promise<void> => {
    if (loading) return;
    if (!loginFormData.email || !loginFormData.password) {
      setErrorMessage("Both fields should be fill");
      return;
    }

    try {
      setLoading(true);
      await login(loginFormData);
      history.replace(getLocation(fromPath || routePath.DEFAULT));
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <BasePage className={"page-login"}>
      <BaseMain className={"page-login__main container-narrow"}>
        <EmailPasswordForm className={"ma-auto"} loading={loading} textButton={"Login"} onSubmit={handleSubmitForm} />

        {errorMessage && <ErrorMessageModal message={errorMessage} onCloseError={() => setErrorMessage("")} />}
      </BaseMain>
    </BasePage>
  );
}
