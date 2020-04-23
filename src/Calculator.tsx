import ForgeUI, { Fragment, Text, ButtonSet, Button } from "@forge/ui";
import { Operator, CalulatorProps } from "./types";

export const Calculator = (props: CalulatorProps) => {
  const { screen, pushDigit, pushOperation, reset } = props;

  return (
    <Fragment>
      <Text>**Calculator**</Text>
      <Text>{screen}</Text>
      <ButtonSet>
        <Button text="0" onClick={() => pushDigit(0)} />
        <Button text="1" onClick={() => pushDigit(1)} />
        <Button text="2" onClick={() => pushDigit(2)} />
        <Button text="3" onClick={() => pushDigit(3)} />
        <Button text="4" onClick={() => pushDigit(4)} />
      </ButtonSet>
      <ButtonSet>
        <Button text="5" onClick={() => pushDigit(5)} />
        <Button text="6" onClick={() => pushDigit(6)} />
        <Button text="7" onClick={() => pushDigit(7)} />
        <Button text="8" onClick={() => pushDigit(8)} />
        <Button text="9" onClick={() => pushDigit(9)} />
      </ButtonSet>
      <ButtonSet>
        <Button text="+" onClick={() => pushOperation(Operator.ADD)} />
        <Button text="-" onClick={() => pushOperation(Operator.SUBTRACT)} />
        <Button text="*" onClick={() => pushOperation(Operator.MULTIPLY)} />
        <Button text="/" onClick={() => pushOperation(Operator.DIVIDE)} />
        <Button text="=" onClick={() => pushOperation(Operator.TOTAL)} />
      </ButtonSet>
      <ButtonSet>
        <Button text="Reset Calculator" onClick={() => reset()} />
      </ButtonSet>
    </Fragment>
  );
};
