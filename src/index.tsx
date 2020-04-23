import ForgeUI, {
  render,
  Fragment,
  IssuePanel,
  useAction,
  useProductContext,
} from "@forge/ui";

import { Digit, Operator, AppState, AppStatePayload, Operation } from "./types";
import { Calculator } from "./Calculator";
import { OperationsTable } from "./OperationsTable";
import { JiraContext } from "@forge/ui/dist/esm/types";
import { addComment } from "./apis";

const InitialState: AppState = {
  screen: 0,
  accumulator: NaN,
  operator: Operator.NONE,
  waiting: false,
  operations: [],
};

const App = () => {
  const [state, setState] = useAction<AppState, AppStatePayload>(
    (prev, payload) => Object.assign(prev, payload),
    InitialState
  );

  const reset = () => {
    setState({
      screen: 0,
      accumulator: NaN,
      waiting: false,
    });
  };

  const pushDigit = (digit: Digit) => {
    const { waiting, screen } = state;

    if (waiting) {
      setState({
        screen: digit,
        waiting: false,
      });
    } else {
      setState({
        screen: Number(`${screen}${digit}`),
      });
    }
  };

  const pushOperation = (next: Operator) => {
    const { screen, accumulator, operator, operations } = state;
    if (!accumulator) {
      setState({
        accumulator: screen,
      });
    } else if (operator !== Operator.NONE) {
      const operand = accumulator || 0;
      const result = operate(operand, operator, screen);

      if (operator !== Operator.TOTAL) {
        setState({
          accumulator: result,
          screen: result,
          operations: [
            ...operations,
            {
              operand,
              operandi: screen,
              operator,
              result,
            },
          ],
        });
      } else {
        setState({
          accumulator: result,
          screen: result,
        });
      }
    }

    setState({
      waiting: true,
      operator: next,
    });
  };

  const addOperationAsComment = async (operation: Operation) => {
    const context = useProductContext();
    const issue = (context.platformContext as JiraContext).issueKey;

    await addComment(issue, operation);
  };

  const operate = (
    operand: number,
    operator: Operator,
    operandi: number
  ): number => {
    switch (operator) {
      case Operator.ADD:
        return operand + operandi;
      case Operator.SUBTRACT:
        return operand - operandi;
      case Operator.MULTIPLY:
        return operand * operandi;
      case Operator.DIVIDE:
        return Math.floor(operand / operandi);
      case Operator.TOTAL:
        return operandi;
      case Operator.NONE:
        return Infinity;
    }
  };

  return (
    <Fragment>
      <Calculator
        screen={state.screen}
        pushDigit={pushDigit}
        pushOperation={pushOperation}
        reset={reset}
      />
      <OperationsTable
        operations={state.operations}
        addAsComment={addOperationAsComment}
      />
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
