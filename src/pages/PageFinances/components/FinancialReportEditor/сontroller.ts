import { useState, Dispatch, SetStateAction } from "react";
import { FinancialPart, FinancialReport } from "providers/api/FinancialReportProvider/types";
import { v1 as uuidv1 } from "uuid";
import { dropRight } from "lodash-es";

type FinancialReportFormData = Omit<FinancialReport, "id">;

type FinancesPeriodEditorController = [
  FinancialReportFormData,
  Dispatch<SetStateAction<FinancialReportFormData>>,
  (partCount: FinancialReportFormData["partCount"], parts: FinancialPart[]) => FinancialPart[]
];

export default function useController(editedReport?: FinancialReport): FinancesPeriodEditorController {
  const [formData, setFormData] = useState<FinancialReportFormData | FinancialReport>(
    editedReport || {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      partCount: 0,
      parts: [],
    }
  );

  const addNewParts = (count: number): FinancialPart[] => {
    return new Array(count).fill("").map(() => ({
      id: uuidv1(),
      income: 0,
      common: 0,
      piggyBank: 0,
      free: 0,
    }));
  };
  const shapeParts = (partCount: number, parts: FinancialPart[]): FinancialPart[] => {
    if (parts.length === 0) {
      return addNewParts(partCount);
    }

    const offset = parts.length - partCount;
    if (offset > 0) return dropRight(parts, offset);
    if (offset < 0) return parts.concat(addNewParts(Math.abs(offset)));

    return [];
  };

  return [formData, setFormData, shapeParts];
}
