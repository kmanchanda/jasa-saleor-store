import React from "react";

import { Money } from "../Money";
import { IProps } from "./types";
export const TaxedMoney: React.FC<IProps> = ({
  taxedMoney,
  defaultValue,
  ...props
}: IProps) => {
  const money = undefined;
  return <Money {...props} money={money} defaultValue={defaultValue} />;
};

TaxedMoney.displayName = "TaxedMoney";
export default TaxedMoney;
