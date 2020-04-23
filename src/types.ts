export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export enum Operator {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  TOTAL,
  NONE,
}

export type CalulatorProps = {
  screen: number;
  pushDigit: (digit: Digit) => void;
  pushOperation: (operator: Operator) => void;
  reset: () => void;
};

export type OperatorLozengeProps = {
  operator: Operator;
};

export type Operation = {
  operand: number;
  operandi: number;
  operator: Operator;
  result: number;
};

export type OperationsTableProps = {
  operations: Array<Operation>;
  addAsComment: (operation: Operation) => void;
};

export type AppState = {
  screen: number;
  accumulator: number;
  operator: Operator;
  waiting: boolean;
  operations: Array<Operation>;
};

export type AppStatePayload = {
  screen?: number;
  accumulator?: number;
  operator?: Operator;
  waiting?: boolean;
  operations?: Array<Operation>;
};
