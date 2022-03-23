import React, { useState } from "react";
import { ReactComponent as DotsIcon } from "assets/images/icons/dots-vertical.svg";
import { ReactComponent as CrossIcon } from "assets/images/icons/close-cross.svg";
import { ReactComponent as DeleteIcon } from "assets/images/icons/delete.svg";
import { ReactComponent as EditIcon } from "assets/images/icons/edit.svg";
import BaseButton from "UI/BaseButton";

import "./style.scss";

type Props = {
  className?: string;
  onDelete: () => void;
  onEdit: (closeCallback: () => void) => void;
};

export default function FinancialReportManageMenu({ className, onEdit, onDelete }: Props) {
  const cls = ["report-manage-menu"];
  if (className) cls.push(className);

  const [show, setShow] = useState(false);

  const handleButtonEdit = () => {
    onEdit(() => setShow(false));
  };

  //todo: добавить скрытие report-manage-menu__content после потери фокуса.
  return (
    <div className={cls.join(" ")}>
      <BaseButton className={"pa-0"} icon onClick={() => setShow(!show)}>
        {show ? <CrossIcon height={22} width={22} /> : <DotsIcon height={22} width={22} />}
      </BaseButton>

      {show && (
        <div className={"report-manage-menu__content"}>
          <BaseButton className={"report-manage-menu__item pa-0"} icon onClick={onDelete}>
            <DeleteIcon />
          </BaseButton>

          <BaseButton className={"report-manage-menu__item pa-0"} icon onClick={handleButtonEdit}>
            <EditIcon />
          </BaseButton>
        </div>
      )}
    </div>
  );
}